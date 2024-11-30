import { backendUrl } from '../constants/backendUrl';

import axios from 'axios';

axios.defaults.withXSRFToken = true;

export const api = axios.create({
  withCredentials: true,
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});
