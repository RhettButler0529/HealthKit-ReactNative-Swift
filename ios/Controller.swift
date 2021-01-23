//
//  Controller.swift
//  rnhealthkit
//
//  Created by MIS on 20.01.2021.
//

import Foundation
import HealthKit


@objc(Controller)
class Controller: NSObject {
let healthStore = HKHealthStore()

  // Function Method to request Authorizations from Healthkit
 @objc
 func requestAuthorization() {
     let typesToShare: Set = [
         HKQuantityType.workoutType()
     ]
     let typesToRead: Set = [
         HKObjectType.workoutType(),
     ]
    
     // Request authorization for those quantity types.
     healthStore.requestAuthorization(toShare: typesToShare, read: typesToRead) { (success, error) in
         // Handle error.
     }
 }
@objc
static func requiresMainQueueSetup() -> Bool {
   return true
  }
}
