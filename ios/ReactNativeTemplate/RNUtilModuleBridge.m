#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNUtilModule, NSObject)

RCT_EXTERN_METHOD(getAdvertisingStatus:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(getAdvertisingInfo:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )

@end
