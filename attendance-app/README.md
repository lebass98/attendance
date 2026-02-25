# 📋 Attendance App (출석체크 앱)

현대적인 **Next.js 15**, **TypeScript**, **SCSS** 기반의 출석 관리 웹 애플리케이션입니다. 깔끔하고 직관적인 사용자 인터페이스를 통해 일일 출석을 효율적으로 관리할 수 있습니다.

---

## ✨ 주요 기능 (Features)

- **🔐 사용자 인증**: 이메일 및 비밀번호를 이용한 보안 로그인.
- **🔢 OTP 인증 UI**: 4자리 인증번호 입력 및 타이머 기능 지원.
- **👁️ 보안 및 편의성**:
    - **비밀번호 표시 토글**: 비밀번호를 눈 아이콘으로 간편하게 확인/숨김 가능.
    - **입력값 일괄 삭제 (Clear Button)**: 'X' 버튼으로 입력 내용을 한 번에 지우기 가능.
- **📊 대시보드 (Dashboard)**:
    - 실시간 오늘 출석 상태 확인.
    - 이번 주 누적 출석 통계 (예: 5/5일 출석).
    - 최근 출석 기록 리스트 및 상세 시간 확인.
- **🔍 사용자 맞춤 설정**:
    - **글자 크기 조절 (Font Scale)**: 가독성을 위해 두 단계의 텍스트 크기 변환 지원.
- **📱 네비게이션**:
    - **하단 탭 바 (Bottom Navigation)**: 홈, 검색, 좋아요, 알림, 프로필 섹션으로의 간편한 이동.
- **🎨 모던 디자인**: 스타일리시한 애니메이션과 반응형 레이아웃 제공.

---

## 🛠 기술 스택 (Tech Stack)

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)
- **Styling**: [Sass (SCSS)](https://sass-lang.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Architecture**: Component-based modular design

---

## 🚀 시작하기 (Getting Started)

로컬 환경에서 프로젝트를 실행하려면 아래 단계를 따르세요.

### 📋 요구 사항
- Node.js (v18.17.0 이상 권장)
- npm, yarn, or pnpm

### ⚙️ 설치 및 실행

1.  **Repository 클론**:
    ```bash
    git clone https://github.com/lebass98/attendance.git
    cd attendance-app
    ```

2.  **의존성 설치**:
    ```bash
    npm install
    ```

3.  **개발 서버 실행**:
    ```bash
    npm run dev
    ```

4.  **브라우저 확인**:
    브라우저를 열고 `http://localhost:3000` (이미 사용 중인 경우 3001 등)으로 접속하세요.

---

## 📁 프로젝트 구조 (Project Structure)

```text
src/
├── app/              # Next.js App Router (Page, Layout, Globals)
│   ├── main/         # 메인 대시보드 페이지 (/main)
│   ├── layout.tsx    # 전체 레이아웃 구정
│   └── page.tsx      # 로그인 페이지 (루트 /)
├── components/       # 재사용 가능한 컴포넌트 (.tsx 타입 적용)
│   └── BottomNav.tsx # 하단 네비게이션 바
├── assets/           # 이미지 및 이미지 에셋
├── scss/             # 전역 및 페이지별 SCSS 스타일 파일
└── types/            # (추가 예정) 공통 타입 정의
```

---

## ✅ 업데이트 내역 (Recent Updates)

- **Vite to Next.js Migration**: 
    - 프로젝트 기반을 Vite에서 Next.js 15 App Router로 마이그레이션했습니다.
    - 기존 React state 기반 라우팅에서 Next.js File-based 라우팅으로 전환했습니다.
- **TypeScript Integration**: 
    - 모든 `.jsx` 파일을 `.tsx`로 변환하여 정적 타입 체크를 도입했습니다.
    - 컴포넌트 Props 및 이벤트 핸들러에 Type 정의를 추가했습니다.
- **SCSS Optimization**: 
    - Next.js 환경에 맞게 SCSS 모듈 설정을 최적화했습니다.
- **UX 개선**: 
    - 로그인 폼의 유효성 검사 및 라우팅 로직을 Next.js `useRouter`로 개선했습니다.
