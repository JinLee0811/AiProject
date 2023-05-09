import axios from 'axios';
import { SERVER_BASE_URL } from '../config/Server';

export const api = axios.create({
  baseURL: SERVER_BASE_URL,
});
