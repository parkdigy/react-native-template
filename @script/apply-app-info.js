const ll = console.log;

const fs = require('fs');
var plist = require('plist');
const path = require('path');
const {parseEnv, replaceText, replaceTextExt, checkFileExists, checkDirExists, deleteDir} = require('./util');

const rootPath = __dirname.endsWith('@script') ? path.join(__dirname, '..') : __dirname;

const envPath = path.join(rootPath, 'app.env');
if (!fs.existsSync(envPath)) {
  throw new Error('app.env 파일을 찾을 수 없습니다.');
}

const env = parseEnv(envPath);

if (!env.APP_CENTER_USERNAME) throw new Error('APP_CENTER_USERNAME 환경변수 값이 없습니다.');
if (!env.APP_CENTER_APP_NAME_IOS) throw new Error('APP_CENTER_APP_NAME_IOS 환경변수 값이 없습니다.');
if (!env.APP_CENTER_APP_SECRET_IOS) throw new Error('APP_CENTER_APP_SECRET_IOS 환경변수 값이 없습니다.');
if (!env.CODE_PUSH_DEPLOYMENT_KEY_IOS_STAGING) throw new Error('CODE_PUSH_DEPLOYMENT_KEY_IOS_STAGING 환경변수 값이 없습니다.');
if (!env.CODE_PUSH_DEPLOYMENT_KEY_IOS_PRODUCTION) throw new Error('CODE_PUSH_DEPLOYMENT_KEY_IOS_PRODUCTION 환경변수 값이 없습니다.');
if (!env.APP_CENTER_APP_NAME_ANDROID) throw new Error('APP_CENTER_APP_NAME_ANDROID 환경변수 값이 없습니다.');
if (!env.APP_CENTER_APP_SECRET_ANDROID) throw new Error('APP_CENTER_APP_SECRET_ANDROID 환경변수 값이 없습니다.');
if (!env.CODE_PUSH_DEPLOYMENT_KEY_ANDROID_STAGING) throw new Error('CODE_PUSH_DEPLOYMENT_KEY_ANDROID_STAGING 환경변수 값이 없습니다.');
if (!env.CODE_PUSH_DEPLOYMENT_KEY_ANDROID_PRODUCTION) throw new Error('CODE_PUSH_DEPLOYMENT_KEY_ANDROID_PRODUCTION 환경변수 값이 없습니다.');

// 현재 프로젝트명 가져오기
const currentProjectName = JSON.parse(fs.readFileSync(path.join(rootPath, 'app.json'))).name;
if (!currentProjectName) {
  throw new Error('현재 프로젝트명을 찾을 수 없습니다.');
}

/********************************************************************************************************************
 * package.json 파일 변경
 * ******************************************************************************************************************/
const packageJsonPath = path.join(rootPath, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  ll('(IOS) package.json 파일 변경');

  const fileContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  Object.keys(fileContent.scripts).forEach(key => {
    if (key === 'codepush:android:staging' || key === 'codepush:android:production') {
      fileContent.scripts[key] = replaceTextExt(fileContent.scripts[key], 'appcenter codepush release-react -a ', '', ' -d', `${env.APP_CENTER_USERNAME}/${env.APP_CENTER_APP_NAME_ANDROID}`);
    } else if (key === 'codepush:ios:staging' || key === 'codepush:ios:production') {
      fileContent.scripts[key] = replaceTextExt(fileContent.scripts[key], 'appcenter codepush release-react -a ', '', ' -d', `${env.APP_CENTER_USERNAME}/${env.APP_CENTER_APP_NAME_IOS}`);
    }
  });
  fs.writeFileSync(packageJsonPath, JSON.stringify(fileContent, null, 2));
}

/********************************************************************************************************************
 * (IOS) AppCenter-Config.plist 파일 생성
 * ************************************ ******************************************************************************/
if (env.APP_CENTER_APP_SECRET_IOS) {
  const appCenterConfigPlistPath = path.join(rootPath, 'ios', currentProjectName, 'AppCenter-Config.plist');
  if (fs.existsSync(appCenterConfigPlistPath)) {
    ll('(IOS) AppCenter-Config.plist 파일 수정');
    fs.unlinkSync(appCenterConfigPlistPath);
  } else {
    ll('(IOS) AppCenter-Config.plist 파일 생성');
  }
  fs.writeFileSync(appCenterConfigPlistPath, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>AppSecret</key>
  <string>${env.APP_CENTER_APP_SECRET_IOS}</string>
</dict>
</plist>
`);
}

/********************************************************************************************************************
 * (IOS) Info.plist 파일 변경
 * ******************************************************************************************************************/
const infoPlistPath = path.join(rootPath, 'ios', currentProjectName, 'Info.plist');
if (fs.existsSync(infoPlistPath)) {
  ll('(IOS) Info.plist 파일 변경');

  const plistInfo = plist.parse(fs.readFileSync(infoPlistPath, 'utf8'));

  if (env.DISPLAY_NAME) {
    plistInfo.CFBundleDisplayName = env.DISPLAY_NAME;
  }

  if (!plistInfo.CFBundleURLTypes) {
    plistInfo.CFBundleURLTypes = [];
    if (env.FIREBASE_ENC_APP_ID_IOS) {
      plistInfo.CFBundleURLTypes.push({
        CFBundleTypeRole: 'Editor',
        CFBundleURLName: 'firebase',
        CFBundleURLSchemes: [env.FIREBASE_ENC_APP_ID_IOS]
      });
    }
    if (env.KAKAO_APP_KEY) {
      plistInfo.CFBundleURLTypes.push({
        CFBundleTypeRole: 'Editor',
        CFBundleURLName: 'kakao',
        CFBundleURLSchemes: [`kakao${env.KAKAO_APP_KEY}`]
      });
    }
    if (env.NAVER_LOGIN_URL_SCHEME_IOS) {
      plistInfo.CFBundleURLTypes.push({
        CFBundleTypeRole: 'Editor',
        CFBundleURLName: 'naver',
        CFBundleURLSchemes: [env.NAVER_LOGIN_URL_SCHEME_IOS]
      });
    }
    if (env.URL_SCHEME_IOS) {
      plistInfo.CFBundleURLTypes.push({
        CFBundleTypeRole: 'Editor',
        CFBundleURLName: 'app',
        CFBundleURLSchemes: [env.URL_SCHEME_IOS]
      });
    }
  } else {
    plistInfo.CFBundleURLTypes.forEach(info => {
      if (env.FIREBASE_ENC_APP_ID_IOS) {
        if (info.CFBundleURLName === 'firebase') {
          info.CFBundleURLSchemes = [env.FIREBASE_ENC_APP_ID_IOS];
        }
      }
      if (env.KAKAO_APP_KEY) {
        if (info.CFBundleURLName === 'kakao') {
          info.CFBundleURLSchemes = [`kakao${env.KAKAO_APP_KEY}`];
        }
      }
      if (env.NAVER_LOGIN_URL_SCHEME_IOS) {
        if (info.CFBundleURLName === 'naver') {
          info.CFBundleURLSchemes = [env.NAVER_LOGIN_URL_SCHEME_IOS];
        }
      }
      if (env.URL_SCHEME_IOS) {
        if (info.CFBundleURLName === 'app') {
          info.CFBundleURLSchemes = [env.URL_SCHEME_IOS];
        }
      }
    })
  }

  if (env.USER_TRACKING_USAGE_DESCRIPTION) {
    plistInfo.NSUserTrackingUsageDescription = env.USER_TRACKING_USAGE_DESCRIPTION;
  }
  if (env.PHOTO_LIBRARY_USAGE_DESCRIPTION) {
    plistInfo.NSPhotoLibraryUsageDescription = env.PHOTO_LIBRARY_USAGE_DESCRIPTION;
  }
  if (env.PHOTO_LIBRARY_ADD_USAGE_DESCRIPTION) {
    plistInfo.NSPhotoLibraryAddUsageDescription = env.PHOTO_LIBRARY_ADD_USAGE_DESCRIPTION;
  }
  if (env.LOCATION_WHEN_IN_USE_USAGE_DESCRIPTION) {
    plistInfo.NSLocationWhenInUseUsageDescription = env.LOCATION_WHEN_IN_USE_USAGE_DESCRIPTION;
  }

  if (env.KAKAO_APP_KEY) {
    plistInfo.KAKAO_APP_KEY = env.KAKAO_APP_KEY;
  }

  fs.writeFileSync(infoPlistPath, plist.build(plistInfo));
}

/********************************************************************************************************************
 * (IOS) project.pbxproj 파일 변경
 * ******************************************************************************************************************/
const projectPbxprojPath = path.join(rootPath, 'ios', `${currentProjectName}.xcodeproj`, 'project.pbxproj');
if (fs.existsSync(projectPbxprojPath)) {
  ll('(IOS) project.pbxproj 파일 변경');

  let fileContent = fs.readFileSync(projectPbxprojPath, 'utf8');

  let changed = false;
  const valueFindStr = 'CODEPUSH_KEY = "';
  let valueEnd = 0;

  do {
    let valueStart = fileContent.indexOf('CODEPUSH_KEY = "', valueEnd);
    if (valueStart === -1) break;
    valueStart += valueFindStr.length;

    valueEnd = fileContent.indexOf('"', valueStart);
    if (valueEnd === -1) break;

    const configurationEnd = fileContent.lastIndexOf('*/ = {', valueStart);
    if (configurationEnd === -1) break;

    const configurationStart = fileContent.lastIndexOf('/* ', configurationEnd);
    if (configurationStart === -1) break;

    const configurationName = fileContent.substring(configurationStart + 3, configurationEnd).trim().toUpperCase();
    if (configurationName === 'STAGING') {
      fileContent = fileContent.substring(0, valueStart) + env.CODE_PUSH_DEPLOYMENT_KEY_IOS_STAGING + fileContent.substring(valueEnd);
      changed = true;
    } else if (configurationName === 'RELEASE') {
      fileContent = fileContent.substring(0, valueStart) + env.CODE_PUSH_DEPLOYMENT_KEY_IOS_PRODUCTION + fileContent.substring(valueEnd);
      changed = true;
    }
  } while(true);

  fs.writeFileSync(projectPbxprojPath, fileContent);
}

/********************************************************************************************************************
 * (IOS) .entitlements 파일 변경
 * ******************************************************************************************************************/
const entitlementsPath = path.join(rootPath, 'ios', currentProjectName, `${currentProjectName}.entitlements`);
if (fs.existsSync(entitlementsPath)) {
  ll(`(IOS) ${currentProjectName}.entitlements 파일 변경`);

  const fileInfo = plist.parse(fs.readFileSync(entitlementsPath, 'utf8'));
  const node = [];
  if (env.WEB_CREDENTIALS_DOMAINS) {
    env.WEB_CREDENTIALS_DOMAINS.split(',').forEach(domain => {
      node.push(`webcredentials:${domain}`);
    });
  }
  if (env.APP_LINKS_DOMAINS) {
    env.APP_LINKS_DOMAINS.split(',').forEach(domain => {
      node.push(`applinks:${domain}`);
    });
  }
  fileInfo['com.apple.developer.associated-domains'] = node;
  fs.writeFileSync(entitlementsPath, plist.build(fileInfo));
}

/********************************************************************************************************************
 * (IOS) AppDelegatem.mm 파일 변경
 * ******************************************************************************************************************/
const appDelegatePath = path.join(rootPath, 'ios', currentProjectName, 'AppDelegate.mm');
if (fs.existsSync(packageJsonPath)) {
  ll('(IOS) AppDelegate.mm 파일 변경');

  let fileContent = fs.readFileSync(appDelegatePath, 'utf8');

  let end = fileContent.indexOf('[[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];');
  if (end > -1) {
    const findStr = 'if ([url.scheme isEqualToString:@"';
    let start = fileContent.lastIndexOf(findStr, end);
    if (start > -1) {
      start += findStr.length;
      end = fileContent.indexOf('"])', start);
      fileContent = fileContent.substring(0, start) + (env.NAVER_LOGIN_URL_SCHEME_IOS || 'naver-url-scheme') + fileContent.substring(end);
    }
  }

  fs.writeFileSync(appDelegatePath, fileContent);
}

/********************************************************************************************************************
 * (Android) AndroidManifest.xml 파일 변경
 * ******************************************************************************************************************/
const androidManifestPath = path.join(rootPath, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
if (fs.existsSync(androidManifestPath)) {
  ll('(Android) AndroidManifest.xml 파일 변경');

  let fileContent = fs.readFileSync(androidManifestPath, 'utf8');

  let start = fileContent.indexOf('android:name="com.kakao.sdk.auth.AuthCodeHandlerActivity"');
  if (start > -1) {
    const findStr = '<data android:host="oauth" android:scheme="';
    start = fileContent.indexOf(findStr, start);
    if (start > -1) {
      start += findStr.length;
      const end = fileContent.indexOf('"', start);
      if (end > -1) {
        fileContent = fileContent.substring(0, start) + `kakao${env.KAKAO_APP_KEY}` + fileContent.substring(end);
      }
    }
  }

  fs.writeFileSync(androidManifestPath, fileContent);
}


/********************************************************************************************************************
 * (Android) strings.xml 파일 변경
 * ******************************************************************************************************************/
const stringsXmlPath = path.join(rootPath, 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml');
if (fs.existsSync(stringsXmlPath)) {
  ll('(Android) strings.xml 파일 변경');

  let fileContent = fs.readFileSync(stringsXmlPath, 'utf8');

  if (env.KAKAO_APP_KEY) {
    const findStr = '<string name="kakao_app_key">';
    let start = fileContent.indexOf(findStr);
    if (start > -1) {
      start += findStr.length;
      const end = fileContent.indexOf('</string>', start);
      if (end > -1) {
        fileContent = fileContent.substring(0, start) + env.KAKAO_APP_KEY + fileContent.substring(end);
      }
    }
  }

  fs.writeFileSync(stringsXmlPath, fileContent);
}

/********************************************************************************************************************
 * (Android) appcenter-config.json 파일 생성/변경
 * ******************************************************************************************************************/
const appCenterConfigJsonPath = path.join(rootPath, 'android', 'app', 'src', 'main', 'assets', 'appcenter-config.json');
{
  if (fs.existsSync(appCenterConfigJsonPath)) {
    ll('(Android) appcenter-config.json 파일 수정');
    fs.unlinkSync(appCenterConfigJsonPath);
  } else {
    ll('(Android) appcenter-config.json 파일 생성');
  }
  fs.writeFileSync(appCenterConfigJsonPath, `{
  "app_secret": "${env.APP_CENTER_APP_SECRET_ANDROID}"
}`);
}

/********************************************************************************************************************
 * (Android) gradle.properties 파일 변경
 * ******************************************************************************************************************/
const gradlePropertiesPath = path.join(rootPath, 'android', 'gradle.properties');
if (fs.existsSync(gradlePropertiesPath)) {
  ll('(Android) gradle.properties 파일 변경');

  let fileContent = fs.readFileSync(gradlePropertiesPath, 'utf8');

  fileContent = replaceTextExt(fileContent, 'CODEPUSH_DEPLOYMENT_KEY_DEBUG=', '', '\n', '');
  fileContent = replaceTextExt(fileContent, 'CODEPUSH_DEPLOYMENT_KEY_STAGING=', '', '\n', env.CODE_PUSH_DEPLOYMENT_KEY_ANDROID_STAGING || '');
  fileContent = replaceTextExt(fileContent, 'CODEPUSH_DEPLOYMENT_KEY_PRODUCTION=', '', '\n', env.CODE_PUSH_DEPLOYMENT_KEY_ANDROID_PRODUCTION || '');

  fs.writeFileSync(gradlePropertiesPath, fileContent);
}
