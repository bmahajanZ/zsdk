package com.zsdk

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.modules.network.OkHttpClientProvider
import java.util.HashMap

class ZsdkPackage : TurboReactPackage() {
  init {
    // Factory has to be setup while app is being setup.
    // Package is initialized during oncreate() method of the app.
    // Changing factory at a later stage doesn't work.
   OkHttpClientProvider.setOkHttpClientFactory(CustomNetworkModule())
  }

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == ZsdkModule.NAME) {
      ZsdkModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      moduleInfos[ZsdkModule.NAME] = ReactModuleInfo(
        ZsdkModule.NAME,
        ZsdkModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        true,  // hasConstants
        false,  // isCxxModule
        isTurboModule // isTurboModule
      )
      moduleInfos
    }
  }
}
