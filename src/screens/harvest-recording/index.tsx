import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {ActionButton} from 'src/components/ActionButton';
import {AppIcons, Icon} from 'src/components/Icon';

import CustomBackButton from 'src/components/CustomBackButton';
import {AppText} from 'src/components/AppText';
import {styles} from './styles';

import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'src/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import {Controller} from 'react-hook-form';
import {useRecordFarmHarvest} from 'src/hooks/useRecordFarmHarvest';
import {Button, Input, Select} from 'native-base';
import Coordinates = MapboxGL.Coordinates;
import {useDiscardDialog} from 'src/components/DiscardDialog';

export type Position = number[];

export const RecordFarmHarvestScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['60%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [position, setPosition] = useState<null | {
    latitude: number;
    longitude: number;
  }>();
  const [polygonLocation, setLocations] = useState<Position[]>([]);
  const [recording, setRecording] = useState(false);
  const [warn, setWarn] = useState(false);
  const [recordingAccepted, setRecordingAccepted] = useState(false);

  const [] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const {control, isLoading} = useRecordFarmHarvest();

  useEffect(() => {
    handleCenter();
  }, [polygonLocation]);

  const keepOn = () => {
    closeSheet();
    setTimeout(() => setWarn(false));
  };

  const toggleSaveForm = () => {
    setRecording(false);
    setLocations([]);
    setRecordingAccepted(false);
    closeSheet();
    setTimeout(() => setWarn(false));
  };

  const {closeSheet, Dialog} = useDiscardDialog({
    onCancel: toggleSaveForm,
    onConfirm: keepOn,
    message:
      'Note that your data will be lost! Are you sure you wand to stop this recording?',
  });
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

  const onLocation = (feature: {coords: Coordinates; timestamp?: number}) => {
    if (recording) {
      setPosition({
        latitude: feature.coords.latitude,
        longitude: feature.coords.longitude,
      });
      const newPoints = [
        ...polygonLocation,
        [feature.coords.longitude, feature.coords.latitude],
      ];
      setLocations(newPoints);
    }
  };
  const FarmAreaPolyGon = () => {
    const coordinates = polygonData();
    const showPolygon =
      recordingAccepted || (!recording && polygonLocation.length > 2);
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

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={ref => (mapRef.current = ref)}
        style={styles.map}
        styleURL="mapbox://styles/mapbox/satellite-v9"
        logoEnabled={false}
        compassEnabled={false}
        onUserLocationUpdate={onLocation}>
        {position ? (
          <MapboxGL.Camera
            zoomLevel={17}
            followUserLocation={false}
            followUserMode="course"
            centerCoordinate={[position.longitude, position.latitude]}
          />
        ) : null}
        {polygonLocation.length ? <FarmAreaPolyGon /> : null}
        <MapboxGL.UserLocation visible={false} onUpdate={onLocation} />
      </MapboxGL.MapView>
      <View style={styles.overlayTop}>
        <SafeAreaView>
          <View style={styles.actionBar}>
            <CustomBackButton onPress={navigation.goBack} />
            {recording && (
              <ActionButton
                styles={styles.recordingStateButton}
                onPress={() => null}
                child={
                  <View style={styles.flex}>
                    <Icon iconType={AppIcons.recordTransparent} width={30} />
                    <AppText style={styles.whiteText}>Recording</AppText>
                  </View>
                }
              />
            )}
          </View>
        </SafeAreaView>
      </View>
      {!warn && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.dragIndicator}
          onChange={handleSheetChanges}>
          <View style={styles.inputContainer}>
            <Controller
              name="year"
              control={control}
              defaultValue=""
              render={(props): React.ReactElement => (
                <View style={styles.input}>
                  <Select
                    {...props}
                    testID="email"
                    variant="underlined"
                    placeholder="Year"
                    isDisabled={isLoading}>
                    <Select.Item label="2021" value="2021" />
                    <Select.Item label="2020" value="2020" />
                    <Select.Item label="2019" value="2019" />
                    <Select.Item label="2018" value="2018" />
                    <Select.Item label="2017" value="2017" />
                  </Select>
                </View>
              )}
            />
            <Controller
              name="season"
              control={control}
              defaultValue=""
              render={(props): React.ReactElement => (
                <View style={styles.input}>
                  <Select
                    {...props}
                    testID="email"
                    variant="underlined"
                    placeholder="Season"
                    isDisabled={isLoading}>
                    <Select.Item label="Early Season" value="earlyseason" />
                    <Select.Item label="Mid Season" value="midseason" />
                    <Select.Item label="Late Season" value="lateseason" />
                    <Select.Item label="Full Season" value="fullseason" />
                  </Select>
                </View>
              )}
            />
            <Controller
              name="crop"
              control={control}
              defaultValue=""
              render={(props): React.ReactElement => (
                <Input
                  {...props}
                  clearButtonMode="while-editing"
                  testID="crop"
                  variant="underlined"
                  isRequired
                  placeholder="Crop"
                  type={'text'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  editable={!isLoading}
                />
              )}
            />
            <View style={[styles.flex, styles.marginBottom]}>
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                render={(props): React.ReactElement => (
                  <Input
                    {...props}
                    clearButtonMode="while-editing"
                    testID="quantity"
                    variant="underlined"
                    isRequired
                    placeholder="Quantity"
                    type={'text'}
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[styles.input, styles.flex2]}
                    editable={!isLoading}
                  />
                )}
              />
              <Controller
                name="unit"
                control={control}
                defaultValue=""
                render={(props): React.ReactElement => (
                  <View style={[styles.input, styles.flex1]}>
                    <Select
                      {...props}
                      testID="unit"
                      variant="underlined"
                      placeholder="Unit"
                      isDisabled={isLoading}>
                      <Select.Item label="Tons" value="tons" />
                      <Select.Item label="Bushels" value="bushels" />
                      <Select.Item label="Pounds" value="pounds" />
                    </Select>
                  </View>
                )}
              />
            </View>
            <View style={styles.flex}>
              <Button
                colorScheme="secondary"
                size="sm"
                onPress={() => {
                  setRecordingAccepted(false);
                  setWarn(true);
                }}
                style={[styles.button, styles.left]}>
                Discard
              </Button>
              <Button
                isLoadingText="Save"
                style={[styles.button, styles.right]}>
                Save
              </Button>
            </View>
          </View>
        </BottomSheet>
      )}
      {warn && <Dialog />}
    </View>
  );
};
