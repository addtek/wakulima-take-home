import React from 'react';

export interface MonitoringProviderProps {
  children: React.ReactElement;
}

export interface MonitoringProviderContext {
  weatherHistory: any;
  harvestHistory: any;
  selectedCrop: any;
  setCrop: (value: string) => void;
  setLoading: (value: boolean) => void;
  setWeatherHistory: (data: any) => void;
  setHarvestHistory: (data: any) => void;
  loading: boolean;
}

export const defaultContext = {
  weatherHistory: {},
  harvestHistory: {},
  setCrop: (value: string) => value,
  setWeatherHistory: (data: any) => data,
  setHarvestHistory: (data: any) => data,
  loading: false,
  selectedCrop: '',
  setLoading: (state: boolean) => state,
};
