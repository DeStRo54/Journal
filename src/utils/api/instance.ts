import { backendUrl } from '../constants/backendUrl';

import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.defaults.withXSRFToken = true;

// api.interceptors.request.use((config) => {
//   config.withCredentials = true;
//   return config;
// });

//потом обязательно убрать

api.interceptors.response.use(
  async (response) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
