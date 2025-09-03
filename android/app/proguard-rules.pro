-dontobfuscate

-dontwarn org.slf4j.impl.StaticLoggerBinder

# App
-keep class domain.reactnativetemplate.** { *; }

# React Native
-keep public class com.facebook.react.** {*;}
-keep class com.facebook.react.bridge.** {*;}
-keep class com.facebook.react.devsupport.** {*;}
-keep class com.facebook.react.modules.** {*;}
-keep class com.facebook.react.uimanager.** {*;}
-keep class com.facebook.react.views.** {*;}
-keep class com.facebook.react.packager.** {*;}
-keep class com.facebook.react.v8executor.** {*;}
-keep class com.facebook.react.util.** {*;}
-keep class com.facebook.hermes.** {*;}

# Firebase
-keep class com.google.firebase.** { *; }

# react-native-device-info
-keepclassmembers class com.android.installreferrer.api.** { *; }

# flipper
-keep class com.facebook.flipper.** { *; }

# react-native-bootsplash
-keep class com.zoontek.rnbootsplash.** { *; }

# kakao login
-keep class com.kakao.sdk.**.model.* { <fields>; }
-keep class * extends com.google.gson.TypeAdapter

# naver login
-keep public class com.nhn.android.naverlogin.** {
    public protected *;
}
-keep public class com.navercorp.nid.** { *; }

# android support
-keep interface android.support.v4.** { *; }
-keep class android.support.v4.** { *; }

# androidx appcompat
-keep interface androidx.** { *; }
-keep class androidx.** { *; }

# webview
-keep public class com.reactnativecommunity.webview.** { *; }
-keep public class com.facebook.react.views.webview.** { *; }

# react-native-svg
-keep public class com.horcrux.svg.** {*;}

# R8
-keepattributes LineNumberTable,SourceFile
-renamesourcefileattribute SourceFile
-keep,allowobfuscation,allowshrinking class kotlin.coroutines.Continuation
-if interface * { @retrofit2.http.* public *** *(...); }
-keep,allowoptimization,allowshrinking,allowobfuscation class <3>
-keep,allowobfuscation,allowshrinking class retrofit2.Response
