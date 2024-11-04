#import "Zsdk.h"
#import <Zscaler/Zscaler-Swift.h>

@implementation Zsdk
RCT_EXPORT_MODULE()

- (instancetype)init
{
    self = [super init];
    if (self) {
        bool isNewArch = false;
#ifdef RCT_NEW_ARCH_ENABLED
        isNewArch = true;
#endif
        NSLog(@"Is new Arch?:%d", isNewArch);
        [self setDefaulConfig];
    }
    return self;
}

#pragma mark Methods compatible with new and old arch
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

RCT_EXPORT_METHOD(startPreloginTunnel:(NSString *)appKey
                  udid:(NSString *)udid
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
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

RCT_EXPORT_METHOD(status:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    resolve([ZscalerSDK.sharedInstance status]);
}

RCT_EXPORT_METHOD(stopTunnel:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    [ZscalerSDK.sharedInstance stopTunnelWithCompletionHandler:^{
        resolve(@"Tunnel Stopped");
    } ];
}


-(void)setDefaulConfig {
    ZscalerSDKConfiguration* defaultConfig = [ZscalerSDKConfiguration.alloc
                                              initWithAutomaticallyConfigureRequests:YES
                                              automaticallyConfigureWebviews:YES
                                              useProxyAuthentication:NO
                                              failIfDeviceCompromised:NO
                                              blockZPAConnectionsOnTunnelFailure:NO
                                              enableDebugLogsInConsole:NO
                                              logLevel:LogLevel::LogLevelDebug];
    [ZscalerSDK.sharedInstance setConfiguration:defaultConfig];
}


#pragma mark New Arch
// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeZsdkSpecJSI>(params);
}

- (void)setConfiguration:(JS::NativeZsdk::ZscalerSDKConfiguration &)ZscaleSDKConfiguration 
                 resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject {
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
    resolve(@"Config set successfully");
}

#else
#pragma mark Old Arch
RCT_EXPORT_METHOD(setConfiguration:(NSDictionary*)config
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    if(!config || nil == config) {
        resolve(@"Nil config sent");
        return;
    }
    bool useProxyAuthentication = false;
    if([config valueForKey:@"useProxyAuthentication"]) {
        useProxyAuthentication = [config valueForKey:@"useProxyAuthentication"];
    }
    bool failIfDeviceCompromised = false;
    if([config valueForKey:@"failIfDeviceCompromised"]) {
        failIfDeviceCompromised = [config valueForKey:@"failIfDeviceCompromised"];
    }
    bool blockZPAConnectionsOnTunnelFailure = false;
    if([config valueForKey:@"blockZPAConnectionsOnTunnelFailure"]) {
        blockZPAConnectionsOnTunnelFailure = [config valueForKey:@"blockZPAConnectionsOnTunnelFailure"];
    }
    bool enableDebugLogsInConsole = false;
    if([config valueForKey:@"enableDebugLogsInConsole"]) {
        enableDebugLogsInConsole = [config valueForKey:@"enableDebugLogsInConsole"];
    }
    LogLevel logLevel = LogLevel::LogLevelDebug;
    if([config valueForKey:@"logLevel"]) {
        logLevel = (LogLevel)[[config valueForKey:@"logLevel"] intValue];
    }
    ZscalerSDKConfiguration* sdkConfig =
    [ZscalerSDKConfiguration.alloc
     initWithAutomaticallyConfigureRequests:YES
     automaticallyConfigureWebviews:YES
     useProxyAuthentication:useProxyAuthentication
     failIfDeviceCompromised:failIfDeviceCompromised
     blockZPAConnectionsOnTunnelFailure:blockZPAConnectionsOnTunnelFailure
     enableDebugLogsInConsole:enableDebugLogsInConsole
     logLevel:logLevel];
    [ZscalerSDK.sharedInstance setConfiguration:sdkConfig];
    resolve(@"Config set successfully");
}
#endif

@end
