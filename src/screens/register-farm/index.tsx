import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
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
import {useRegisterFarm} from 'src/hooks/userRegisterFarm';
import {Button, Divider, Input} from 'native-base';
import {getCurrentPosition} from 'src/services/locations';
import Coordinates = MapboxGL.Coordinates;
import {useDiscardDialog} from 'src/components/DiscardDialog';

export type Position = number[];

export const RegisterFarmFieldScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

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
  const {control, isLoading} = useRegisterFarm();

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

  const saveRecording = () => {
    setRecording(false);
    setRecordingAccepted(true);
  };
  const {closeSheet, Dialog} = useDiscardDialog({
    onCancel: toggleSaveForm,
    onConfirm: keepOn,
    message:
      'Note that your data will be lost! Are you sure you wand to stop this recording?',
  });
  const handleCenter = () => {
    getCurrentPosition(coords =>
      setPosition({latitude: coords.latitude, longitude: coords.longitude}),
    );
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

  const MapMarker = () => {
    return position ? (
      <MapboxGL.MarkerView
        id={'marker'}
        coordinate={[position.longitude, position.latitude]}>
        <View>
          <View>
            <Image
              source={require('src/assets/images/MapMarker.png')}
              style={{
                width: 20,
                height: 30,
              }}
            />
          </View>
        </View>
      </MapboxGL.MarkerView>
    ) : null;
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
        <MapMarker />
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
      {recordingAccepted ? (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{backgroundColor: 'transparent'}}
          handleIndicatorStyle={{display: 'none'}}
          onChange={handleSheetChanges}>
          <View>
            <View style={styles.sizeAndDateContainer}>
              <View style={styles.sizeDateRow}>
                <AppText>Size</AppText>
                <AppText>_</AppText>
              </View>
              <View style={styles.sizeDateRow}>
                <AppText>Date Registered</AppText>
                <AppText>Date</AppText>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.dragIndicator}>
                <Divider height={1.5} width="50%" />
              </View>
              <Controller
                name="farmLabel"
                control={control}
                defaultValue=""
                render={(props): React.ReactElement => (
                  <Input
                    {...props}
                    clearButtonMode="while-editing"
                    testID="email"
                    variant="underlined"
                    isRequired
                    placeholder="Enter Farm Label"
                    type={'text'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    editable={!isLoading}
                  />
                )}
              />
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
          </View>
        </BottomSheet>
      ) : (
        <View style={styles.overlayBottom}>
          <View style={styles.recordActions}>
            <ActionButton
              styles={styles.recordAction}
              onPress={() => setWarn(true)}
              child={<Icon iconType={AppIcons.trash} width={30} />}
            />
            <ActionButton
              styles={styles.recordAction}
              onPress={() => setRecording(!recording)}
              child={
                <Icon
                  iconType={recording ? AppIcons.pause : AppIcons.record}
                  width={30}
                />
              }
            />
            <ActionButton
              styles={styles.recordAction}
              onPress={saveRecording}
              child={<Icon iconType={AppIcons.check} width={30} />}
            />
          </View>
        </View>
      )}
      {warn && <Dialog />}
    </View>
  );
};
