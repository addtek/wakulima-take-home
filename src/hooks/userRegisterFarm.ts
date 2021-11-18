import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {schema} from 'src/screens/register-farm/register-farm.schema';
import {yupResolver} from '@hookform/resolvers/yup';

export interface FormData {
  farmLabel: string;
}
export type Submit = SubmitHandler<FormData>;
export const useRegisterFarm = () => {
  const [isLoading, setLoading] = useState(false);
  const {control, handleSubmit} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {farmLabel: ''},
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
