import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStack} from './root-stack';
import {setMasterNavigator} from './master-navigator';

export const Navigator = (): React.ReactElement => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={setMasterNavigator}>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
