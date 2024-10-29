#import "Zsdk.h"
#import <Zscaler/Zscaler-Swift.h>

@implementation Zsdk
RCT_EXPORT_MODULE()

- (instancetype)init
{
    self = [super init];
    if (self) {
        JS::NativeZsdk::ZscalerSDKConfiguration defaultConfig(@{});
        [self setConfiguration: defaultConfig];
    }
    return self;
}

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_EXPORT_METHOD(multiply:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @(a * b);

    resolve(result);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeZsdkSpecJSI>(params);
}


- (void)startPreloginTunnel:(NSString *)appKey
                       udid:(NSString *)udid
                    resolve:(RCTPromiseResolveBlock)resolve
                     reject:(RCTPromiseRejectBlock)reject {
    [ZscalerSDK.sharedInstance startPreLoginTunnelWithAppKey:appKey
                                                  deviceUdid:udid
                                           completionHandler:^(NSError * _Nullable err) {
        if(err) {
            reject([NSString stringWithFormat:@"%ld", (long)err.code], err.description, err);
            return;
        }
        resolve(0);
    }];
}

- (void)setConfiguration:(JS::NativeZsdk::ZscalerSDKConfiguration &)ZscaleSDKConfiguration {
    // Always set redirect to true.
    ZscalerSDKConfiguration* newConfig = 
    [ZscalerSDKConfiguration.alloc
     initWithAutomaticallyConfigureRequests:YES
     automaticallyConfigureWebviews:YES
     useProxyAuthentication:ZscaleSDKConfiguration.useProxyAuthentication().value_or(false)
     failIfDeviceCompromised:ZscaleSDKConfiguration.failIfDeviceCompromised().value_or(false)
     blockZPAConnectionsOnTunnelFailure:ZscaleSDKConfiguration.blockZPAConnectionsOnTunnelFailure().value_or(false)
     enableDebugLogsInConsole:ZscaleSDKConfiguration.enableDebugLogsInConsole().value_or(false)
     logLevel:static_cast<LogLevel>(ZscaleSDKConfiguration.logLevel().value_or(2))];

    [ZscalerSDK.sharedInstance setConfiguration:newConfig];
}

- (NSString *)status { 
    return [ZscalerSDK.sharedInstance status];
}

- (void)stopTunnel:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject { 
    [ZscalerSDK.sharedInstance stopTunnelWithCompletionHandler:^{
        resolve(@"Tunnel Stopped");
    } ];
}

#endif

@end
