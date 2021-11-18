import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {InternetStatusView} from 'src/components/InternetStatusView';
import {isIos} from 'src/helpers/device';
import {HomeScreen} from 'src/screens/main';
import {RecordFarmHarvestScreen} from 'src/screens/harvest-recording';
import {RegisterFarmFieldScreen} from 'src/screens/register-farm';
import {FieldMonitoringScreen} from 'src/screens/field-monitoring';
const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = isIos
  ? {
      headerShown: false,
      cardOverlayEnabled: true,
      headerStatusBarHeight: 10,
      ...TransitionPresets.ModalPresentationIOS,
    }
  : {
      headerShown: false,
      cardOverlayEnabled: true,
      ...TransitionPresets.RevealFromBottomAndroid,
    };

export const RootStack = (): React.ReactElement => {
  return (
    <>
      <InternetStatusView />
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          ...screenOptions,
        }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen
          name="registerField"
          component={RegisterFarmFieldScreen}
        />
        <Stack.Screen
          name="recordHarvest"
          component={RecordFarmHarvestScreen}
        />
        <Stack.Screen
          name="fieldMonitoring"
          component={FieldMonitoringScreen}
        />
      </Stack.Navigator>
    </>
  );
};
