import axios from 'axios';
import {baseURL} from '../config/baseURL';

export const instance = axios.create({
  baseURL,
  withCredentials: true,
});
