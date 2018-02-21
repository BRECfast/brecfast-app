import axios from 'axios';

import {BASE_URL} from '../util/constants';

export const config = {
  baseURL: `${BASE_URL}/api/v1/`,
  timeout: 10000,
};

export const instance = axios.create(config);

const helper = {
  async get(url, params) {
    const {data} = await instance.get(url, {params});
    return data;
  },
  async post(url, payload) {
    const {data} = await instance.post(url, payload);
    return data;
  },
  async put(url, ...rest) {
    const {data} = await instance.put(url, ...rest);
    return data;
  },
  async delete(url, ...rest) {
    const {data} = await instance.delete(url, ...rest);
    return data;
  },
};

export default helper;
