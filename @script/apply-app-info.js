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

// 현재 프로젝트명 가져오기
const currentProjectName = JSON.parse(fs.readFileSync(path.join(rootPath, 'app.json'))).name;
if (!currentProjectName) {
  throw new Error('현재 프로젝트명을 찾을 수 없습니다.');
}

// 파일 내용 Ext 변경 함수
const replaceExtContent = (filePath, startText, findText, endText, replaceText) => {
  ll(`${filePath} 파일 내용 변경`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const newFileContent = replaceTextExt(fileContent, startText, findText, endText, replaceText);
  fs.writeFileSync(filePath, newFileContent);
};

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
        CFBundleURLSchemes: [env.FIREBASE_ENC_APP_ID_IOS],
      });
    }
    if (env.KAKAO_APP_KEY) {
      plistInfo.CFBundleURLTypes.push({
        CFBundleTypeRole: 'Editor',
        CFBundleURLName: 'kakao',
        CFBundleURLSchemes: [`kakao${env.KAKAO_APP_KEY}`],
      });
    }
    if (env.NAVER_LOGIN_URL_SCHEME_IOS) {
      plistInfo.CFBundleURLTypes.push({
        CFBundleTypeRole: 'Editor',
        CFBundleURLName: 'naver',
        CFBundleURLSchemes: [env.NAVER_LOGIN_URL_SCHEME_IOS],
      });
    }
    if (env.URL_SCHEME_IOS) {
      plistInfo.CFBundleURLTypes.push({
        CFBundleTypeRole: 'Editor',
        CFBundleURLName: 'app',
        CFBundleURLSchemes: [env.URL_SCHEME_IOS],
      });
    }
  } else {
    plistInfo.CFBundleURLTypes.forEach((info) => {
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
    });
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

  replaceExtContent(projectPbxprojPath, 'INFOPLIST_KEY_CFBundleDisplayName = "', '', '";', env.DISPLAY_NAME);
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
    env.WEB_CREDENTIALS_DOMAINS.split(',').forEach((domain) => {
      node.push(`webcredentials:${domain}`);
    });
  }
  if (env.APP_LINKS_DOMAINS) {
    env.APP_LINKS_DOMAINS.split(',').forEach((domain) => {
      node.push(`applinks:${domain}`);
    });
  }
  fileInfo['com.apple.developer.associated-domains'] = node;
  fs.writeFileSync(entitlementsPath, plist.build(fileInfo));
}

/********************************************************************************************************************
 * (IOS) AppDelegatem.swift 파일 변경
 * ******************************************************************************************************************/
const appDelegatePath = path.join(rootPath, 'ios', currentProjectName, 'AppDelegate.swift');
if (fs.existsSync(appDelegatePath)) {
  ll('(IOS) AppDelegate.swift 파일 변경');

  let fileContent = fs.readFileSync(appDelegatePath, 'utf8');

  let end = fileContent.indexOf(
    '[[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];',
  );
  if (end > -1) {
    const findStr = 'if ([url.scheme isEqualToString:@"';
    let start = fileContent.lastIndexOf(findStr, end);
    if (start > -1) {
      start += findStr.length;
      end = fileContent.indexOf('"])', start);
      fileContent =
        fileContent.substring(0, start) +
        (env.NAVER_LOGIN_URL_SCHEME_IOS || 'naver-url-scheme') +
        fileContent.substring(end);
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
    const findStr = '"kakao%kakao_app_key%';
    start = fileContent.indexOf(findStr, start);
    if (start > -1) {
      start += 1;
      const end = fileContent.indexOf('"', start + 1);
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

  if (env.DISPLAY_NAME) {
    const findStr = '<string name="app_name">';
    let start = fileContent.indexOf(findStr);
    if (start > -1) {
      start += findStr.length;
      const end = fileContent.indexOf('</string>', start);
      if (end > -1) {
        fileContent = fileContent.substring(0, start) + env.DISPLAY_NAME + fileContent.substring(end);
      }
    }
  }

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
 * (Android) gradle.properties 파일 변경
 * ******************************************************************************************************************/
const gradlePropertiesPath = path.join(rootPath, 'android', 'gradle.properties');
if (fs.existsSync(gradlePropertiesPath)) {
  ll('(Android) gradle.properties 파일 변경');

  let fileContent = fs.readFileSync(gradlePropertiesPath, 'utf8');

  fs.writeFileSync(gradlePropertiesPath, fileContent);
}
