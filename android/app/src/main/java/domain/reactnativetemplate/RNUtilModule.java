package domain.reactnativetemplate;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Patterns;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableNativeMap;
import com.google.android.gms.ads.identifier.AdvertisingIdClient;

import java.security.MessageDigest;
import java.util.regex.Pattern;

public class RNUtilModule extends ReactContextBaseJavaModule {
  static String sha1(String text) {
    try {
      MessageDigest m = MessageDigest.getInstance("SHA-1");
      m.update(text.getBytes());
      byte data[] = m.digest();
      String sha1Data = "";
      for (int i = 0; i < data.length; i++) {
        String h = Integer.toHexString(0xFF & data[i]);
        while (h.length() < 2)
          h = "0" + h;
        sha1Data += h;
      }
      return sha1Data;
    } catch (Exception e) {
      return "";
    }
  }

  private final ReactApplicationContext reactContext;

  public RNUtilModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNUtilModule";
  }

  @ReactMethod
  public void isAppInstalled(String packageId, final Promise promise) {
    PackageManager pm = reactContext.getPackageManager();
    try {
      pm.getPackageInfo(packageId, PackageManager.GET_META_DATA);
      promise.resolve(true);
    } catch (Exception e) {
      promise.resolve(false);
    }
  }

  @ReactMethod
  public void appRun(String packageId, final Promise promise) {
    PackageManager pm = reactContext.getPackageManager();
    try {
      Intent intent = pm.getLaunchIntentForPackage(packageId);
      if (intent != null) {
        Activity activity = reactContext.getCurrentActivity();
        if (activity != null) {
          activity.startActivity(intent);
          promise.resolve(true);
        } else {
          promise.resolve(false);
        }
      } else {
        promise.resolve(false);
      }
    } catch (Exception e) {
      promise.resolve(false);
    }
  }

  @ReactMethod
  public void getAdvertisingInfo(final Promise promise) {
    WritableNativeMap result = new WritableNativeMap();

    try {
      AdvertisingIdClient.Info info = AdvertisingIdClient.getAdvertisingIdInfo(reactContext);
      result.putString("id", info.getId());
      result.putBoolean("isAdTrackingLimited", false);
    } catch (Exception e) {
      e.printStackTrace();

      result.putNull("id");
      result.putBoolean("isAdTrackingLimited", true);
    }

    promise.resolve(result);
  }
}
