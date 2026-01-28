package domain.reactnativetemplate

import android.app.Activity
import android.content.pm.PackageManager
import com.facebook.react.bridge.*
import com.google.android.gms.ads.identifier.AdvertisingIdClient
import java.security.MessageDigest

class RNUtilModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNUtilModule"
  }

  @ReactMethod
  fun isAppInstalled(packageId: String, promise: Promise) {
    val pm = reactContext.packageManager
    try {
      pm.getPackageInfo(packageId, PackageManager.GET_META_DATA)
      promise.resolve(true)
    } catch (e: Exception) {
      promise.resolve(false)
    }
  }

  @ReactMethod
  fun appRun(packageId: String, promise: Promise) {
    val pm = reactContext.packageManager
    try {
      val intent = pm.getLaunchIntentForPackage(packageId)
      if (intent != null) {
        val activity: Activity? = getCurrentActivity()
        if (activity != null) {
          activity.startActivity(intent)
          promise.resolve(true)
        } else {
          promise.resolve(false)
        }
      } else {
        promise.resolve(false)
      }
    } catch (e: Exception) {
      promise.resolve(false)
    }
  }

  @ReactMethod
  fun getAdvertisingInfo(promise: Promise) {
    val result = WritableNativeMap()
    try {
      val info = AdvertisingIdClient.getAdvertisingIdInfo(reactContext)
      result.putString("id", info.id)
      result.putBoolean("isAdTrackingLimited", false)
    } catch (e: Exception) {
      e.printStackTrace()
      result.putNull("id")
      result.putBoolean("isAdTrackingLimited", true)
    }
    promise.resolve(result)
  }

  companion object {
    fun sha1(text: String): String {
      return try {
        val m = MessageDigest.getInstance("SHA-1")
        m.update(text.toByteArray())
        val data = m.digest()
        val sb = StringBuilder()
        for (b in data) {
          val h = Integer.toHexString(0xFF and b.toInt())
          if (h.length < 2) sb.append("0")
          sb.append(h)
        }
        sb.toString()
      } catch (e: Exception) {
        ""
      }
    }
  }
}
