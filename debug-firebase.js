// 임시 파이어베이스 데이터 확인 스크립트
// 브라우저 콘솔에서 실행하세요

async function checkFirebaseData() {
  try {
    console.log('🔥 파이어베이스 데이터 확인 시작...');
    
    // hotplaceService import (개발자 도구에서 수동 실행)
    const response = await fetch('/api/debug-firebase');
    const data = await response.json();
    
    console.log('📊 파이어베이스 DB 데이터:', data);
    return data;
  } catch (error) {
    console.error('❌ 데이터 확인 실패:', error);
  }
}

// 사용법: 브라우저 콘솔에서 checkFirebaseData() 실행 