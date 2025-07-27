import { GoogleGenerativeAI } from '@google/generative-ai';
import { HotplaceDestination } from '@/types';

// Gemini API 초기화 (환경변수에서 키를 자동으로 가져옴)
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export function isGeminiInitialized(): boolean {
  return genAI !== null && !!apiKey;
}

// 자연어 데이터를 JSON으로 변환하는 프롬프트
const CONVERSION_PROMPT = `
당신은 향기 여행지 데이터를 정확한 JSON 형식으로 변환하는 전문가입니다.

주어진 자연어 데이터를 다음 TypeScript 인터페이스에 맞는 JSON으로 변환해주세요:

interface HotplaceDestination {
  name: string;
  category: 'cafe' | 'culture' | 'gallery' | 'nature' | 'coastal' | 'urban' | 'traditional' | 'festival' | 'mountain' | 'unique';
  location: {
    region: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  specialFeature: string;
  atmosphere: string;
  signatureScent: {
    name: string;
    notes: string[];
    experience: string;
  };
  visitInfo: {
    openingHours: string;
    bestTime: string;
    tips: string;
  };
  transportation: string;
  images: string[];
  tags: string[];
  featured: boolean;
}

변환 규칙:
1. coordinates는 주소를 기반으로 대략적인 위도/경도를 추정해서 입력 (서울 지역 기준)
2. images는 ["/images/places/영문소문자-하이픈-형태.jpg"] 형식으로 생성
3. tags는 장소의 특성을 반영하는 3-7개의 태그 생성
4. featured는 모두 true로 설정
5. category는 주어진 값 중 가장 적절한 것 선택
6. region에서 "서울 OO구" 형태면 "서울"로 간단히 변환

**CRITICAL**: 응답은 완전하고 유효한 JSON 배열만 출력하세요.
- 절대 코드 블록(\`\`\`)을 사용하지 마세요
- 절대 다른 텍스트나 설명을 포함하지 마세요  
- 절대 마크다운 형식을 사용하지 마세요
- 첫 번째 문자는 반드시 '[' 이어야 합니다
- 마지막 문자는 반드시 ']' 이어야 합니다
- JSON이 잘리지 않도록 완전한 형태로 출력하세요
- 모든 문자열은 따옴표로 감싸고, 모든 객체와 배열을 완전히 닫으세요

여러 장소가 주어지면 배열로 반환하고, 하나만 주어지면 단일 객체를 배열에 담아 반환하세요.
 `;

export async function convertNaturalLanguageToJSON(naturalLanguageData: string): Promise<Omit<HotplaceDestination, 'id'>[]> {
  if (!genAI) {
    throw new Error('Gemini API 키가 설정되지 않았습니다. .env.local 파일의 GEMINI_API_KEY를 확인해주세요.');
  }

  try {
         // Gemini 2.0 Flash 모델 사용
     const model = genAI.getGenerativeModel({ 
       model: 'gemini-2.0-flash-exp',
       generationConfig: {
         temperature: 0.1, // 낮은 temperature로 일관성 있는 결과
         topP: 0.9,
         topK: 40,
         maxOutputTokens: 16384, // 토큰 수 늘리기
       }
     });

    const prompt = `${CONVERSION_PROMPT}\n\n변환할 데이터:\n${naturalLanguageData}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

         // JSON 파싱 (코드 블록 제거)
     try {
       console.log('원본 Gemini 응답:', text);
       
       // ```json 또는 ``` 코드 블록 제거
       let cleanedText = text.trim();
       
       // 코드 블록으로 감싸진 경우 제거
       if (cleanedText.startsWith('```json')) {
         cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
       } else if (cleanedText.startsWith('```')) {
         cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
       }
       
       console.log('정리된 텍스트:', cleanedText);
       
       // JSON이 잘렸는지 확인
       if (!cleanedText.endsWith(']') && !cleanedText.endsWith('}')) {
         console.warn('JSON이 잘린 것 같습니다. 응답이 완전하지 않을 수 있습니다.');
         throw new Error('Gemini 응답이 불완전합니다. JSON이 중간에 잘렸습니다.');
       }
       
       const parsedData = JSON.parse(cleanedText);
       
       // 단일 객체인 경우 배열로 변환
       if (!Array.isArray(parsedData)) {
         return [parsedData];
       }
       
       return parsedData;
     } catch (parseError) {
       console.error('JSON 파싱 오류:', parseError);
       console.error('Gemini 응답 길이:', text.length);
       console.error('Gemini 응답 마지막 100자:', text.slice(-100));
       throw new Error(`Gemini에서 반환된 데이터가 유효한 JSON이 아닙니다: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
     }

  } catch (error) {
    console.error('Gemini API 오류:', error);
    throw new Error(`데이터 변환 중 오류가 발생했습니다: ${error}`);
  }
}

// 변환된 데이터 유효성 검사
export function validateHotplaceData(data: any): boolean {
  const requiredFields = [
    'name', 'category', 'location', 'description', 
    'specialFeature', 'atmosphere', 'signatureScent', 
    'visitInfo', 'transportation', 'images', 'tags', 'featured'
  ];

  if (!data || typeof data !== 'object') return false;

  for (const field of requiredFields) {
    if (!(field in data)) {
      console.error(`필수 필드 누락: ${field}`);
      return false;
    }
  }

  // location 하위 필드 검사
  const locationFields = ['region', 'address', 'coordinates'];
  for (const field of locationFields) {
    if (!(field in data.location)) {
      console.error(`location.${field} 필드 누락`);
      return false;
    }
  }

  // coordinates 하위 필드 검사
  if (!('lat' in data.location.coordinates) || !('lng' in data.location.coordinates)) {
    console.error('coordinates에 lat 또는 lng 필드 누락');
    return false;
  }

  // signatureScent 하위 필드 검사
  const scentFields = ['name', 'notes', 'experience'];
  for (const field of scentFields) {
    if (!(field in data.signatureScent)) {
      console.error(`signatureScent.${field} 필드 누락`);
      return false;
    }
  }

  // visitInfo 하위 필드 검사
  const visitFields = ['openingHours', 'bestTime', 'tips'];
  for (const field of visitFields) {
    if (!(field in data.visitInfo)) {
      console.error(`visitInfo.${field} 필드 누락`);
      return false;
    }
  }

  return true;
} 