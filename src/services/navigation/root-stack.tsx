import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {InternetStatusView} from 'src/components/InternetStatusView';
import {isIos} from 'src/helpers/device';
import {HomeScreen} from 'src/screens/main';
import {RecordFarmHarvestScreen} from 'src/screens/harvest-recording';
import {RegisterFarmFieldScreen} from 'src/screens/register-farm';
import {FieldMonitoringScreen} from 'src/screens/field-monitoring';
import {FarmProvider} from 'src/providers/farm-provider/index.provider';
const Stack = createStackNavigator<RootStackParamList>();

const MainScreenWithContext = () => (
  <FarmProvider>
    <HomeScreen />
  </FarmProvider>
);

const MonitoringScreenWithContext = () => (
  <FarmProvider>
    <FieldMonitoringScreen />
  </FarmProvider>
);

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
        <Stack.Screen name="home" component={MainScreenWithContext} />
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
          component={MonitoringScreenWithContext}
        />
      </Stack.Navigator>
    </>
  );
};
