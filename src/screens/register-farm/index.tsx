import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {ActionButton} from 'src/components/ActionButton';
import {AppIcons, Icon} from 'src/components/Icon';

import CustomBackButton from 'src/components/CustomBackButton';
import {AppText} from 'src/components/AppText';
import {styles} from './styles';

import {AppColors} from 'src/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import {Controller} from 'react-hook-form';
import {useRegisterFarm} from 'src/hooks/userRegisterFarm';
import {Button, Divider, Input} from 'native-base';
import {useDiscardDialog} from 'src/components/DiscardDialog';
import {formattedShortDate} from 'src/helpers/date';

import ZoomButton from 'src/components/ZoomButton';

export const RegisterFarmFieldScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [zoom, setZoom] = useState(17);
  const {
    control,
    isLoading,
    submitForm,
    errors,
    setCoordinates,
    coordinates,
    position,
    navigation,
    warn,
    setWarn,
    setRecordingAccepted,
    recording,
    recordingAccepted,
    setRecording,
    size,
    polygonData,
    mapRef,
    startRecording,
  } = useRegisterFarm();

  const keepOn = () => {
    closeSheet();
    setTimeout(() => setWarn(false));
  };

  const toggleSaveForm = () => {
    setRecording(false);
    setCoordinates([]);
    setRecordingAccepted(false);
    closeSheet();
    setTimeout(() => setWarn(false));
  };

  const saveRecording = () => {
    setRecording(false);
    setRecordingAccepted(true);
  };
  const {closeSheet, Dialog} = useDiscardDialog({
    onCancel: keepOn,
    onConfirm: toggleSaveForm,
    message:
      'Note that your data will be lost! Are you sure you wand to stop this recording?',
  });

  const onLocation = (feature: {
    geometry: {coordinates: number[]; type: 'Point'};
    properties: {screenPointX: number; screenPointY: number};
    type: 'Feature';
  }) => {
    if (recording) {
      const newPoints = [
        ...coordinates,
        [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      ];
      setCoordinates(newPoints);
    }
  };

  const FarmAreaPolygon = () => {
    const polygonCoordinates = polygonData();
    const showPolygon =
      recordingAccepted || (!recording && polygonCoordinates.length > 2);
    // @ts-ignore
    return (
      <MapboxGL.ShapeSource
        id="polygonSource"
        maxZoomLevel={17}
        shape={{
          type: 'Feature',
          properties: {},
          geometry: {
            type: showPolygon ? 'Polygon' : 'LineString',
            // @ts-ignore
            coordinates: showPolygon
              ? [polygonCoordinates]
              : polygonCoordinates,
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
        onPress={onLocation}
        compassEnabled={false}>
        {position ? (
          <MapboxGL.Camera
            zoomLevel={zoom}
            followUserLocation={false}
            followUserMode="course"
            centerCoordinate={[position.longitude, position.latitude]}
          />
        ) : null}
        {coordinates.length ? <FarmAreaPolygon /> : null}
        <MapMarker />
        <MapboxGL.UserLocation visible={false} />
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
                <AppText>{size ? `${size} Acres` : ''}</AppText>
              </View>
              <View style={styles.sizeDateRow}>
                <AppText>Date Registered</AppText>
                <AppText>
                  {formattedShortDate(new Date().toISOString())}
                </AppText>
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
                    onChangeText={(value): void => props.field.onChange(value)}
                    clearButtonMode="while-editing"
                    testID="email"
                    variant="underlined"
                    placeholder="Enter Farm Label"
                    type={'text'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    editable={!isLoading}
                  />
                )}
              />
              {errors?.farmLabel && (
                <AppText>{errors?.farmLabel?.message}</AppText>
              )}
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
                  onPress={submitForm}
                  size="sm"
                  isLoading={isLoading}
                  isLoadingText={'Saving'}
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
              onPress={startRecording}
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
      <ZoomButton
        style={styles.zoomButton}
        color={'blue'}
        onPress={async () => {
          await mapRef.current?.getZoom().then(zoomVal => {
            console.log(zoomVal);
            setZoom(zoomVal + 1);
            mapRef.current?.getCenter();
          });
        }}
      />
      {warn && <Dialog />}
    </View>
  );
};
