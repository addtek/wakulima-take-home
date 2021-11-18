import * as Yup from 'yup';

export const schema = Yup.object().shape({
  farmLabel: Yup.string().email().required(),
});
