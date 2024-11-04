package com.zsdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

abstract class ZsdkSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun multiply(a: Double, b: Double, promise: Promise)
  abstract fun startPreloginTunnel(appKey: String?, udid: String?, promise: Promise)
  abstract fun setConfiguration(jsSDKConfig: ReadableMap?, promise: Promise)
  abstract fun status(promise: Promise)
  abstract fun stopTunnel(promise: Promise)
}
