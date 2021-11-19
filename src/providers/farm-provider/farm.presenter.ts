import {useState, useCallback, useEffect} from 'react';
import {FarmData} from 'src/types/farm-field-data';
import {API} from 'src/services/API';

export const useFarmProvider = () => {
  const apiService = API.getInstance();
  const [farms, setFarms] = useState<FarmData[]>([]);
  const [offlineFarms, setOfflineFarms] = useState<FarmData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedFarms, setSelectedFarms] = useState<number[]>([]);
  const [warn, setWarn] = useState(false);

  const removeFarmFromSelection = useCallback(
    (id: number) => {
      setSelectedFarms(selectedFarms.filter(farm => farm !== id));
    },
    [selectedFarms],
  );
  const getFarms = async () => {
    await apiService.listFarms().then(res => {
      setFarms(res);
    });
  };
  const deleteFarm = async () => {
    if (selectedFarms.length) {
      setDeleting(true);
      await apiService
        .deleteFarm(selectedFarms)
        .then(async _res => {
          await getFarms();
          setSelectedFarms([]);
          setDeleting(false);
        })
        .finally(() => setDeleting(false));
    }
  };
  const selectFarm = useCallback(
    (id: number) => {
      setSelectedFarms([...selectedFarms, id]);
    },
    [selectedFarms],
  );
  useEffect(() => {
    getFarms();
  }, []);

  return {
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
  };
};
