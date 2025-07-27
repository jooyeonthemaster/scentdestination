'use client';

import { useState, useEffect } from 'react';
// import { convertNaturalLanguageToJSON, validateHotplaceData } from '@/lib/geminiService'; // API 라우트로 이동
import { addBulkHotplaces } from '@/lib/manualDataInput';
import { HotplaceDestination } from '@/types';

interface BatchStats {
  totalProcessed: number;
  totalSuccessful: number;
  totalFailed: number;
  successRate: number;
  failedPlaces?: Array<{ name: string; error: string }>;
}

export default function AdminPage() {
  const [naturalLanguageData, setNaturalLanguageData] = useState('');
  const [convertedData, setConvertedData] = useState<Omit<HotplaceDestination, 'id'>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [geminiInitialized, setGeminiInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [batchEnhancing, setBatchEnhancing] = useState(false);
  const [batchProgress, setBatchProgress] = useState('');
  const [lastBatchStats, setLastBatchStats] = useState<BatchStats | null>(null);
  const [failedDataCount, setFailedDataCount] = useState<number>(0);

  // 클라이언트에서만 API 키 상태 확인
  useEffect(() => {
    setIsClient(true);
    // 실제 변환 시에 API 키 체크하도록 일단 true로 설정
    // (실제 호출 시 에러가 나면 그때 처리)
    setGeminiInitialized(true);
    
    // 실패한 데이터 개수 확인
    checkFailedDataCount();
  }, []);

  // 실패한 데이터 개수 확인
  const checkFailedDataCount = async () => {
    try {
      const response = await fetch('/api/batch-enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ onlyFailed: true, checkOnly: true }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.stats) {
          setFailedDataCount(result.stats.totalToProcess || 0);
        }
      }
    } catch (error) {
      console.error('Failed data count check failed:', error);
    }
  };

  // 예시 데이터
  const exampleData = `31. 디뮤지엄 (한남)
id: d_museum_hannam

name: 디뮤지엄

category: gallery

location:

region: 서울 용산구

address: 서울특별시 용산구 독서당로29길 5-6

description: 감각적이고 트렌디한 현대미술 전시로 유명한 갤러리입니다. 사진 찍기 좋은 전시와 다양한 아트 상품으로 젊은 층에게 인기가 많습니다.

specialFeature: 빛, 소리 등 다양한 요소를 활용한 몰입형 전시와 시즌별로 바뀌는 감각적인 기획 전시.

atmosphere: 세련됨, 감각적, 트렌디

signatureScent:

name: 예술의 영감

notes: 오존, 베르가못, 화이트 머스크, 시더우드, 앰버

experience: 맑고 깨끗한 오존 향으로 시작해, 베르가못의 상큼함이 더해져 예술 작품을 처음 마주했을 때의 신선하고 영감을 주는 느낌을 표현합니다. 은은한 머스크와 우디 향이 공간의 세련미를 더합니다.

visitInfo:

openingHours: 화~일 10:00~19:00 (월요일 휴관)

bestTime: 평일 오전, 여유롭게 전시를 관람하고 싶을 때.

tips: 전시가 자주 바뀌니 방문 전 홈페이지에서 현재 전시를 확인하는 것이 좋습니다.

transportation: 6호선 한강진역 3번 출구에서 도보 10분

images: images에 대한 정보는 현재 제공할 수 없습니다.`;

  const handleConvert = async () => {
    if (!naturalLanguageData.trim()) {
      setError('변환할 데이터를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // API 라우트로 변환 요청
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          naturalLanguageData: naturalLanguageData
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '서버 오류가 발생했습니다.');
      }

      if (result.success && result.data && result.data.length > 0) {
        setConvertedData(result.data);
        setSuccess(result.message);
      } else {
        setError('변환된 데이터가 없습니다.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터 변환 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFirebase = async () => {
    if (convertedData.length === 0) {
      setError('Firebase에 추가할 데이터가 없습니다.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await addBulkHotplaces(convertedData);
      setSuccess(`${convertedData.length}개의 데이터가 Firebase에 성공적으로 추가되었습니다.`);
      setConvertedData([]);
      setNaturalLanguageData('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Firebase 추가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 배치 고도화 함수 (전체 또는 실패한 것만)
  const handleBatchEnhance = async (onlyFailed: boolean = false) => {
    const confirmMessage = onlyFailed 
      ? '실패한 장소 데이터만 다시 Gemini AI로 고도화하시겠습니까?'
      : '모든 장소 데이터를 Gemini AI로 고도화하시겠습니까?\n\n이 작업은 시간이 오래 걸릴 수 있습니다.';
    
    if (!confirm(confirmMessage)) {
      return;
    }

    setBatchEnhancing(true);
    setBatchProgress(onlyFailed ? '실패한 데이터 재처리를 시작합니다...' : '배치 고도화를 시작합니다...');
    setError('');
    setSuccess('');
    setLastBatchStats(null);

    try {
      const response = await fetch('/api/batch-enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ onlyFailed }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '서버 오류가 발생했습니다.');
      }

      if (result.success) {
        setSuccess(`🎉 ${result.message}\n성공률: ${result.stats.successRate}%`);
        setBatchProgress(`완료: ${result.stats.totalSuccessful}개 성공, ${result.stats.totalFailed}개 실패`);
        setLastBatchStats(result.stats);
        
        // 배치 완료 후 실패한 데이터 개수 다시 확인
        await checkFailedDataCount();
      } else {
        setError(result.error || '배치 고도화에 실패했습니다.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '배치 고도화 중 오류가 발생했습니다.');
      setBatchProgress('');
    } finally {
      setBatchEnhancing(false);
    }
  };

  const loadExampleData = () => {
    setNaturalLanguageData(exampleData);
  };

  return (
    <main className="pt-20 min-h-screen bg-cream">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-charcoal mb-8 text-center">
            🤖 향기 여행지 데이터 변환 어드민
          </h1>
          
          {/* Gemini API 상태 */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              🔑 Gemini API 상태
            </h2>
            {!isClient ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <p className="text-gray-600 font-medium">🔄 로딩 중...</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-green-600 font-medium">✅ Gemini 2.0 Flash 모델이 준비되었습니다.</p>
                  <p className="text-sm text-gray-500 ml-2">(실제 API 키는 변환 시 확인됩니다)</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h3 className="text-sm font-semibold text-yellow-800 mb-2">⚠️ 무료 티어 제한 사항</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 일일 요청 한도: 50개</li>
                    <li>• 쿼터 리셋: 매일 자정 (PST)</li>
                    <li>• 한도 초과 시 24시간 대기 또는 유료 플랜 업그레이드 필요</li>
                  </ul>
                  <p className="text-xs text-yellow-600 mt-2">
                    📎 <a href="https://ai.google.dev/pricing" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-800">
                      Google AI Studio 요금제 확인하기
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 배치 고도화 섹션 */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              🚀 데이터 AI 고도화
            </h2>
            <p className="text-charcoal/70 mb-4">
              Firebase에 저장된 장소 데이터를 Gemini AI로 고도화하여 상세한 향기 분석, 방문 가이드, 페어링 추천 등을 추가합니다.
            </p>
            
            {batchProgress && (
              <div className="bg-white/70 rounded-lg p-3 mb-4">
                <p className="text-sm text-charcoal/80">{batchProgress}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={() => handleBatchEnhance(false)}
                disabled={batchEnhancing || loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {batchEnhancing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    AI 고도화 중...
                  </>
                ) : (
                  <>
                    🧠 전체 데이터 AI 고도화
                  </>
                )}
              </button>

              {((lastBatchStats && lastBatchStats.totalFailed > 0) || failedDataCount > 0) && (
                <button
                  onClick={() => handleBatchEnhance(true)}
                  disabled={batchEnhancing || loading}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {batchEnhancing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      재처리 중...
                    </>
                  ) : (
                    <>
                      🔄 실패한 {lastBatchStats?.totalFailed || failedDataCount}개 재처리
                    </>
                  )}
                </button>
              )}
            </div>
            
            <div className="text-sm text-charcoal/60 flex items-center">
              💡 배치당 3개씩 처리하여 안정성을 높였습니다 (재시도 로직 포함)
            </div>
          </div>

          {/* 마지막 배치 결과 표시 */}
          {lastBatchStats && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                📊 마지막 배치 처리 결과
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{lastBatchStats.totalProcessed}</div>
                  <div className="text-sm text-blue-600">처리됨</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{lastBatchStats.totalSuccessful}</div>
                  <div className="text-sm text-green-600">성공</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-red-600">{lastBatchStats.totalFailed}</div>
                  <div className="text-sm text-red-600">실패</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">{lastBatchStats.successRate}%</div>
                  <div className="text-sm text-purple-600">성공률</div>
                </div>
              </div>

              {lastBatchStats.failedPlaces && lastBatchStats.failedPlaces.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-charcoal mb-3">❌ 실패한 장소들</h3>
                  <div className="bg-red-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    {lastBatchStats.failedPlaces.map((failed, index) => (
                      <div key={index} className="mb-3 last:mb-0">
                        <div className="font-medium text-red-800">{failed.name}</div>
                        <div className="text-sm text-red-600">{failed.error}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-sm text-charcoal/70">
                    위 장소들을 "실패한 데이터 재처리" 버튼으로 다시 시도할 수 있습니다.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 자연어 데이터 입력 */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-charcoal">
                📝 자연어 데이터 입력
              </h2>
              <button
                onClick={loadExampleData}
                className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 text-sm"
              >
                예시 데이터 로드
              </button>
            </div>
            <textarea
              value={naturalLanguageData}
              onChange={(e) => setNaturalLanguageData(e.target.value)}
              placeholder="자연어 형태의 장소 데이터를 입력하세요..."
              className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage resize-none"
              disabled={loading}
            />
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                Gemini 2.0 Flash가 자동으로 JSON 형식으로 변환합니다
              </p>
              <button
                onClick={handleConvert}
                disabled={loading || batchEnhancing}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? '🤖 변환중...' : '🚀 JSON 변환'}
              </button>
            </div>
          </div>

          {/* 변환 결과 */}
          {convertedData.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                📊 변환 결과 ({convertedData.length}개)
              </h2>
              <div className="max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-charcoal whitespace-pre-wrap">
                  {JSON.stringify(convertedData, null, 2)}
                </pre>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddToFirebase}
                  disabled={loading || batchEnhancing}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? '📤 추가중...' : '📤 Firebase에 추가'}
                </button>
              </div>
            </div>
          )}

          {/* 상태 메시지 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-600 whitespace-pre-line">❌ {error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-600 whitespace-pre-line">✅ {success}</p>
            </div>
          )}

          {/* 사용법 안내 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">📖 사용법</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>.env.local 파일에 GEMINI_API_KEY가 설정되어 있는지 확인합니다</li>
              <li><strong>전체 데이터 AI 고도화:</strong> 모든 Firebase 데이터를 AI로 분석하여 고급 정보 추가</li>
              <li><strong>실패한 데이터 재처리:</strong> 이전에 실패한 데이터만 선별하여 다시 시도</li>
              <li><strong>신규 데이터 추가:</strong> 자연어 형태의 장소 데이터를 입력하고 JSON으로 변환</li>
              <li>"JSON 변환" 버튼을 클릭하여 Gemini가 데이터를 변환하도록 합니다</li>
              <li>변환 결과를 확인한 후 "Firebase에 추가" 버튼을 클릭합니다</li>
              <li>scent-map 페이지에서 새로 추가된 데이터를 확인할 수 있습니다</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
} 