import Axios, {AxiosError, AxiosInstance} from 'axios';

import {showToast} from 'src/components/Toast/toast';

import config from 'src/config';

const errorHandler = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 401) {
      showToast({
        type: 'error',
        text1: 'Your session has expired',
        text2: 'unauthorized',
      });
    }
  }

  return Promise.reject({...error});
};

export const buildAxiosInstance = (): AxiosInstance => {
  const httpClient = Axios.create({
    baseURL: `${config.api.protocol}://${config.api.host}`,
    headers: {apikey: `${config.api.apikey}`},
  });
  httpClient.interceptors.response.use(res => res, errorHandler);
  return httpClient;
};
