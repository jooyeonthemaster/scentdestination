import { NextRequest, NextResponse } from 'next/server';
import { hotplaceService } from '@/lib/firebaseService';

export async function GET() {
  try {
    console.log('🔍 파이어베이스 DB 데이터 확인 중...');
    
    // 실제 파이어베이스에서 데이터 가져오기
    const hotplaces = await hotplaceService.getAll();
    
    console.log('✅ 파이어베이스 데이터 조회 성공:', hotplaces.length, '개');
    
    return NextResponse.json({
      success: true,
      count: hotplaces.length,
      data: hotplaces,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ 파이어베이스 데이터 조회 실패:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 