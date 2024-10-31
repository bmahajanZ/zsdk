package com.zsdk

import android.util.Log
import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.ReactCookieJarContainer
import com.zscaler.sdk.android.ZscalerSDK
import okhttp3.Credentials
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route
import java.io.IOException
import java.net.Authenticator
import java.net.InetSocketAddress
import java.net.Proxy
import java.net.ProxySelector
import java.net.SocketAddress
import java.net.URI

internal class CustomNetworkModule : OkHttpClientFactory {
  override fun createNewNetworkModuleClient(): OkHttpClient {
    return OkHttpClient.Builder()
      .cookieJar(ReactCookieJarContainer())
      .proxySelector(object : ProxySelector() {
        override fun select(uri: URI?): MutableList<Proxy> {
          val proxyList = mutableListOf<Proxy>()
          val proxyInfo = ZscalerSDK.proxyInfo()
          if (proxyInfo != null) {
            proxyList.add(Proxy(Proxy.Type.HTTP, InetSocketAddress(proxyInfo.proxyHost, proxyInfo.proxyPort)))
          }

          return proxyList
        }

        override fun connectFailed(uri: URI?, sa: SocketAddress?, ioe: IOException?) {
          // cannot throw ZscalerSDKException here since this is called for each URI request hence log error
          // however capture error in sentry.
          Log.e(ZsdkModule.LOG_TAG, "setProxyForHttpRequest: connectFailed : proxy connectFailed() with:" +
            " uri = $uri, SocketAddress = $sa, IOException = ${ioe?.message}")
        }
      }).proxyAuthenticator(object : Authenticator(), okhttp3.Authenticator {
        override fun authenticate(route: Route?, response: Response): Request? {
          val proxyInfo = ZscalerSDK.proxyInfo() ?: return null
          val username = proxyInfo.username ?: return null
          val password = proxyInfo.password ?: return null
          val credential = Credentials.basic(username, password)
          try {
            // If we already failed with the credentials, don't retry.
            if (response.request.header("Proxy-Authorization") != null &&
              credential == response.request.header("Proxy-Authorization")) {
              Log.e("React-App", "ProxyAuthenticator already tried with the credentials")
              return null
            }
            Log.d(ZsdkModule.LOG_TAG, "Proxy-Authorization authenticate called")
            return response.request.newBuilder()
              .header("Proxy-Authorization", credential)
              .build()
          } catch (ioException : IOException) {
            // Keep it as IOException instead of ZscalerSDKException since
            // OkHttp methods throw IOException so this exception should be caught in same catch block
            // However, send the error event to Sentry
            Log.e(ZsdkModule.LOG_TAG, "ProxyAuthenticator threw an exception" + Log.getStackTraceString(ioException))
            throw ioException
          }
        }

      })
      .build()
  }
}
