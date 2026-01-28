# ReactNativeTemplate

## 최초 설정

### 1. 프로젝트 초기화

- ```app.example.env``` 파일을 복사하여 ```app.env``` 파일 생성합니다.
- ```app.env``` 파일의 정보를 사용 할 프로젝트의 정보로 수정합니다.
- 프로젝트 초기화 실행
  ```shell
  node @script/init-project.js
  node @script/apply-app-info.js
  ```
- ```@script/init-project.js``` 는 반드시 **한번만** 실행해야합니다.
- 프로젝트 초기화 후 ```app.env``` 파일의 ```PROJECT_NAME```, ```DISPLAY_NAME```, ```IOS_BUNDLE_ID```, ```ANDROID_PACKAGE_NAME``` 정보는 절대로 수정하면 안되며, 나머지 정보는 수정 후 ```@script/apply-app-info.js``` 를 실행하여 적용가능합니다.

### 2. Firebase 설정

[Firebase 콘솔](https://console.firebase.google.com/)에 접속

- (Android) 아래 명령을 실행하여 debug.keystore 의 SHA-1 값을 Firebase 콘솔에 등록합니다.
  ```shell
  keytool -J"-Duser.language=en" -list -v -alias androiddebugkey -keystore ./android/app/debug.keystore
  ```

- ```google-services.json``` 파일을 ```android/app``` 디렉토리에 추가합니다.
- ```GoogleService-Info.plist``` 파일을 ```ios/ReactNativeTemplate``` 디렉토리에 추가합니다.

### 3. 앱 아이콘

- Mac App Store 에서 'Asset Catalog Creator' 앱 다운로드하여 iOS 앱 아이콘 생성

- https://romannurik.github.io/AndroidAssetStudio/index.html 사이트에서 Android 앱 아이콘 및 Notification 아이콘 생성

### 4. Splash 화면 설정

```package.json``` 파일의 ```scripts``` 의 ```generate:bootsplash``` 항목의 값을 원하는 정보로 수정 후 실행합니다.

```shell
npm run generate:bootsplash
```

## 환경설정 파일

- ```.env.example``` 파일을 복사하여 ```.env.development``` 파일을 생성하고 정보를 수정합니다.

- 배포용 환경 설정 파일 : ```.env.staging```, ```.env.production```
-
## WebStorm Run/Debug Configuration
- iOS 설정 시 `Arguments` 에 다음 값을 추가합니다.
  ```
  --scheme ReactNativeTemplateDev
  ```
  
- iOS 설정 시 `Environment variables` 에 다음 값을 추가합니다.
  ```
  LANG=en_US.UTF-8
  ```

- Android 설정 시 `Arguments` 에 다음 값을 추가합니다.
  ```
  --mode debug
  ```

- Before launch 의 ```Start React Native Bundler``` 더블 클릭하여, ```Command``` 값을 ```npm script``` 로 바꾸고, ```Script``` 를 ```start``` 로 설정합니다.

## Expo Update 사용 시
