# Attendance Check Login (출석체크 로그인)

심플하고 모던한 디자인의 출석체크 서비스 로그인 페이지입니다.

## ✨ Features (주요 기능)

- **로그인 폼**: 이메일 및 비밀번호 입력
- **비밀번호 보기/숨기기**: 눈 아이콘을 클릭하여 비밀번호 표시 여부 전환
- **폰트 크기 조절**: 상단 '가' 버튼을 통해 전체 글자 크기 조절 (접근성 강화)
- **소셜 로그인**: Facebook, Google, Apple 계정 연동 버튼 (UI)
- **하단 네비게이션**: 홈, 검색, 좋아요, 알림, 프로필 탭바 구성
- **반응형 디자인**: 다양한 디바이스에 대응하는 유연한 레이아웃

## 🛠 Tech Stack (기술 스택)

- **HTML5**: 시맨틱 마크업 구조
- **SCSS / CSS3**: 변수 활용 및 모던 스타일링
- **JavaScript (Vanilla)**: 동적 인터랙션 (폰트 크기, 비밀번호 토글)
- **Lucide Icons**: 깔끔하고 통일감 있는 벡터 아이콘 사용

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
4. 브라우저에서 `http://localhost:5173`을 엽니다.

### Legacy (Static HTML)

기존의 정적 HTML/CSS 버전은 `_legacy` 폴더에 보관되어 있습니다. 해당 폴더 내의 `login.html` 또는 `main.html`을 직접 브라우저에서 열어 확인할 수 있습니다.

## 📂 Project Structure (폴더 구조)

```
📦 attendance
 ┣ 📂 attendance-app    # React + Vite 프로젝트 (메인)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 scss
 ┃ ┃ ┗ 📂 assets
 ┃ ┗ 📜 package.json
 ┣ 📂 _legacy           # 이전 버전 (Static HTML/CSS)
 ┃ ┣ 📜 login.html
 ┃ ┣ 📜 main.html
 ┃ ┗ ...
 ┣ 📜 pencil-new.pen    # Pencil 디자인 파일
 ┗ 📜 avatar.png        # 캐릭터 아바타 이미지
```

## 📝 License

This project is licensed under the MIT License.
