const ll = console.log;

const fs = require('fs');
const path = require('path');
const { parseEnv, replaceText, replaceTextExt, checkFileExists, checkDirExists, deleteDir } = require('./util');

const rootPath = __dirname.endsWith('@script') ? path.join(__dirname, '..') : __dirname;

const envPath = path.join(rootPath, 'app.env');
if (!fs.existsSync(envPath)) {
  throw new Error('app.env 파일을 찾을 수 없습니다.');
}

const env = parseEnv(envPath);

if (!env.PROJECT_NAME) throw new Error('PROJECT_NAME 환경변수를 찾을 수 없습니다.');
if (!env.DISPLAY_NAME) throw new Error('DISPLAY_NAME 환경변수를 찾을 수 없습니다.');
if (!env.IOS_BUNDLE_ID) throw new Error('IOS_BUNDLE_ID 환경변수를 찾을 수 없습니다.');
if (!env.ANDROID_PACKAGE_NAME) throw new Error('ANDROID_PACKAGE_NAME 환경변수를 찾을 수 없습니다.');

// 현재 프로젝트명 가져오기
const currentProjectName = JSON.parse(fs.readFileSync(path.join(rootPath, 'app.json'))).name;
if (!currentProjectName) {
  throw new Error('현재 프로젝트명을 찾을 수 없습니다.');
}
if (currentProjectName === env.PROJECT_NAME) {
  throw new Error('변경할 프로젝트명이 현재와 동일합니다.')
}

/********************************************************************************************************************
 * 공통 함수
 * ******************************************************************************************************************/

// 파일 내용 Ext 변경 함수
const replaceExtContent = (filePath, startText, findText, endText, replaceText) => {
    ll(`${filePath} 파일 내용 변경`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const newFileContent = replaceTextExt(fileContent, startText, findText, endText, replaceText);
    fs.writeFileSync(filePath, newFileContent);
  }

// 파일 내용 변경 함수
const replaceContent = (filePath, findText, _replaceText) => {
  ll(`${filePath} 파일 내용 변경`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const newFileContent = replaceText(fileContent, findText, _replaceText);
  fs.writeFileSync(filePath, newFileContent);
}

/********************************************************************************************************************
 * 공통 변경
 * ******************************************************************************************************************/
{
  // 내용 변경할 파일
  const packageJsonPath = path.join(rootPath, 'package.json');
  const readmePath = path.join(rootPath, 'README.md');
  const appJsonPath = path.join(rootPath, 'app.json');
  const packageLockJsonPath = path.join(rootPath, 'package-lock.json');

  checkFileExists([packageJsonPath, readmePath, appJsonPath]);

  // 파일 내용 변경
  [packageJsonPath, readmePath].forEach((file) => {
    replaceContent(file, currentProjectName, env.PROJECT_NAME);
  })

  // app.json 변경
  ll('app.json 파일 내용 변경');
  replaceExtContent(appJsonPath, `"name": "`, '', '"', env.PROJECT_NAME);
  replaceExtContent(appJsonPath, `"displayName": "`, '', '"', env.DISPLAY_NAME);

  if (fs.existsSync(packageLockJsonPath)) {
    ll('package-lock.json 파일 삭제');
    fs.unlinkSync(packageLockJsonPath);
  }
}

/********************************************************************************************************************
 * ios 변경
 * ******************************************************************************************************************/
{
  const basePath = path.join(rootPath, 'ios');

  // 디렉토리
  const oldProjectDir = path.join(basePath, currentProjectName);
  const oldXcodeProjectDir = path.join(basePath, `${currentProjectName}.xcodeproj`);
  const oldXcodeWorkspaceDir = path.join(basePath, `${currentProjectName}.xcworkspace`);

  const newProjectDir = path.join(basePath, env.PROJECT_NAME);
  const newXcodeProjectDir = path.join(basePath, `${env.PROJECT_NAME}.xcodeproj`);
  const newXcodeWorkspaceDir = path.join(basePath, `${env.PROJECT_NAME}.xcworkspace`);

  // 내용 변경할 파일
  const podfilePath = path.join(basePath, 'Podfile');
  const appDelegatePath = path.join(oldProjectDir, 'AppDelegate.mm');
  const xcodeProjectPbxprojPath = path.join(oldXcodeProjectDir, 'project.pbxproj');
  const xcodeWorkspaceContentsPath = path.join(oldXcodeWorkspaceDir, 'contents.xcworkspacedata');

  // 내용 변경하고 이름 변경할 파일
  const oldDevSchemePath = path.join(oldXcodeProjectDir, 'xcshareddata', 'xcschemes', `${currentProjectName}Dev.xcscheme`);
  const oldStagingSchemePath = path.join(oldXcodeProjectDir, 'xcshareddata', 'xcschemes', `${currentProjectName}Staging.xcscheme`);
  const oldProdSchemePath = path.join(oldXcodeProjectDir, 'xcshareddata', 'xcschemes', `${currentProjectName}Prod.xcscheme`);

  const newDevSchemePath = path.join(oldXcodeProjectDir, 'xcshareddata', 'xcschemes', `${env.PROJECT_NAME}Dev.xcscheme`);
  const newStagingSchemePath = path.join(oldXcodeProjectDir, 'xcshareddata', 'xcschemes', `${env.PROJECT_NAME}Staging.xcscheme`);
  const newProdSchemePath = path.join(oldXcodeProjectDir, 'xcshareddata', 'xcschemes', `${env.PROJECT_NAME}Prod.xcscheme`);

  // 이름 변경할 파일
  const oldEntitlementsPath = path.join(oldProjectDir, `${currentProjectName}.entitlements`);
  const newEntitlementsPath = path.join(oldProjectDir, `${env.PROJECT_NAME}.entitlements`);

  // 디렉토리 있는지 여부 검사
  checkDirExists([oldProjectDir, oldXcodeProjectDir, oldXcodeWorkspaceDir]);

  // 파일 있는지 여부 검사
  checkFileExists([podfilePath, appDelegatePath, xcodeProjectPbxprojPath, xcodeWorkspaceContentsPath, oldDevSchemePath, oldStagingSchemePath, oldProdSchemePath]);

  // Podfile 변경
  replaceExtContent(podfilePath, `target '`, currentProjectName, `' do`, env.PROJECT_NAME);

  // AppDelegate.mm 변경
  replaceContent(appDelegatePath, currentProjectName, env.PROJECT_NAME);

  // project.pbxproj 변경
  replaceContent(xcodeProjectPbxprojPath, currentProjectName, env.PROJECT_NAME);
  replaceExtContent(xcodeProjectPbxprojPath, "PRODUCT_BUNDLE_IDENTIFIER = ", '', ';', env.IOS_BUNDLE_ID);

  // contents.xcworkspacedata 변경
  replaceContent(xcodeWorkspaceContentsPath, currentProjectName, env.PROJECT_NAME);

  // Project.xcodeproj/xcshareddata/xcschemes/ProjectDev.xcscheme 변경
  replaceContent(oldDevSchemePath, currentProjectName, env.PROJECT_NAME);

  // Project.xcodeproj/xcshareddata/xcschemes/ProjectStaging.xcscheme 변경
  replaceContent(oldStagingSchemePath, currentProjectName, env.PROJECT_NAME);

  // Project.xcodeproj/xcshareddata/xcschemes/ProjectProd.xcscheme 변경
  replaceContent(oldProdSchemePath, currentProjectName, env.PROJECT_NAME);

  // Project/Project.entitlements 파일명 변경
  ll('Project/Project.entitlements 파일명 변경');
  fs.renameSync(oldEntitlementsPath, newEntitlementsPath);

  // Project.xcodeproj/xcshareddata/xcschemes 폴더의 파일명 변경
  ll('Project.xcodeproj/xcshareddata/xcschemes 폴더의 파일명 변경');
  fs.renameSync(oldDevSchemePath, newDevSchemePath);
  fs.renameSync(oldStagingSchemePath, newStagingSchemePath);
  fs.renameSync(oldProdSchemePath, newProdSchemePath);

  // xcuserdata 디렉토리 삭제
  ll('xcuserdata 디렉토리 삭제');
  deleteDir(path.join(oldXcodeProjectDir, 'xcuserdata'));
  deleteDir(path.join(oldXcodeWorkspaceDir, 'xcuserdata'));

  // Project 디렉토리명 변경
  ll(`디렉토리 변경 : ${currentProjectName} -> ${env.PROJECT_NAME}`);
  fs.renameSync(oldProjectDir, newProjectDir);

  // Project.xcodeproj 디렉토리명 변경
  ll(`디렉토리 변경 : ${currentProjectName}.xcodeproj -> ${env.PROJECT_NAME}.xcodeproj`);
  fs.renameSync(oldXcodeProjectDir, newXcodeProjectDir);

  // Project.xcworkspace 디렉토리명 변경
  ll(`디렉토리 변경 : ${currentProjectName}.xcworkspace -> ${env.PROJECT_NAME}.xcworkspace`);
  fs.renameSync(oldXcodeWorkspaceDir, newXcodeWorkspaceDir);

  // Pods 디렉토리 삭제
  if (fs.existsSync(path.join(basePath, 'Pods'))) {
    ll('Pods 디렉토리 삭제');
    deleteDir(path.join(basePath, 'Pods'));
  }

  // Podfile.lock 파일 삭제
  if (fs.existsSync(path.join(basePath, 'Podfile.lock'))) {
    ll('Podfile.lock 파일 삭제');
    fs.unlinkSync(path.join(basePath, 'Podfile.lock'));
  }
}

/********************************************************************************************************************
 * android 변경
 * ******************************************************************************************************************/
{
  const basePath = path.join(rootPath, 'android');

  // 현재 bundleId 정보 가져오기
  const currentAndroidBundleId = fs.readFileSync(path.join(basePath, 'app', 'build.gradle'), 'utf8').match(/namespace "(.+?)"/)[1];
  const currentAndroidBundleIds = currentAndroidBundleId.split('.');
  const androidPackageNames = env.ANDROID_PACKAGE_NAME.split('.');

  // java 소스 경로
  const javaSourceRootDir = path.join(basePath, 'app', 'src', 'main', 'java');
  const javaSourceTempDir = path.join(javaSourceRootDir, '__temp__');
  const javaSourceDir = path.join(javaSourceRootDir, ...currentAndroidBundleIds);
  const newJavaSourceDir = path.join(javaSourceRootDir, ...androidPackageNames);

  // 삭제할 폴더
  const dotGradleDir = path.join(basePath, '.gradle');
  const dotIdeaDir = path.join(basePath, '.idea');
  const buildDir = path.join(basePath, 'app', 'build');

  // 변경할 파일
  const settingsGradlePath = path.join(basePath, 'settings.gradle');
  const appBuildGradlePath = path.join(basePath, 'app', 'build.gradle');
  const appProguardRulesPath = path.join(basePath, 'app', 'proguard-rules.pro');
  const stringsXmlPath = path.join(basePath, 'app', 'src', 'main', 'res', 'values', 'strings.xml');

  // 변경하고 이동할 파일
  const javaSourcesFiles = fs.readdirSync(javaSourceDir).map(file => path.join(javaSourceDir, file));

  // 파일 있는지 여부 검사
  checkFileExists([settingsGradlePath, appBuildGradlePath, appProguardRulesPath]);

  // 파일 내용 변경
  [settingsGradlePath, appBuildGradlePath, appProguardRulesPath, ...javaSourcesFiles].forEach(filePath => {
    replaceContent(filePath, currentProjectName, env.PROJECT_NAME);
    replaceContent(filePath, currentAndroidBundleId, env.ANDROID_PACKAGE_NAME);
  });

  // strings.xml 변경
  replaceExtContent(stringsXmlPath, '<string name="app_name">', '', '</string>', env.DISPLAY_NAME);

  ll('java 소스 파일 이동');

  // java 소스 Temp 경로 생성
  if (!fs.existsSync(javaSourceTempDir)) {
    fs.mkdirSync(javaSourceTempDir);
  }

  // java 소스 Temp 경로 이동
  javaSourcesFiles.forEach((filePath) => {
    const fileName = path.basename(filePath);
    const newFilePath = path.join(javaSourceTempDir, fileName);
    fs.renameSync(filePath, newFilePath);
  });

  // java 소스 경로 삭제
  if (fs.existsSync(javaSourceDir)) {
    deleteDir(javaSourceDir);
  }

  // java 소스 경로 생성
  let prevDir = javaSourceRootDir;
  androidPackageNames.forEach((v) => {
    const valueDir = path.join(prevDir, v);
    if (!fs.existsSync(valueDir)) {
      fs.mkdirSync(valueDir);
    }
    prevDir = valueDir;
  });

  // java 소스 이동
  javaSourcesFiles.forEach((filePath) => {
    const fileName = path.basename(filePath);
    const tempFilePath = path.join(javaSourceTempDir, fileName);
    const newFilePath = path.join(newJavaSourceDir, fileName);
    fs.renameSync(tempFilePath, newFilePath);
  });

  // java 소스 Temp 경로 삭제
  if (fs.existsSync(javaSourceTempDir)) {
    deleteDir(javaSourceTempDir);
  }

  // build 디렉토리 삭제
  [dotGradleDir, dotIdeaDir, buildDir].forEach((dir) => {
    if (fs.existsSync(dir)) {
      ll(`${dir} 디렉토리 삭제`);
      deleteDir(dir);
    }
  });
}
