-dontobfuscate

-dontwarn org.slf4j.impl.StaticLoggerBinder

# App
-keep class domain.reactnativetemplate.** { *; }

# hermes
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# react-native-codepush
-keepclassmembers class com.facebook.react.ReactInstanceManager {
    private final ** mBundleLoader;
}
-dontwarn com.nimbusds.jose.**

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

# airbnb
-keep interface com.airbnb.lottie.** { *; }
-keep class com.airbnb.lottie.** { *; }

# R8
-keepattributes LineNumberTable,SourceFile
-renamesourcefileattribute SourceFile
-keep,allowobfuscation,allowshrinking class kotlin.coroutines.Continuation
-if interface * { @retrofit2.http.* public *** *(...); }
-keep,allowoptimization,allowshrinking,allowobfuscation class <3>
-keep,allowobfuscation,allowshrinking class retrofit2.Response
