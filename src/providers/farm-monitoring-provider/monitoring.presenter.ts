import {useState} from 'react';

export const useMonitoringProvider = () => {
  const [weatherHistory, setWeatherHistory] = useState<any>({});
  const [harvestHistory, setHarvestHistory] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setCrop] = useState('');

  return {
    weatherHistory,
    setWeatherHistory,
    harvestHistory,
    setHarvestHistory,
    loading,
    setLoading,
    selectedCrop,
    setCrop,
  };
};
