import axios from 'axios';
import { TokenService } from './auth/storage.service';

export const ApiService = {
  init(baseURL: string) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    axios.defaults.headers.common.Authorization = TokenService.getToken();
    axios.defaults.headers.common['Content-Type'] =
      'application/json; charset=UTF-8';
  },

  removeHeader() {
    axios.defaults.headers.common.Authorization = '';
  },

  get(resource: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(resource)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error.response.data.message);
        });
    });
  },

  post(resource: string, data: any, headers?: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(resource, data, { headers })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          if (error && error.response && error.response.data) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
  },

  put(resource: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .put(resource, data)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error.response.data.message);
        });
    });
  },

  delete(resource: string) {
    return new Promise((resolve, reject) => {
      axios
        .delete(resource)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error.response.data.message);
        });
    });
  },
};
