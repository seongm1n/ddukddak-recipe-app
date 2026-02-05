import React from 'react'
import { View, ScrollView, Text } from 'react-native'

const PRIVACY_CONTENT = `
뚝딱레시피(이하 "서비스")는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」을 준수합니다.

1. 수집하는 개인정보
서비스는 다음과 같은 개인정보를 수집합니다:
• 소셜 로그인 시: 이메일 주소, 이름, 프로필 사진
• 서비스 이용 시: 저장한 레시피 정보, 앱 사용 기록

2. 개인정보의 수집 목적
수집된 개인정보는 다음 목적으로 사용됩니다:
• 회원 식별 및 서비스 제공
• 개인화된 레시피 저장 및 관리
• 서비스 개선 및 신규 기능 개발
• 고객 문의 대응

3. 개인정보의 보유 기간
• 회원 탈퇴 시까지 보유
• 탈퇴 후 즉시 파기 (단, 법령에 따른 보존 의무가 있는 경우 해당 기간 동안 보존)

4. 개인정보의 제3자 제공
서비스는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
다만, 다음의 경우에는 예외로 합니다:
• 법령에 따른 요청이 있는 경우
• 이용자가 사전에 동의한 경우

5. 개인정보의 파기
• 보유 기간 경과 시 지체 없이 파기
• 전자적 파일: 복구 불가능한 방법으로 영구 삭제
• 종이 문서: 분쇄기로 파기

6. 이용자의 권리
이용자는 언제든지 다음 권리를 행사할 수 있습니다:
• 개인정보 열람 요청
• 개인정보 정정 요청
• 개인정보 삭제 요청
• 처리 정지 요청

7. 쿠키의 사용
서비스는 이용자 경험 개선을 위해 쿠키를 사용할 수 있습니다.
이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.

8. 개인정보 보호책임자
• 담당자: 개인정보 보호팀
• 이메일: privacy@ddukddak.app

9. 개인정보처리방침의 변경
본 방침은 법령 또는 서비스 정책에 따라 변경될 수 있으며, 변경 시 앱 내 공지합니다.

시행일: 2025년 1월 1일
`.trim()

export default function PrivacyScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm leading-6 text-gray-700">
          {PRIVACY_CONTENT}
        </Text>
      </ScrollView>
    </View>
  )
}
