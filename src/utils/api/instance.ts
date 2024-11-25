import { backendUrl } from '../constants/backendUrl';

import axios from 'axios';

export const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true
  }
});
