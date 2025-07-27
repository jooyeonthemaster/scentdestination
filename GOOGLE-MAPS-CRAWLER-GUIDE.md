# 🤖 Google Maps 이미지 자동 크롤링 가이드

## 📋 개요
306장의 이미지를 일일이 찾아서 다운로드하는 대신, **구글 지도에서 자동으로 크롤링**해서 수집하는 완전 자동화 시스템입니다!

## 🚀 빠른 시작

### 1단계: 필요한 도구 설치

#### Python 환경 설정
```bash
# Python 3.8+ 필요
python --version

# pip 업데이트
python -m pip install --upgrade pip

# 필요한 패키지 설치
pip install selenium requests pandas webdriver-manager
```

#### Chrome 드라이버 자동 설치 (추천)
```bash
# webdriver-manager로 자동 설치
pip install webdriver-manager
```

#### 수동 Chrome 드라이버 설치 (선택사항)
1. 현재 Chrome 브라우저 버전 확인
   - Chrome 주소창에 `chrome://version/` 입력
2. [Chrome Driver 다운로드](https://sites.google.com/chromium.org/driver/)
3. 다운로드한 `chromedriver.exe`를 시스템 PATH에 추가

### 2단계: 공간 데이터 추출
```bash
# 프로젝트 루트에서 실행
node scripts/extract-spaces-data.js
```

### 3단계: 크롤링 실행
```bash
# Python 크롤러 실행
python scripts/google-maps-crawler.py
```

## 📊 실행 결과
```
🚀 SCENT DESTINATION 이미지 자동 크롤링 시작!
📊 총 102개 공간 × 3장 = 306장 수집 예정

🎯 '연남서식' 이미지 수집 시작...
🔍 검색 중: 연남서식 서울
  📸 이미지 1 URL 수집: https://lh5.googleusercontent.com/p/AF1QipN...
  📸 이미지 2 URL 수집: https://lh5.googleusercontent.com/p/AF1QipO...
  📸 이미지 3 URL 수집: https://lh5.googleusercontent.com/p/AF1QipP...
  💾 저장 완료: yeonnam-seosik-1.jpg
  💾 저장 완료: yeonnam-seosik-2.jpg
  💾 저장 완료: yeonnam-seosik-3.jpg
✨ '연남서식' 완료: 3/3 이미지 저장

...

🎉 크롤링 완료!
📈 최종 성공률: 278/306 (90.8%)
📁 저장 위치: /path/to/public/images/places/
```

## ⚙️ 고급 설정

### headless 모드 변경
```python
# 브라우저 창 보기 (디버깅용)
crawler = GoogleMapsImageCrawler(headless=False)

# 백그라운드 실행 (실제 크롤링용)
crawler = GoogleMapsImageCrawler(headless=True)
```

### 이미지 개수 조정
```python
# 각 공간당 5장씩 수집
success_count = crawler.crawl_place_images(
    place_name=space["name"],
    region=space["region"], 
    english_name=space["english_name"],
    max_images=5  # 기본값: 3
)
```

### 딜레이 시간 조정
```python
# API 호출 제한을 위한 딜레이 (기본: 2초)
time.sleep(5)  # 더 안전하게 5초로 증가
```

## 🛠️ 문제 해결

### Chrome 드라이버 오류
```bash
❌ Chrome 드라이버 설정 실패
```
**해결방법:**
1. Chrome 브라우저 최신 버전 설치
2. `pip install webdriver-manager` 실행
3. 또는 수동으로 ChromeDriver 다운로드 후 PATH 설정

### 검색 결과 없음
```bash
❌ Google Maps에서 "장소명" 검색 결과 없음
```
**해결방법:**
1. 장소명이 정확한지 확인
2. 지역명 추가 (예: "연남서식 서울 마포구")
3. 해당 장소가 실제로 구글 지도에 등록되어 있는지 확인

### 이미지 다운로드 실패
```bash
❌ 이미지 다운로드 실패: HTTP 403
```
**해결방법:**
1. 네트워크 연결 확인
2. User-Agent 헤더 변경
3. 딜레이 시간 증가

### 메모리 부족
```bash
💥 예상치 못한 오류: Memory Error
```
**해결방법:**
1. 브라우저 옵션에 메모리 제한 추가
2. 배치 크기 줄이기 (10개씩 처리)
3. headless 모드 사용

## 📈 성능 최적화

### 배치 처리
```python
# 10개씩 나누어 처리
batch_size = 10
for i in range(0, len(spaces_data), batch_size):
    batch = spaces_data[i:i+batch_size]
    # 배치 처리...
    
    # 배치 간 휴식
    time.sleep(10)
```

### 재시도 로직
```python
def crawl_with_retry(place_name, region, english_name, max_retries=3):
    for attempt in range(max_retries):
        try:
            return crawler.crawl_place_images(place_name, region, english_name)
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            time.sleep(5 * (attempt + 1))  # 점진적 딜레이
```

## 📋 체크리스트

### 실행 전 확인사항
- [ ] Python 3.8+ 설치됨
- [ ] Chrome 브라우저 설치됨
- [ ] 필요한 패키지 설치됨 (`pip install selenium requests pandas`)
- [ ] 공간 데이터 추출됨 (`node scripts/extract-spaces-data.js`)
- [ ] `public/images/places/` 디렉토리 존재

### 실행 중 모니터링
- [ ] 브라우저가 정상적으로 열림
- [ ] 검색 결과가 올바르게 나타남
- [ ] 이미지가 올바른 파일명으로 저장됨
- [ ] 에러율이 10% 미만

### 실행 후 확인사항
- [ ] 저장된 이미지 개수 확인
- [ ] 이미지 품질 확인
- [ ] 파일명이 가이드와 일치하는지 확인
- [ ] 웹사이트에서 이미지가 정상 표시되는지 확인

## 🎯 예상 소요 시간
- **설정**: 10분
- **크롤링 실행**: 1-2시간 (102개 공간 × 3장)
- **품질 검수**: 30분
- **총 소요시간**: 약 2-3시간

## 💡 추가 팁

### 안전한 크롤링을 위해
1. **딜레이 준수**: 각 요청 간 최소 1-2초 대기
2. **User-Agent 설정**: 일반 브라우저처럼 인식되도록
3. **시간대 고려**: 트래픽이 적은 시간대 실행
4. **배치 처리**: 한 번에 너무 많은 요청 금지

### 백업 계획
1. **실패한 항목 기록**: 로그 파일 저장
2. **부분 재실행**: 실패한 공간만 다시 크롤링
3. **수동 보완**: 크롤링 실패한 이미지는 수동 다운로드

---
**⚠️ 주의사항**: 
- 구글 지도의 이용약관을 준수하세요
- 상업적 이용 시 저작권을 확인하세요
- 과도한 요청으로 IP 차단되지 않도록 주의하세요 