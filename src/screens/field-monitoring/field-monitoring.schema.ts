import * as Yup from 'yup';

export const schema = Yup.object().shape({
  crop: Yup.string(),
  rain: Yup.string(),
});
