import Foundation
import AppTrackingTransparency
import AdSupport
import React // 추가: RCTPromiseResolveBlock, RCTPromiseRejectBlock 사용을 위해 필요

@objc(RNUtilModule)
class RNUtilModule: NSObject {
  
  @objc
  func getAdvertisingStatus(_ resolve: @escaping RCTPromiseResolveBlock,
                            rejecter reject: @escaping RCTPromiseRejectBlock) {
    if #available(iOS 14, *) {
      resolve(NSNumber(value: ATTrackingManager.trackingAuthorizationStatus.rawValue))
    } else {
      resolve(NSNumber(value: 3)) // iOS 14 미만에서는 authorized로 간주
    }
  }
  
  @objc
  func getAdvertisingInfo(_ resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock) {
    var result: [String: Any] = [
      "id": NSNull(),
      "isAdTrackingLimited": true
    ]
    
    if #available(iOS 14, *) {
      switch ATTrackingManager.trackingAuthorizationStatus {
      case .authorized:
        let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
        result["id"] = idfa
        result["isAdTrackingLimited"] = false
        resolve(result)
      case .restricted, .denied:
        resolve(result)
      case .notDetermined:
        ATTrackingManager.requestTrackingAuthorization { status in
          let currentStatus = ATTrackingManager.trackingAuthorizationStatus
          if currentStatus == .authorized {
            let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
            result["id"] = idfa
            result["isAdTrackingLimited"] = false
          }
          resolve(result)
        }
      @unknown default:
        resolve(result)
      }
    } else {
      let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
      result["id"] = idfa
      result["isAdTrackingLimited"] = false
      resolve(result)
    }
  }
}
