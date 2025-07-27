#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🌸 SCENT DESTINATION Google Maps 이미지 크롤러
Selenium으로 구글 지도에서 직접 이미지 수집하는 완전 자동화 스크립트
"""

import os
import sys
import time
import json
import requests
import pandas as pd
from pathlib import Path
from urllib.parse import urlparse

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class GoogleMapsImageCrawler:
    def __init__(self, headless=True, download_dir='public/images/places'):
        """
        구글 지도 이미지 크롤러 초기화
        
        Args:
            headless (bool): 브라우저를 숨김 모드로 실행할지 여부
            download_dir (str): 이미지 저장 디렉토리
        """
        self.download_dir = Path(download_dir)
        self.download_dir.mkdir(parents=True, exist_ok=True)
        
        self.driver = self._setup_driver(headless)
        self.wait = WebDriverWait(self.driver, 10)
        
        print(f"🚀 Google Maps 이미지 크롤러 초기화 완료!")
        print(f"📁 저장 디렉토리: {self.download_dir.absolute()}")
    
    def _setup_driver(self, headless=True):
        """Chrome 드라이버 설정"""
        options = Options()
        
        if headless:
            options.add_argument('--headless')
        
        # 기본 옵션들
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        # User-Agent 설정
        options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
        
        try:
            driver = webdriver.Chrome(options=options)
            driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            return driver
        except Exception as e:
            print(f"❌ Chrome 드라이버 설정 실패: {e}")
            print("💡 해결 방법:")
            print("1. Chrome 브라우저가 설치되어 있는지 확인")
            print("2. pip install webdriver-manager 후 자동 설치 사용")
            sys.exit(1)
    
    def search_place(self, place_name, region=""):
        """
        구글 지도에서 장소 검색
        
        Args:
            place_name (str): 검색할 장소명
            region (str): 지역명 (검색 정확도 향상용)
        
        Returns:
            bool: 검색 성공 여부
        """
        try:
            # 구글 지도 접속
            self.driver.get('https://www.google.com/maps/')
            time.sleep(2)
            
            # 검색어 조합
            search_query = f"{place_name} {region}".strip()
            print(f"🔍 검색 중: {search_query}")
            
            # 검색창 찾기 및 입력
            search_box = self.wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'input#searchboxinput'))
            )
            search_box.clear()
            search_box.send_keys(search_query)
            search_box.send_keys(Keys.RETURN)
            
            # 검색 결과 로딩 대기
            time.sleep(3)
            
            return True
            
        except TimeoutException:
            print(f"❌ '{search_query}' 검색 실패: 타임아웃")
            return False
        except Exception as e:
            print(f"❌ '{search_query}' 검색 중 오류: {e}")
            return False
    
    def get_place_images(self, max_images=3):
        """
        검색된 장소의 이미지 URL들 수집
        
        Args:
            max_images (int): 수집할 최대 이미지 수
            
        Returns:
            list: 이미지 URL 리스트
        """
        image_urls = []
        
        try:
            # 첫 번째 검색 결과 클릭
            first_result = self.wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-result-index="1"]'))
            )
            first_result.click()
            time.sleep(3)
            
            # 이미지 섹션으로 이동
            try:
                # 사진 탭 찾기
                photos_button = self.driver.find_element(By.XPATH, '//button[contains(@data-tab-index, "1")]')
                photos_button.click()
                time.sleep(2)
            except NoSuchElementException:
                print("📷 사진 탭을 찾을 수 없음, 기본 이미지 수집 시도")
            
            # 이미지 요소들 찾기
            image_elements = self.driver.find_elements(By.CSS_SELECTOR, 'img[src*="googleusercontent.com"]')
            
            for i, img_element in enumerate(image_elements[:max_images]):
                try:
                    img_url = img_element.get_attribute('src')
                    if img_url and 'googleusercontent.com' in img_url:
                        # 고해상도 이미지 URL로 변환
                        if '=w' in img_url:
                            img_url = img_url.split('=w')[0] + '=w1200-h800'
                        image_urls.append(img_url)
                        print(f"  📸 이미지 {i+1} URL 수집: {img_url[:80]}...")
                        
                except Exception as e:
                    print(f"  ⚠️ 이미지 {i+1} URL 추출 실패: {e}")
                    continue
            
            print(f"✅ 총 {len(image_urls)}개 이미지 URL 수집")
            return image_urls
            
        except TimeoutException:
            print("❌ 장소 정보 로딩 실패: 타임아웃")
            return []
        except Exception as e:
            print(f"❌ 이미지 수집 중 오류: {e}")
            return []
    
    def download_image(self, img_url, file_path):
        """
        이미지 다운로드
        
        Args:
            img_url (str): 이미지 URL
            file_path (Path): 저장할 파일 경로
            
        Returns:
            bool: 다운로드 성공 여부
        """
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            
            response = requests.get(img_url, headers=headers, timeout=30)
            response.raise_for_status()
            
            with open(file_path, 'wb') as f:
                f.write(response.content)
            
            print(f"  💾 저장 완료: {file_path.name}")
            return True
            
        except Exception as e:
            print(f"  ❌ 다운로드 실패: {e}")
            return False
    
    def crawl_place_images(self, place_name, region="", english_name="", max_images=3):
        """
        특정 장소의 이미지들을 크롤링하고 저장
        
        Args:
            place_name (str): 한글 장소명
            region (str): 지역명
            english_name (str): 영문 파일명
            max_images (int): 수집할 이미지 수
            
        Returns:
            int: 성공적으로 다운로드된 이미지 수
        """
        print(f"\n🎯 '{place_name}' 이미지 수집 시작...")
        
        # 검색 실행
        if not self.search_place(place_name, region):
            return 0
        
        # 이미지 URL 수집
        image_urls = self.get_place_images(max_images)
        if not image_urls:
            print(f"❌ '{place_name}' 이미지를 찾을 수 없음")
            return 0
        
        # 이미지 다운로드
        success_count = 0
        for i, img_url in enumerate(image_urls):
            file_name = f"{english_name}-{i+1}.jpg"
            file_path = self.download_dir / file_name
            
            if self.download_image(img_url, file_path):
                success_count += 1
            
            # 과도한 요청 방지
            time.sleep(1)
        
        print(f"✨ '{place_name}' 완료: {success_count}/{len(image_urls)} 이미지 저장")
        return success_count
    
    def close(self):
        """드라이버 종료"""
        if self.driver:
            self.driver.quit()
            print("🔚 크롤러 종료")

def load_spaces_data():
    """
    공간 데이터 로드
    """
    # 실제 프로젝트 데이터 + 이미지 가이드의 모든 공간들
    spaces_data = [
        # 서울 지역
        {"name": "Osechill", "region": "서울", "english_name": "osechill"},
        {"name": "Aya Coffee", "region": "서울", "english_name": "aya-coffee"},
        {"name": "연남서식", "region": "서울", "english_name": "yeonnam-seosik"},
        {"name": "애경 앤트러사이트", "region": "서울", "english_name": "aekyung-anthracite"},
        {"name": "카페 온리", "region": "서울", "english_name": "cafe-only"},
        {"name": "블루보틀 청담", "region": "서울", "english_name": "bluebottle-cheongdam"},
        {"name": "대림창고", "region": "서울", "english_name": "daelim-warehouse"},
        {"name": "어니언", "region": "서울", "english_name": "onion"},
        {"name": "테라로사", "region": "서울", "english_name": "terarosa"},
        {"name": "소울컴팩트", "region": "서울", "english_name": "soul-compact"},
        
        # 제주 지역
        {"name": "몽상드애월", "region": "제주", "english_name": "monsant-aewol"},
        {"name": "원앤온리", "region": "제주", "english_name": "one-and-only"},
        {"name": "카페 한라산", "region": "제주", "english_name": "cafe-hallasan"},
        {"name": "명월초등학교", "region": "제주", "english_name": "myeongwol-school"},
        {"name": "플로웨이브", "region": "제주", "english_name": "flowave"},
        {"name": "제주 애월 봄날카페", "region": "제주", "english_name": "jeju-aewol-bomnal"},
        {"name": "카페 델문도", "region": "제주", "english_name": "cafe-delmundo"},
        {"name": "카페 꼼마", "region": "제주", "english_name": "cafe-comma"},
        {"name": "이니스프리 하우스", "region": "제주", "english_name": "innisfree-house"},
        {"name": "오설록 티뮤지엄", "region": "제주", "english_name": "osulloc-tea-museum"},
        
        # 부산 지역
        {"name": "흰여울문화마을", "region": "부산", "english_name": "huinyeoul-village"},
        {"name": "감천문화마을", "region": "부산", "english_name": "gamcheon-village"},
        {"name": "해동용궁사", "region": "부산", "english_name": "haedong-yonggungsa"},
        {"name": "태종대", "region": "부산", "english_name": "taejongdae"},
        {"name": "광안리해변", "region": "부산", "english_name": "gwangalli-beach"},
        {"name": "부산타워", "region": "부산", "english_name": "busan-tower"},
        {"name": "자갈치시장", "region": "부산", "english_name": "jagalchi-market"},
        {"name": "센텀시티", "region": "부산", "english_name": "centum-city"},
        
        # 강릉 지역
        {"name": "강릉 안목해변", "region": "강릉", "english_name": "anmok-beach"},
        {"name": "경포해변", "region": "강릉", "english_name": "gyeongpo-beach"},
        {"name": "정동진", "region": "강릉", "english_name": "jeongdongjin"},
        {"name": "오죽헌", "region": "강릉", "english_name": "ojukheon"},
        {"name": "테라로사 강릉", "region": "강릉", "english_name": "terarosa-gangneung"},
        
        # 전주 지역
        {"name": "전주한옥마을", "region": "전주", "english_name": "jeonju-hanok-village"},
        {"name": "경기전", "region": "전주", "english_name": "gyeonggijeon"},
        {"name": "오목대", "region": "전주", "english_name": "omokdae"},
        {"name": "전동성당", "region": "전주", "english_name": "jeondong-cathedral"},
        
        # 경주 지역
        {"name": "불국사", "region": "경주", "english_name": "bulguksa"},
        {"name": "석굴암", "region": "경주", "english_name": "seokguram"},
        {"name": "첨성대", "region": "경주", "english_name": "cheomseongdae"},
        {"name": "안압지", "region": "경주", "english_name": "anapji"},
        {"name": "대릉원", "region": "경주", "english_name": "daereungwon"},
        
        # 여수 지역
        {"name": "여수 밤바다", "region": "여수", "english_name": "yeosu-night-sea"},
        {"name": "오동도", "region": "여수", "english_name": "odongdo"},
        {"name": "여수엑스포", "region": "여수", "english_name": "yeosu-expo"},
        {"name": "하멜등대", "region": "여수", "english_name": "hamel-lighthouse"},
        
        # 기타 관광지
        {"name": "남이섬", "region": "가평", "english_name": "nami-island"},
        {"name": "인사동", "region": "서울", "english_name": "insadong"},
        {"name": "명동", "region": "서울", "english_name": "myeongdong"},
        {"name": "홍대", "region": "서울", "english_name": "hongdae"},
        {"name": "이태원", "region": "서울", "english_name": "itaewon"},
        {"name": "강남", "region": "서울", "english_name": "gangnam"},
        
        # 추가 지역들
        {"name": "속초해변", "region": "속초", "english_name": "sokcho-beach"},
        {"name": "설악산", "region": "속초", "english_name": "seoraksan"},
        {"name": "속초중앙시장", "region": "속초", "english_name": "sokcho-jungang-market"},
        {"name": "아바이마을", "region": "속초", "english_name": "abai-village"},
        
        {"name": "동피랑벽화마을", "region": "통영", "english_name": "dongpirang-village"},
        {"name": "루지", "region": "통영", "english_name": "luge"},
        {"name": "케이블카", "region": "통영", "english_name": "cable-car"},
        {"name": "한산도", "region": "통영", "english_name": "hansando"},
        
        {"name": "죽녹원", "region": "담양", "english_name": "juknokwon"},
        {"name": "메타세쿼이아길", "region": "담양", "english_name": "metasequoia-road"},
        {"name": "관방제림", "region": "담양", "english_name": "gwanbangjerim"},
        
        {"name": "하회마을", "region": "안동", "english_name": "hahoe-village"},
        {"name": "도산서원", "region": "안동", "english_name": "dosan-seowon"},
        {"name": "안동 간고등어", "region": "안동", "english_name": "andong-mackerel"},
        
        {"name": "참소리박물관", "region": "강릉", "english_name": "chamsori-museum"},
        {"name": "커피커퍼", "region": "강릉", "english_name": "coffee-cupper"},
        {"name": "한국전통문화전당", "region": "전주", "english_name": "korean-traditional-culture-center"},
        {"name": "국립경주박물관", "region": "경주", "english_name": "gyeongju-national-museum"},
        {"name": "돌산대교", "region": "여수", "english_name": "dolsan-bridge"},
        {"name": "송도해변", "region": "부산", "english_name": "songdo-beach"},
        {"name": "오륙도", "region": "부산", "english_name": "oryukdo"},
    ]
    
    print(f"✅ {len(spaces_data)}개 공간 데이터 로드 완료")
    return spaces_data

def run_automated_crawling():
    """전체 자동화 크롤링 실행"""
    print("🚀 SCENT DESTINATION 이미지 자동 크롤링 시작!")
    
    # 공간 데이터 로드
    spaces_data = load_spaces_data()
    total_spaces = len(spaces_data)
    
    print(f"📊 총 {total_spaces}개 공간 × 3장 = {total_spaces * 3}장 수집 예정\n")
    
    # 크롤러 초기화
    crawler = GoogleMapsImageCrawler(headless=False)  # 처음에는 headless=False로 확인용
    
    try:
        total_success = 0
        total_attempted = 0
        
        for i, space in enumerate(spaces_data, 1):
            print(f"\n[{i}/{total_spaces}] 진행 중...")
            
            success_count = crawler.crawl_place_images(
                place_name=space["name"],
                region=space["region"],
                english_name=space["english_name"],
                max_images=3
            )
            
            total_success += success_count
            total_attempted += 3
            
            # 과도한 요청 방지를 위한 딜레이
            time.sleep(2)
            
            # 10개마다 진행 상황 출력
            if i % 10 == 0:
                print(f"\n📈 중간 결과: {total_success}/{total_attempted} 이미지 수집 ({i}/{total_spaces} 공간 완료)")
    
    except KeyboardInterrupt:
        print("\n⚠️ 사용자에 의해 중단됨")
    
    except Exception as e:
        print(f"\n💥 예상치 못한 오류: {e}")
    
    finally:
        crawler.close()
        
        # 최종 결과 출력
        success_rate = (total_success / total_attempted * 100) if total_attempted > 0 else 0
        print(f"\n🎉 크롤링 완료!")
        print(f"📈 최종 성공률: {total_success}/{total_attempted} ({success_rate:.1f}%)")
        print(f"📁 저장 위치: {crawler.download_dir.absolute()}")
        print(f"\n💡 다음 단계:")
        print(f"1. 수집된 이미지들을 확인하세요")
        print(f"2. 품질이 낮은 이미지들을 수동으로 교체하세요")
        print(f"3. npm run dev로 개발서버를 시작해서 결과를 확인하세요")

if __name__ == "__main__":
    # 필요한 패키지 확인
    required_packages = ['selenium', 'requests', 'pandas']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("❌ 필요한 패키지가 설치되지 않았습니다:")
        for package in missing_packages:
            print(f"   pip install {package}")
        print("\n설치 후 다시 실행해주세요.")
        sys.exit(1)
    
    # 크롤링 실행
    run_automated_crawling() 