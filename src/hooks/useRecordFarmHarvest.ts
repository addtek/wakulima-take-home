import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {schema} from 'src/screens/harvest-recording/harvest.schema';
import {yupResolver} from '@hookform/resolvers/yup';

export interface FarmHarvestFormData {
  crop: string;
  year: string;
  season: string;
  quantity: string;
  unit: string;
}
export type Submit = SubmitHandler<FarmHarvestFormData>;
export const useRecordFarmHarvest = () => {
  const [isLoading, setLoading] = useState(false);
  const {control, handleSubmit} = useForm<FarmHarvestFormData>({
    resolver: yupResolver(schema),
    defaultValues: {crop: '', year: '', season: '', quantity: '', unit: ''},
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
  };
};
