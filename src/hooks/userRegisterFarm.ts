import {useCallback, useEffect, useRef, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {schema} from 'src/screens/register-farm/register-farm.schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {convertArea, Position} from '@turf/helpers';
import {API} from 'src/services/API';
import {USER_ID} from 'src/config';
import {showToast} from 'src/components/Toast/toast';
import {useNavigation} from '@react-navigation/native';
import {
  getCurrentPosition,
  stopListeningToLocationChanges,
} from 'src/services/locations';
import area from '@turf/area';
import MapboxGL from '@react-native-mapbox-gl/maps';

export interface FormData {
  farmLabel: string;
}
export type Submit = SubmitHandler<FormData>;
export const useRegisterFarm = () => {
  const apiService = API.getInstance();
  const [isLoading, setLoading] = useState(false);
  const [size, setSize] = useState(0);
  const [coordinates, setCoordinates] = useState<Position[]>([]);

  const mapRef = useRef<MapboxGL.MapView | null>();

  const [recording, setRecording] = useState(false);
  const [warn, setWarn] = useState(false);
  const [recordingAccepted, setRecordingAccepted] = useState(false);
  const [position, setPosition] = useState<null | {
    latitude: number;
    longitude: number;
  }>();
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {farmLabel: ''},
  });

  const navigation = useNavigation();

  const polygonData = useCallback(() => {
    let data: Position[] = coordinates;
    if (coordinates.length) {
      const lastIndex = coordinates.length - 1;
      const startPoint = coordinates[0];
      const endPoint = coordinates[lastIndex];
      if (
        startPoint[0] === endPoint[lastIndex] &&
        endPoint[lastIndex] === startPoint[0]
      ) {
        data = coordinates;
      } else if (recordingAccepted) {
        data = [...coordinates, startPoint];
      }
    }
    return data;
  }, [coordinates, recordingAccepted]);

  const onSubmit: Submit = async data => {
    setLoading(true);
    await apiService
      .registerFarm({
        id: Math.round(100000 + Math.random() * 900000),
        label: data.farmLabel,
        size: Math.floor(size),
        uuid: `${Date.now() + parseInt(USER_ID)}`,
        ownerId: parseInt(USER_ID),
        sizeUnit: 'Acres',
      })
      .then(async response => {
        console.log(response.data, response.status);
        if (response.status === 200) {
          showToast({
            type: 'success',
            text1: 'Your farm was register',
            text2: `Congratulation your farm, ${data.farmLabel} was registered successfully`,
          });
        }
      })
      .catch(err => {
        console.log(err.response);
        showToast({
          type: 'error',
          text1: 'Fail to register farm',
          text2:
            'We are sorry but we were unable to register your farm at this time please try again later',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    let locationTrackingTimer: number;
    if (recording) {
      // @ts-ignore
      locationTrackingTimer = setInterval(() => {
        getCurrentPosition(coords => {
          setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
          const newPoints = [
            ...coordinates,
            [coords.longitude, coords.latitude],
          ];
          setCoordinates(newPoints);
        });
      }, 2000);
    } else {
      // @ts-ignore
      clearInterval(locationTrackingTimer);
    }
    return () => {
      clearInterval(locationTrackingTimer);
      stopListeningToLocationChanges();
    };
  }, [coordinates, recording]);

  useEffect(() => {
    if (coordinates.length > 2) {
      const areaSize = area({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          // @ts-ignore
          coordinates: [polygonData()],
        },
      });
      setSize(convertArea(areaSize, 'acres'));
    }
  }, [coordinates]);

  const handleCenter = () => {
    getCurrentPosition(coords => {
      setPosition({latitude: coords.latitude, longitude: coords.longitude});
    });
    mapRef.current?.getCenter();
  };
  const startRecording = () => {
    setRecording(!recording);
  };

  useEffect(() => {
    handleCenter();
  }, [coordinates]);

  const submitForm = handleSubmit(onSubmit);
  return {
    control,
    submitForm,
    isLoading,
    setLoading,
    coordinates,
    setCoordinates,
    register,
    errors,
    setSize,
    size,
    recording,
    setRecording,
    recordingAccepted,
    setRecordingAccepted,
    warn,
    setWarn,
    navigation,
    position,
    setPosition,
    mapRef,
    polygonData,
    startRecording,
  };
};
