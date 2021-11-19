import React from 'react';
import {MonitoringContext} from './monitoring.context';
import {MonitoringProviderProps} from './monitoring.context.types';
import {useMonitoringProvider} from './monitoring.presenter';

export const MonitoringProvider = ({
  children,
}: MonitoringProviderProps): React.ReactElement => {
  const {
    weatherHistory,
    setWeatherHistory,
    harvestHistory,
    setHarvestHistory,
    loading,
    setLoading,
    selectedCrop,
    setCrop,
  } = useMonitoringProvider();

  return (
    <MonitoringContext.Provider
      value={{
        weatherHistory,
        setWeatherHistory,
        harvestHistory,
        setHarvestHistory,
        loading,
        setLoading,
        selectedCrop,
        setCrop,
      }}>
      {children}
    </MonitoringContext.Provider>
  );
};
