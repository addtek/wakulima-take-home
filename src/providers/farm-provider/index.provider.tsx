import React from 'react';
import {FarmContext} from './farm.context';
import {FarmProviderProps} from './farm.context.types';
import {useFarmProvider} from './farm.presenter';

export const FarmProvider = ({
  children,
}: FarmProviderProps): React.ReactElement => {
  const {
    farms,
    setFarms,
    refreshing,
    setRefreshing,
    deleting,
    setDeleting,
    sending,
    setSending,
    removeFarmFromSelection,
    selectFarm,
    offlineFarms,
    setOfflineFarms,
    selectedFarms,
    getFarms,
    deleteFarm,
    warn,
    setWarn,
  } = useFarmProvider();

  return (
    <FarmContext.Provider
      value={{
        farms,
        setFarms,
        refreshing,
        setRefreshing,
        deleting,
        setDeleting,
        sending,
        setSending,
        removeFarmFromSelection,
        selectFarm,
        offlineFarms,
        setOfflineFarms,
        selectedFarms,
        getFarms,
        deleteFarm,
        warn,
        setWarn,
      }}>
      {children}
    </FarmContext.Provider>
  );
};
