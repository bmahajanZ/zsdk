
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNZsdkSpec.h"

@interface Zsdk : NSObject <NativeZsdkSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Zsdk : NSObject <RCTBridgeModule>
#endif

@end
