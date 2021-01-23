import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  // StatusBar
} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HealthkitController from './HealthKitHeader.js';
const PERMS = AppleHealthKit.Constants.Permissions;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloodPressure: false,
      heartRate: false,
      stepCount: false,
    };
  }

  componentDidMount() {
    const healthKitOptions = {
      permissions: {
        read: [
          PERMS.BloodPressureDiastolic,
          PERMS.BloodPressureSystolic,
          PERMS.HeartRate,
          PERMS.StepCount
        ],
        write: [
          PERMS.BloodPressureDiastolic,
          PERMS.BloodPressureSystolic,
          PERMS.StepCount
        ]
      }
    };

    AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
      if (err) {
        console.log("error initializing Healthkit: ", err);
        return;
      }
      let blood_options = {
        unit: 'mmhg',	// optional; default 'mmhg'
        startDate: (new Date(2016, 4, 27)).toISOString(), // required
        endDate: (new Date()).toISOString(),	// optional; default now
        ascending: false,	// optional; default false
        limit: 10, // optional; default no limit
      };
      // Date of Birth Example
      AppleHealthKit.getBloodPressureSamples(blood_options, (err, results) => {
        if (err) {
          return;
        }
        console.log(results)
        this.setState({
          bloodPressure: results
        })
      });

      let heart_options = {
        unit: 'bpm', // optional; default 'bpm'
        startDate: (new Date(2016, 4, 27)).toISOString(), // required
        endDate: (new Date()).toISOString(), // optional; default now
        ascending: false, // optional; default false
        limit: 10, // optional; default no limit
      };

      AppleHealthKit.getHeartRateSamples(heart_options, (err, results) => {
        if (err) {
          return;
        }
        console.log(results)
        this.setState({
          heartRate: results
        })
      });
      let step_options = {
        startDate: new Date(2020, 1, 1).toISOString(), // required
        endDate: new Date().toISOString(), // optional; default now
      };

      AppleHealthKit.getStepCount(step_options, (err, results) => {
        if (err) {
          return;
        }
        console.log(results)
        this.setState({
          stepCount: results
        })
      });

    });

  }

  render() {
    const {
      bloodPressure,
      heartRate,
      stepCount
    } = this.state;

    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>BloodPressure</Text>
                {(bloodPressure) &&
                  <Text style={styles.sectionDescription}>
                    {bloodPressure.bloodPressureSystolicValue, bloodPressure.bloodPressureDiastolicValue}
                  </Text>
                }
                {(!bloodPressure) &&
                  <Text style={styles.sectionDescriptionError}>
                    Add your BloodPressure to Health App!
                  </Text>
                }
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>HeartRate</Text>
                {(heartRate) &&
                  <Text style={styles.sectionDescription}>
                    {heartRate.value}
                  </Text>
                }
                {(!heartRate) &&
                  <Text style={styles.sectionDescriptionError}>
                    Add your HeartRate to Health App!
                  </Text>
                }
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>StepCount</Text>
                {(stepCount) &&
                  <Text style={styles.sectionDescription}>
                    {stepCount.value}
                  </Text>
                }
                {(!stepCount) &&
                  <Text style={styles.sectionDescriptionError}>
                    Add your StepCount to Health App!
                  </Text>
                }
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF',
  },
  body: {
    backgroundColor: '#FFF',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#555',
  },
  sectionDescriptionError: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#A00000'
  },
});

