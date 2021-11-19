import * as Yup from 'yup';

export const schema = Yup.object().shape({
  crop: Yup.string().required(),
  year: Yup.string().required(),
  season: Yup.string().required(),
  quantity: Yup.number().required(),
  unit: Yup.string().required(),
});
