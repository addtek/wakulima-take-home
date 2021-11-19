import React from 'react';
import {FarmData} from 'src/types/farm-field-data';

export interface FarmProviderProps {
  children: React.ReactElement;
}

export interface FarmProviderContext {
  farms: FarmData[];
  setFarms: (data: FarmData[]) => void;
  refreshing: boolean;
  setRefreshing: (state: boolean) => void;
  deleting: boolean;
  warn: boolean;
  setDeleting: (state: boolean) => void;
  setWarn: (state: boolean) => void;
  sending: boolean;
  setSending: (state: boolean) => void;
  getFarms: () => void;
  deleteFarm: () => void;
  removeFarmFromSelection: (id: number) => void;
  selectFarm: (id: number) => void;
  selectedFarms: number[];
  offlineFarms: FarmData[];
  setOfflineFarms: (data: FarmData[]) => void;
}

export const defaultContext = {
  farms: [],
  setFarms: (data: FarmData[]) => data,
  refreshing: false,
  setRefreshing: (state: boolean) => state,
  deleting: false,
  setDeleting: (state: boolean) => state,
  setWarn: (state: boolean) => state,
  sending: false,
  warn: false,
  setSending: (state: boolean) => state,
  getFarms: () => null,
  deleteFarm: () => null,
  removeFarmFromSelection: (id: number) => id,
  selectFarm: (id: number) => id,
  offlineFarms: [],
  selectedFarms: [],
  setOfflineFarms: (data: FarmData[]) => data,
};
