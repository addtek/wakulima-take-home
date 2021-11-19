import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import CustomBackButton from 'src/components/CustomBackButton';
import {styles} from './styles';

import {AppColors} from 'src/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import {Tabs} from 'src/components/Tabs';
import {AppText} from 'src/components/AppText';
import {Divider, HStack, Select} from 'native-base';
import {Spacer} from 'src/components/Spacer';

import {ActionButton} from 'src/components/ActionButton';
import {navigateMasterScreen} from 'src/services/navigation/master-navigator';
import {AppIcons, Icon} from 'src/components/Icon';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {Controller} from 'react-hook-form';
import {useFieldMonitoring} from 'src/hooks/useFieldMonitoring';

export type Position = number[];

export const FieldMonitoringScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {control, isLoading, farmId, farm, goBack} = useFieldMonitoring();
  const snapPoints = useMemo(() => ['60%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [polygonLocation] = useState<Position[]>([]);

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
  const chartWidth = Dimensions.get('window').width - 50;
  const tabScenes = [
    {
      label: 'Harvest History',
      component: (
        <View style={styles.tabContentView}>
          <Controller
            name="season"
            control={control}
            defaultValue=""
            render={(props): React.ReactElement => (
              <View style={styles.input}>
                <Select
                  {...props}
                  onValueChange={(value): void => props.field.onChange(value)}
                  testID="crop"
                  variant="underlined"
                  placeholder="Select Crop"
                  isDisabled={isLoading}>
                  <Select.Item label="Early Season" value="earlyseason" />
                  <Select.Item label="Mid Season" value="midseason" />
                  <Select.Item label="Late Season" value="lateseason" />
                  <Select.Item label="Full Season" value="fullseason" />
                </Select>
              </View>
            )}
          />
          <BarChart
            data={{
              labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            yAxisLabel={''}
            yAxisSuffix={''}
            width={chartWidth} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              fillShadowGradientOpacity: 1,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: () => '#2B7F68',
              labelColor: () => '#000000',
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#919B38',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      ),
    },
    {
      label: 'Weather History',
      component: (
        <View>
          <Controller
            name="season"
            control={control}
            defaultValue=""
            render={(props): React.ReactElement => (
              <View style={styles.input}>
                <Select
                  {...props}
                  onValueChange={(value): void => props.field.onChange(value)}
                  testID="rain"
                  variant="underlined"
                  placeholder="Rain"
                  isDisabled={isLoading}>
                  <Select.Item label="Early Season" value="earlyseason" />
                  <Select.Item label="Mid Season" value="midseason" />
                  <Select.Item label="Late Season" value="lateseason" />
                  <Select.Item label="Full Season" value="fullseason" />
                </Select>
              </View>
            )}
          />
          <LineChart
            data={{
              labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={chartWidth} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              fillShadowGradientOpacity: 1,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(189, 195, 136, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#919B38',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
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
            <CustomBackButton onPress={goBack} />
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
              <AppText style={styles.farmName}>{farm?.label}</AppText>
            </View>
            <View style={styles.headingRow}>
              <AppText>
                {farm?.size} {farm?.sizeUnit}
              </AppText>
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
      <View style={styles.floatingButtonWrap}>
        <ActionButton
          onPress={() => navigateMasterScreen('recordHarvest', {farmId})}
          styles={styles.floatingButton}
          child={
            <View style={styles.floatingButtonChild}>
              <Icon iconType={AppIcons.add} width={30} />
              <AppText style={styles.textLight}>Record Harvest</AppText>
            </View>
          }
        />
      </View>
    </View>
  );
};
