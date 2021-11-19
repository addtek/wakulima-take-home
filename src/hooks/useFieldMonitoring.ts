import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {schema} from 'src/screens/field-monitoring/field-monitoring.schema';
import {yupResolver} from '@hookform/resolvers/yup';

export interface FarmHarvestFormData {
  crop: string;
  rain: string;
}
export type Submit = SubmitHandler<FarmHarvestFormData>;
export const useFieldMonitoring = () => {
  const [isLoading, setLoading] = useState(false);
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
  };
};
