#import "RNUtilModule.h"
#import <AppTrackingTransparency/AppTrackingTransparency.h>
#import <AdSupport/ASIdentifierManager.h>

@implementation RNUtilModule

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getAdvertisingStatus, getAdvertisingStatus_resolver: (RCTPromiseResolveBlock) resolve getAdvertisingStatus_rejecter: (RCTPromiseRejectBlock) reject)
{
  if (@available(iOS 14, *)) {
    resolve([NSNumber numberWithLong:[ATTrackingManager trackingAuthorizationStatus]]);
  } else {
    resolve([NSNumber numberWithInt:3]);
  }
}

RCT_REMAP_METHOD(getAdvertisingInfo, getAdvertisingInfo_resolver: (RCTPromiseResolveBlock) resolve getAdvertisingInfo_rejecter: (RCTPromiseRejectBlock) reject)
{
  NSMutableDictionary *result = [[NSMutableDictionary alloc] init];
  [result setObject:[NSNull null] forKey:@"id"];
  [result setObject:[NSNumber numberWithBool:true] forKey:@"isAdTrackingLimited"];

  if (@available(iOS 14, *)) {
    switch ([ATTrackingManager trackingAuthorizationStatus]) {
      case ATTrackingManagerAuthorizationStatusAuthorized:
        [result setObject:[[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString] forKey:@"id"];
        [result setObject:[NSNumber numberWithBool:false] forKey:@"isAdTrackingLimited"];
        resolve(result);
        break;
      case ATTrackingManagerAuthorizationStatusRestricted:
      case ATTrackingManagerAuthorizationStatusDenied:
        resolve(result);
        break;
      case ATTrackingManagerAuthorizationStatusNotDetermined:
        [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
          ATTrackingManagerAuthorizationStatus currentStatus = [ATTrackingManager trackingAuthorizationStatus];
          while (currentStatus == ATTrackingManagerAuthorizationStatusNotDetermined) {
            currentStatus = [ATTrackingManager trackingAuthorizationStatus];
            [NSThread sleepForTimeInterval:0.1f];
          }

          switch (currentStatus) {
            case ATTrackingManagerAuthorizationStatusAuthorized:
              [result setObject:[[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString] forKey:@"id"];
              [result setObject:[NSNumber numberWithBool:false] forKey:@"isAdTrackingLimited"];
              resolve(result);
              break;
            default:
              resolve(result);
              break;
          }
        }];
        break;
    }
  } else {
    [result setObject:[[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString] forKey:@"id"];
    [result setObject:[NSNumber numberWithBool:false] forKey:@"isAdTrackingLimited"];
    resolve(result);
  }
}

@end
