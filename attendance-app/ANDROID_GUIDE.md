# Android APK Build Guide (Android APK 빌드 가이드)

프로젝트에 Android 지원이 추가되었습니다. 아래 단계에 따라 Android Studio를 사용하여 APK 파일을 생성하세요.

## Prerequisites (준비 사항)

- **Android Studio**가 설치되어 있어야 합니다.
  - [Download Android Studio](https://developer.android.com/studio)

## Steps (빌드 단계)

1. **프로젝트 열기**
   - Android Studio를 실행합니다.
   - `Open`을 클릭하고 `attendance-app/android` 폴더를 선택하여 엽니다.

2. **Gradle 동기화**
   - 프로젝트가 열리면 자동으로 Gradle 동기화가 시작됩니다. 완료될 때까지 잠시 기다립니다.
   - 처음 여는 경우 필요한 SDK 컴포넌트들을 다운로드할 수 있습니다.

3. **APK 빌드**
   - 상단 메뉴에서 `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`를 선택합니다.
   - 빌드가 완료되면 오른쪽 하단에 알림이 나타납니다. `locate`를 클릭하면 생성된 APK 파일(`app-debug.apk`)의 위치가 열립니다.

4. **앱 실행**
   - 생성된 APK 파일을 안드로이드 기기로 복사하여 설치하거나, Android Studio의 에뮬레이터를 통해 앱을 직접 실행(`Run 'app'`)해 볼 수 있습니다.

## Troubleshooting (문제 해결)

- **Gradle 에러**: Gradle 버전 문제나 네트워크 문제로 동기화에 실패할 경우, Android Studio의 제안(Upgrade Gradle 등)을 따르거나 `Build` > `Clean Project` 후 다시 시도해보세요.
- **Java 에러**: `JAVA_HOME` 환경변수가 설정되어 있는지 확인하세요. Android Studio 설정 내의 Gradle JDK를 사용하도록 설정하는 것이 가장 간편합니다.
