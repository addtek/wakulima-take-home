import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Text, Animated, Easing} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppInternetStatusViewProps} from './types';
import styles from './styles';

const DEFAULT_COMPONENT_HEIGHT = 45;

let componentHeight = 0;
export const InternetStatusView = ({
  textToDisplayOffline = 'No Internet Connection',
  textToDisplayOnline = 'Connected',
  height,
  style,
}: AppInternetStatusViewProps): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(true);
  const [isAnimating, setAnimating] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [stateChanged, setStateChanged] = useState(false);
  const [heightValue] = useState<Animated.Value>(new Animated.Value(0));
  const animateErrorView = (visibility: boolean) => {
    if (!isAnimating) {
      setAnimating(true);
      Animated.timing(heightValue, {
        toValue: componentHeight,
        easing: Easing.linear,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(heightValue, {
          toValue: visibility ? 0 : 4,
          easing: Easing.linear,
          duration: 0,
          useNativeDriver: false,
          delay: 5000,
        }).start(() => setAnimating(false));
      });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _updateConnectionStatus = (isConnected: boolean | null) => {
    if (
      !stateChanged &&
      isConnected !== isInternetReachable &&
      isConnected !== null
    ) {
      setStateChanged(true);
    }

    setIsInternetReachable(isConnected);
    animateErrorView(isConnected ?? false);
  };

  useEffect(() => {
    componentHeight =
      isInternetReachable && !isMounted
        ? 0
        : height ?? DEFAULT_COMPONENT_HEIGHT;
  }, [isMounted]);

  useEffect(() => {
    NetInfo.fetch().then(netInfoState => {
      if (
        netInfoState.isInternetReachable !== null &&
        netInfoState.isInternetReachable === false
      ) {
        _updateConnectionStatus(false);
      }
    });
    return NetInfo.addEventListener(netInfoState => {
      if (!isMounted) {
        setMounted(true);
      }
      _updateConnectionStatus(netInfoState.isInternetReachable);
    });
  }, [isMounted]);

  const errorTextContainer =
    style ??
    (isInternetReachable
      ? styles.succesTextContainer
      : styles.errorTextContainer);

  if (!stateChanged) {
    return <></>;
  }
  return (
    <Animated.View
      style={[
        styles.containerStyle,
        errorTextContainer,
        {height: heightValue, top: insets.top},
      ]}>
      {isAnimating && (
        <Text style={styles.errorTextShow}>
          {isInternetReachable ? textToDisplayOnline : textToDisplayOffline}
        </Text>
      )}
    </Animated.View>
  );
};
