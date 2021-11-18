import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import CustomBackButton from 'src/components/CustomBackButton';
import {styles} from './styles';

import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'src/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import {Tabs} from 'src/components/Tabs';
import {AppText} from 'src/components/AppText';
import {Divider, HStack} from 'native-base';
import {Spacer} from 'src/components/Spacer';

export type Position = number[];

export const FieldMonitoringScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['60%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [polygonLocation] = useState<Position[]>([]);

  const [] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    handleCenter();
  }, [polygonLocation]);

  const handleCenter = () => {
    mapRef.current?.getCenter();
  };

  const polygonData = useCallback(() => {
    let data: Position[] = [];
    if (polygonLocation.length > 1) {
      const lastIndex = polygonLocation.length - 1;
      const startPoint = polygonLocation[0];
      const endPoint = polygonLocation[lastIndex];
      if (
        startPoint[0] === endPoint[lastIndex] &&
        endPoint[lastIndex] === startPoint[0]
      ) {
        data = polygonLocation;
      } else {
        data = [...polygonLocation, startPoint];
      }
    }
    return data;
  }, [polygonLocation]);
  const mapRef = useRef<MapboxGL.MapView | null>();
  const navigation = useNavigation();

  const FarmAreaPolyGon = () => {
    const coordinates = polygonData();
    const showPolygon = true;
    // @ts-ignore
    return (
      <MapboxGL.ShapeSource
        id="polygonSource"
        maxZoomLevel={12}
        shape={{
          type: 'Feature',
          properties: {},
          geometry: {
            type: showPolygon ? 'Polygon' : 'LineString',
            // @ts-ignore
            coordinates: showPolygon ? [coordinates] : coordinates,
          },
        }}>
        {showPolygon ? (
          <MapboxGL.FillLayer
            id="polygon"
            style={{
              fillOpacity: 0.9,
              fillColor: AppColors.PolygonFill,
              fillOutlineColor: '#FFF619',
            }}
          />
        ) : null}
        <MapboxGL.LineLayer
          id="polygonLine"
          style={{
            lineWidth: 2,
            lineColor: '#FFF619',
          }}
        />
      </MapboxGL.ShapeSource>
    );
  };
  const tabScenes = [
    {
      label: 'Harvest History',
      component: (
        <View>
          <AppText>Harvest History</AppText>
        </View>
      ),
    },
    {
      label: 'Weather History',
      component: (
        <View>
          <AppText>Weather History</AppText>
        </View>
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={ref => (mapRef.current = ref)}
        style={styles.map}
        styleURL="mapbox://styles/mapbox/satellite-v9"
        logoEnabled={false}
        compassEnabled={false}>
        {polygonLocation.length ? <FarmAreaPolyGon /> : null}
      </MapboxGL.MapView>
      <View style={styles.overlayTop}>
        <SafeAreaView>
          <View style={styles.actionBar}>
            <CustomBackButton onPress={navigation.goBack} />
          </View>
        </SafeAreaView>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.dragIndicator}
        onChange={handleSheetChanges}>
        <View style={styles.inputContainer}>
          <HStack style={styles.heading}>
            <View style={styles.headingRow}>
              <AppText style={styles.farmName}>Farm Name</AppText>
            </View>
            <View style={styles.headingRow}>
              <AppText>Farm Size</AppText>
              <AppText>Date Created</AppText>
            </View>
          </HStack>
          <Divider height={0.5} />
          <Spacer height={50} />
          <View style={[styles.flex, styles.marginBottom]}>
            <Tabs contents={tabScenes} />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};
