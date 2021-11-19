import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {schema} from 'src/screens/harvest-recording/harvest.schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {showToast} from 'src/components/Toast/toast';
import {API} from 'src/services/API';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'src/services/navigation/types';

export interface FarmHarvestFormData {
  crop: string;
  year: string;
  season: string;
  quantity: string;
  unit: string;
}
export type Submit = SubmitHandler<FarmHarvestFormData>;
export type HarvestScreenRouteProp = RouteProp<
  RootStackParamList,
  'recordHarvest'
>;

export const useRecordFarmHarvest = () => {
  const route = useRoute<HarvestScreenRouteProp>();
  const {farmId} = route.params;
  const apiService = API.getInstance();
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FarmHarvestFormData>({
    resolver: yupResolver(schema),
    defaultValues: {crop: '', year: '', season: '', quantity: '', unit: ''},
  });
  const onSubmit: Submit = async data => {
    setLoading(true);
    await apiService
      .recordHarvest({
        id: Math.round(100000 + Math.random() * 900000),
        cropLabel: data.crop,
        cropId: 1,
        quantity: parseInt(data.quantity),
        quantityUnit: data.unit,
        seasonId: 1,
        seasonLabel: data.season,
        farmId: farmId,
        userType: 'string',
      })
      .then(async response => {
        console.log(response.data, response.status);
        if (response.status === 200) {
          showToast({
            type: 'success',
            text1: 'Your harvest was register',
            text2: 'Congratulation your harvest was record successfully',
          });
        }
      })
      .catch(err => {
        console.log(err.response);
        showToast({
          type: 'error',
          text1: 'Fail to register farm',
          text2:
            'We are sorry but we were unable to record your harvest at this time please try again later',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const submitForm = handleSubmit(onSubmit);
  return {
    control,
    submitForm,
    isLoading,
    errors,
    farmId,
  };
};
