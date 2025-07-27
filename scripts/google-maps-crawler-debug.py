#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🔧 SCENT DESTINATION Google Maps 이미지 크롤러 (디버깅 버전)
더 안정적인 셀렉터와 긴 대기시간으로 DOM 구조 확인
"""

import os
import sys
import time
import json
import requests
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class GoogleMapsImageCrawlerDebug:
    def __init__(self, headless=False):
        """디버깅용 크롤러 초기화 (headless=False로 브라우저 보이게)"""
        self.download_dir = Path('public/images/places')
        self.download_dir.mkdir(parents=True, exist_ok=True)
        
        self.driver = self._setup_driver(headless)
        self.wait = WebDriverWait(self.driver, 20)  # 대기시간 20초로 증가
        
        print(f"🚀 Google Maps 디버깅 크롤러 초기화 완료!")
        print(f"📁 저장 디렉토리: {self.download_dir.absolute()}")
    
    def _setup_driver(self, headless=False):
        """Chrome 드라이버 설정 (디버깅용)"""
        options = Options()
        
        if headless:
            options.add_argument('--headless')
        
        # 디버깅을 위한 옵션들
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--window-size=1920,1080')
        
        # User-Agent 설정
        options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
        
        try:
            driver = webdriver.Chrome(options=options)
            return driver
        except Exception as e:
            print(f"❌ Chrome 드라이버 설정 실패: {e}")
            sys.exit(1)
    
    def search_place(self, place_name, region=""):
        """구글 지도에서 장소 검색 (디버깅 버전)"""
        try:
            # 구글 지도 접속
            print("🌐 구글 지도 접속 중...")
            self.driver.get('https://www.google.com/maps/')
            time.sleep(5)  # 페이지 로딩 대기 시간 증가
            
            # 검색어 조합
            search_query = f"{place_name} {region}".strip()
            print(f"🔍 검색 중: {search_query}")
            
            # 검색창 찾기 (여러 가지 셀렉터 시도)
            search_selectors = [
                'input#searchboxinput',
                'input[aria-label*="검색"]',
                'input[placeholder*="검색"]',
                'input[data-value]',
                '#searchboxinput'
            ]
            
            search_box = None
            for selector in search_selectors:
                try:
                    search_box = self.wait.until(
                        EC.presence_of_element_located((By.CSS_SELECTOR, selector))
                    )
                    print(f"✅ 검색창 발견: {selector}")
                    break
                except TimeoutException:
                    print(f"❌ 검색창 못찾음: {selector}")
                    continue
            
            if not search_box:
                print("❌ 검색창을 찾을 수 없습니다")
                return False
            
            # 검색어 입력
            search_box.clear()
            search_box.send_keys(search_query)
            search_box.send_keys(Keys.RETURN)
            
            print("⏳ 검색 결과 로딩 대기 중...")
            time.sleep(8)  # 검색 결과 로딩 대기 시간 증가
            
            return True
            
        except Exception as e:
            print(f"❌ 검색 중 오류: {e}")
            return False
    
    def find_first_result(self):
        """첫 번째 검색 결과 찾기 (여러 셀렉터 시도)"""
        print("🎯 첫 번째 검색 결과 찾는 중...")
        
        # 가능한 첫 번째 결과 셀렉터들
        result_selectors = [
            '[data-result-index="1"]',
            '[data-result-index="0"]', 
            '.hfpxzc',  # 일반적인 검색 결과 클래스
            '[role="article"]',
            '.Nv2PK',
            '.bfdHYd',
            'a[data-cid]',
            '.section-result',
            '[jsaction*="mouseout"]'
        ]
        
        for i, selector in enumerate(result_selectors):
            try:
                print(f"🔍 시도 중 ({i+1}): {selector}")
                elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                
                if elements:
                    print(f"✅ 발견! 총 {len(elements)}개 요소 - {selector}")
                    first_element = elements[0]
                    
                    # 요소 정보 출력
                    print(f"   📍 요소 텍스트: {first_element.text[:100]}...")
                    print(f"   📍 요소 클래스: {first_element.get_attribute('class')}")
                    
                    # 클릭 시도
                    try:
                        self.driver.execute_script("arguments[0].scrollIntoView();", first_element)
                        time.sleep(2)
                        first_element.click()
                        print(f"✅ 첫 번째 결과 클릭 성공!")
                        return True
                    except Exception as click_error:
                        print(f"❌ 클릭 실패: {click_error}")
                        continue
                        
            except Exception as e:
                print(f"❌ 셀렉터 {selector} 실패: {e}")
                continue
        
        print("❌ 첫 번째 검색 결과를 찾을 수 없음")
        return False
    
    def find_images(self):
        """이미지 찾기 (여러 방법 시도)"""
        print("📸 이미지 찾는 중...")
        
        # 이미지가 로딩될 때까지 대기
        time.sleep(5)
        
        # 가능한 이미지 셀렉터들
        image_selectors = [
            'img[src*="googleusercontent.com"]',
            'img[src*="gstatic.com"]',
            'img[src*="maps.googleapis.com"]',
            '[data-photo-index] img',
            '.section-hero-header img',
            '.gallery img',
            'button img',
            'img[jsname]'
        ]
        
        all_images = []
        
        for selector in image_selectors:
            try:
                images = self.driver.find_elements(By.CSS_SELECTOR, selector)
                if images:
                    print(f"✅ {len(images)}개 이미지 발견 - {selector}")
                    for img in images[:3]:  # 최대 3개만
                        src = img.get_attribute('src')
                        if src and 'data:image' not in src:  # base64 이미지 제외
                            all_images.append(src)
                            print(f"   📸 이미지 URL: {src[:80]}...")
                            
            except Exception as e:
                print(f"❌ 이미지 셀렉터 {selector} 실패: {e}")
                continue
        
        # 중복 제거
        unique_images = list(set(all_images))
        print(f"✅ 총 {len(unique_images)}개 고유 이미지 발견")
        
        return unique_images[:3]  # 최대 3개 반환
    
    def debug_single_place(self, place_name, region=""):
        """단일 장소 디버깅"""
        print(f"\n🎯 '{place_name}' 디버깅 시작...")
        
        # 1단계: 검색
        if not self.search_place(place_name, region):
            print("❌ 검색 실패")
            return False
        
        print("⏸️  검색 완료! 결과를 확인하세요. 계속하려면 Enter를 누르세요...")
        input()  # 사용자 입력 대기
        
        # 2단계: 첫 번째 결과 클릭
        if not self.find_first_result():
            print("❌ 첫 번째 결과 클릭 실패")
            return False
        
        print("⏸️  첫 번째 결과 클릭 완료! 장소 페이지를 확인하세요. 계속하려면 Enter를 누르세요...")
        input()  # 사용자 입력 대기
        
        # 3단계: 이미지 찾기
        images = self.find_images()
        if not images:
            print("❌ 이미지를 찾을 수 없음")
            return False
        
        print(f"✅ {len(images)}개 이미지 발견!")
        for i, img_url in enumerate(images):
            print(f"   {i+1}. {img_url}")
        
        return True
    
    def close(self):
        """드라이버 종료"""
        print("⏸️  브라우저를 닫으려면 Enter를 누르세요...")
        input()
        if self.driver:
            self.driver.quit()
            print("🔚 크롤러 종료")

def debug_specific_place():
    """특정 장소 디버깅"""
    print("🔧 Google Maps 크롤러 디버깅 모드")
    
    crawler = GoogleMapsImageCrawlerDebug(headless=False)
    
    try:
        # 테스트할 장소들
        test_places = [
            {"name": "연남서식", "region": "서울"},
            {"name": "불국사", "region": "경주"},
            {"name": "몽상드애월", "region": "제주"}
        ]
        
        for place in test_places:
            success = crawler.debug_single_place(place["name"], place["region"])
            print(f"{'✅ 성공' if success else '❌ 실패'}: {place['name']}")
            
            if success:
                print("✅ 이 장소는 정상적으로 처리됩니다!")
                break
            else:
                continue_debug = input("❌ 실패했습니다. 다음 장소를 시도하시겠습니까? (y/n): ")
                if continue_debug.lower() != 'y':
                    break
    
    except KeyboardInterrupt:
        print("\n⚠️ 사용자에 의해 중단됨")
    finally:
        crawler.close()

if __name__ == "__main__":
    debug_specific_place() 