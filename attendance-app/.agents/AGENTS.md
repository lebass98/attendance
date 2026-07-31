# AGENTS.md

## 작업 완료 및 Git 동기화 규칙

1. **사전 빌드 검증 (Build Verification)**:
   - 작업 완료(Completion)를 선언하기 전에 반드시 프로젝트 빌드 검증(`npx tsc --noEmit` 또는 `npm run build`)을 실행하여 오류가 없는지 확인합니다.

2. **한글 커밋 메시지 자동 작성 및 Git 커밋/푸시/풀**:
   - 작업이 정상적으로 완료되면, 변경된 내용을 직관적인 **한글 커밋 메시지**로 번역/정리합니다.
   - `git pull` -> `git add .` -> `git commit -m "한글 커밋 메시지"` -> `git push` 명령을 순차적으로 자동 수행하여 원격 저장소와 동기화합니다.
