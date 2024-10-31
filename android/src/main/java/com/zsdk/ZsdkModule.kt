package com.zsdk

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.zscaler.sdk.android.ZscalerSDK
import com.zscaler.sdk.android.configuration.ZscalerSDKConfiguration
import com.zscaler.sdk.android.exception.ZscalerSDKException
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ZsdkModule internal constructor(context: ReactApplicationContext) :
  ZsdkSpec(context) {

    init {
      currentActivity?.let {
        Log.d(LOG_TAG, "initialize sdk")
        ZscalerSDK.init(it.application, ZscalerSDKConfiguration.DEFAULT_CONFIGURATION)
        return@let
      }
    }

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  override fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  @ReactMethod
  override fun startPreloginTunnel(appKey: String?, udid: String?, promise: Promise?) {
    CoroutineScope(Dispatchers.IO).launch {
      // Code to run in the background
      try {
        if(appKey == null){
          Log.e(LOG_TAG, "startPreLoginTunnel null appkey")
          return@launch
        }
        if(udid == null) {
          Log.e(LOG_TAG, "startPreLoginTunnel null udid")
          return@launch
        }
        ZscalerSDK.startPreLoginTunnel(appKey = appKey, deviceUdid = udid)
        promise?.resolve("startPreLoginTunnel completed")
      } catch (e: Exception) {
        Log.e(LOG_TAG, "startPreLoginTunnel() failed with exception :: ${e.message}")
        val errorCode = when (e) {
          is ZscalerSDKException -> e.errorCode
          else -> -1
        }
        promise?.reject(errorCode.toString(), "startPreLoginTunnel() failed with exception :: ${e.message}")
      }
    }
  }

  @ReactMethod
  override fun setConfiguration(jsSDKConfig: ReadableMap?) {
    if(jsSDKConfig == null) {
      return
    }
    var useProxyAuthentication = false
    var failIfDeviceCompromised = false
    var blockZPAConnectionsOnTunnelFailure = false
    var enableDebugLogsInConsole = false
    var logLevel = ZscalerSDKConfiguration.LogLevel.debug

    if(jsSDKConfig.hasKey("useProxyAuthentication")) {
      useProxyAuthentication = jsSDKConfig.getBoolean("useProxyAuthentication")
    }
    if(jsSDKConfig.hasKey("failIfDeviceCompromised")) {
      failIfDeviceCompromised = jsSDKConfig.getBoolean("failIfDeviceCompromised")
    }
    if(jsSDKConfig.hasKey("blockZPAConnectionsOnTunnelFailure")) {
      blockZPAConnectionsOnTunnelFailure = jsSDKConfig.getBoolean("blockZPAConnectionsOnTunnelFailure")
    }
    if(jsSDKConfig.hasKey("enableDebugLogsInConsole")) {
      enableDebugLogsInConsole = jsSDKConfig.getBoolean("enableDebugLogsInConsole")
    }
    if(jsSDKConfig.hasKey("logLevel")) {
      logLevel = ZscalerSDKConfiguration.LogLevel.entries.get(jsSDKConfig.getInt("logLevel"))
    }
    val config = ZscalerSDKConfiguration(
      useProxyAuthentication = useProxyAuthentication,
      failIfDeviceCompromised = failIfDeviceCompromised,
      blockZPAConnectionsOnTunnelFailure = blockZPAConnectionsOnTunnelFailure,
      enableDebugLogsInConsole = enableDebugLogsInConsole,
      logLevel = logLevel
    )
    ZscalerSDK.setConfiguration(config)
  }

  @ReactMethod
  override fun status(): String {
    return ZscalerSDK.status()
  }

  @ReactMethod
  override fun stopTunnel(promise: Promise?) {
    ZscalerSDK.stopTunnel()
    promise?.resolve("Tunnel stop success")
  }

  companion object {
    const val NAME = "Zsdk"
    const val LOG_TAG = "zsdk_module"
  }
}
