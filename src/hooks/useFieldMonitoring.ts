import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {schema} from 'src/screens/field-monitoring/field-monitoring.schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'src/services/navigation/types';
import {useFarmList} from 'src/hooks/useFarmList';

export interface FarmHarvestFormData {
  crop: string;
  rain: string;
}
export type MonitoringScreenRouteProp = RouteProp<
  RootStackParamList,
  'fieldMonitoring'
>;
export type Submit = SubmitHandler<FarmHarvestFormData>;
export const useFieldMonitoring = () => {
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();

  const route = useRoute<MonitoringScreenRouteProp>();
  const {farmId} = route.params;

  const {farms} = useFarmList();
  const [farm, setFarm] = useState(
    farms.find(currentFarm => currentFarm.id === farmId),
  );

  useEffect(() => {
    setFarm(farms.find(currentFarm => currentFarm.id === farmId));
  }, [farmId, farms]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FarmHarvestFormData>({
    resolver: yupResolver(schema),
    defaultValues: {crop: '', rain: ''},
  });
  const onSubmit: Submit = data => {
    setLoading(true);
    console.log(data);
  };
  const submitForm = handleSubmit(onSubmit);
  return {
    control,
    submitForm,
    isLoading,
    errors,
    farmId,
    farm,
    goBack: navigation.goBack,
  };
};
