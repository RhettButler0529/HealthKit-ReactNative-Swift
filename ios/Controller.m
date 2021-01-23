//
//  Controller.m
//  rnhealthkit
//
//  Created by MIS on 20.01.2021.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Controller, NSObject)

// Exports our requestAuthorization method in the class
RCT_EXTERN_METHOD(requestAuthorization)

@end
