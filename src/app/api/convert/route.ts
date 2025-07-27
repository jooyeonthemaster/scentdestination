import { NextRequest, NextResponse } from 'next/server';
import { convertNaturalLanguageToJSON, validateHotplaceData } from '@/lib/geminiService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { naturalLanguageData } = body;

    // 입력 데이터 검증
    if (!naturalLanguageData || typeof naturalLanguageData !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          error: '자연어 데이터가 제공되지 않았습니다.' 
        },
        { status: 400 }
      );
    }

    if (naturalLanguageData.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: '변환할 데이터를 입력해주세요.' 
        },
        { status: 400 }
      );
    }

    console.log('🤖 자연어 데이터를 JSON으로 변환 시작...');
    console.log('입력 데이터 길이:', naturalLanguageData.length);

    // Gemini API를 통해 변환
    const convertedData = await convertNaturalLanguageToJSON(naturalLanguageData);

    console.log(`✅ 변환 완료: ${convertedData.length}개의 장소 데이터`);

    // 각 데이터 유효성 검사
    const validatedData = [];
    const errors = [];

    for (let i = 0; i < convertedData.length; i++) {
      const data = convertedData[i];
      const isValid = validateHotplaceData(data);
      
      if (isValid) {
        validatedData.push(data);
        console.log(`✅ 데이터 ${i + 1} 유효성 검사 통과: ${data.name}`);
      } else {
        errors.push(`데이터 ${i + 1} (${data.name || '이름 없음'}) 유효성 검사 실패`);
        console.error(`❌ 데이터 ${i + 1} 유효성 검사 실패:`, data);
      }
    }

    if (validatedData.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: '유효한 데이터가 없습니다.', 
          details: errors 
        },
        { status: 422 }
      );
    }

    if (errors.length > 0) {
      console.warn('일부 데이터에서 오류 발생:', errors);
    }

    return NextResponse.json({
      success: true,
      message: `${validatedData.length}개의 장소 데이터가 성공적으로 변환되었습니다.`,
      data: validatedData,
      warnings: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('❌ API 변환 오류:', error);
    
    // 에러 타입별 처리
    if (error instanceof Error) {
      if (error.message.includes('GEMINI_API_KEY')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Gemini API 키가 설정되지 않았습니다. 환경변수를 확인해주세요.' 
          },
          { status: 500 }
        );
      }
      
      if (error.message.includes('JSON')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Gemini에서 올바른 JSON 형식으로 응답하지 않았습니다. 다시 시도해주세요.' 
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: '데이터 변환 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
} 