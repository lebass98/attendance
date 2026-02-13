# Attendance Check App

React와 Vite를 사용해 현대적으로 리뉴얼된 출석체크 서비스입니다.
심플하고 모던한 UI를 제공하며, 데스크탑과 모바일 환경 모두에 최적화된 반응형 웹 앱입니다.

## ✨ Features (주요 기능)

- **로그인 (Login)**
  - 이메일 및 비밀번호 입력 폼
  - **이메일 유효성 검사**: 잘못된 이메일 형식 입력 시 즉시 피드백 제공
  - **비밀번호 보기/숨기기**: 토글 아이콘으로 비밀번호 확인 가능
  - 소셜 로그인 UI (Facebook, Google, Apple)
  - 글자 크기 조절 ('가' 버튼)

- **메인 (Main)**
  - 사용자 맞춤형 인사말 및 날짜 표시
  - **출석 현황 카드**: 출근/퇴근 시간 및 주간 출석 상태 시각화
  - 퇴근하기 버튼
  - 하단 네비게이션 바 (Home, Search, Likes, Notifications, Profile)
  - 글자 크기 조절 기능 유지

## 🛠 Tech Stack (기술 스택)

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: SCSS (Sass)
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

## 🚀 How to Run (실행 방법)

### React Application (Current)

1. `attendance-app` 폴더로 이동합니다.
   ```bash
   cd attendance-app
   ```
2. 의존성을 설치합니다.
   ```bash
   npm install
   ```
3. 개발 서버를 실행합니다.
   ```bash
   npm run dev
   ```
4. 브라우저에서 `http://localhost:5173`을 열어 확인합니다.

### Legacy (Static HTML)

기존의 정적 HTML/CSS 버전은 `_legacy` 폴더에 아카이빙되어 있습니다.
- `_legacy/login.html`
- `_legacy/main.html`

## 📂 Project Structure (폴더 구조)

```
📦 attendance
 ┣ 📂 attendance-app        # React + Vite 프로젝트 (메인)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages             # Login.jsx, Main.jsx
 ┃ ┃ ┣ 📂 scss              # SCSS 스타일 파일
 ┃ ┃ ┗ 📂 assets            # 이미지 및 정적 리소스
 ┃ ┗ 📜 package.json
 ┣ 📂 _legacy               # 이전 버전 (Static HTML/CSS)
 ┃ ┣ 📜 login.html
 ┃ ┣ 📜 main.html
 ┃ ┗ ...
 ┣ 📜 pencil-new.pen        # Pencil 디자인 파일
 ┗ 📜 avatar.png            # 캐릭터 아바타 이미지
```

## 📝 License

This project is licensed under the MIT License.
