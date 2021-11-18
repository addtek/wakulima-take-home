import env from 'react-native-config';

export {isTablet} from '../helpers/device';

const config = {
  api: {
    host: env.API_HOSTNAME,
    protocol: env.API_PROTOCOL,
    apikey: env.API_KEY,
    userId: env.USER_ID,
    timeout: 20000,
  },
};

const API_HOSTNAME = config.api.host;
const API_PROTOCOL = config.api.protocol;
const API_APP_ENV = config.api.host;
const API_KEY = config.api.apikey;
const USER_ID = config.api.userId;

export {API_HOSTNAME, API_APP_ENV, API_PROTOCOL, API_KEY, USER_ID};

export default config;
