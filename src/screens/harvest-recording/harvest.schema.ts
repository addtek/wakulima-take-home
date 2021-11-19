import * as Yup from 'yup';

export const schema = Yup.object().shape({
  farmLabel: Yup.string().required(),
  crop: Yup.string().required(),
  year: Yup.string().required(),
  season: Yup.string().required(),
  quantity: Yup.number().required(),
  unit: Yup.string().required(),
});
