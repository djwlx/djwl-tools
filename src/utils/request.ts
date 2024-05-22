import globalConfig from '@/constants/config';
import axios from 'axios';

const request = axios.create({
  baseURL: globalConfig.serverHost,
});

export default request;
