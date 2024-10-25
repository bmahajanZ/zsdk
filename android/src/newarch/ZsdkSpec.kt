package com.zsdk

import com.facebook.react.bridge.ReactApplicationContext

abstract class ZsdkSpec internal constructor(context: ReactApplicationContext) :
  NativeZsdkSpec(context) {
}
