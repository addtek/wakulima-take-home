import React from 'react';
import {Navigator} from 'src/services/navigation';
import {MenuProvider} from 'react-native-popup-menu';
import {NativeBaseProvider} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Toast from 'react-native-toast-message';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWNhZGRleSIsImEiOiJja2ExOGcxNXYwdzVqM2xudnZuZXVrZzQwIn0.Mt2OZpLdt2_LRovDAquvQQ',
);

const App = () => {
  return (
    <NativeBaseProvider>
      <MenuProvider>
        <Navigator />
        <Toast position="top" />
      </MenuProvider>
    </NativeBaseProvider>
  );
};

export default App;
