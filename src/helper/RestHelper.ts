import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import CompHelper from './CompHelper';
// import UsersApi from '../api/suite/users/UsersApi';

interface ICallApi {
  data?: any,
  method?: any,
  params?: any,
  route?: any,
  serviceUrl?: any,
}

const axiosApiInstance = axios.create();
axiosApiInstance.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  const token = localStorage.getItem('token');
  if (error?.response?.status === 401 && !originalRequest._retry && token) {
    originalRequest._retry = true;
    // const respRefreshToken: AxiosResponse = await UsersApi.refreshToken();
    // const newToken = respRefreshToken.data?.token;
    // if (newToken) {
    //   localStorage.setItem('token', newToken);
    //   originalRequest.headers.authorization = `Bearer ${newToken}`;
    //   return axiosApiInstance(originalRequest);
    // }
    // localStorage.removeItem('token');
  }
  return Promise.reject(error);
});

const callApi = async (payload: ICallApi) => {
  const url = payload.serviceUrl + payload.route;
  let response: any = null;
  const token = localStorage.getItem('token');
  let bearerToken = '';
  if (token) {
    bearerToken = `Bearer ${token}`;
  }
  await axiosApiInstance({
    headers: {
      authorization: bearerToken,
    },
    method: payload.method,
    url,
    data: payload.data,
    params: payload.params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  })
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        response = error;
      }
    });
  return response;
};

const handleResultRequest = (result: AxiosResponse, useNotificationError = true) => {
  return new Promise((resolve, reject) => {
    if (!isSuccess(result)) {
      let message = 'Network Error';
      if (useNotificationError) {
        let title = 'Notification Error';

        if (result?.status === 400) {
          message = result?.data?.title ?? 'Message Empty';
        } else {
          message = `${message} ${result?.status}`;
        }

        if (typeof result?.data?.errors === 'object') {
          const { errors } = result.data;
          const keys = Object.keys(errors);
          title = result?.data?.title;
          message = '';
          keys.forEach((item) => {
            message += `${errors[item][0]}\n`;
          });
        }

        if (result?.status !== 401) {
          CompHelper.notificationInfo(title, message);
        }
        reject(message);
      }
    } else {
      resolve(result.data);
    }
  });
};

const isSuccess = (result: any) => {
  if (result.status >= 200 && result.status <= 299) return true;
  return false;
};

const RestHelper = {
  isSuccess,
  handleResultRequest,
  callApi,
};

export default RestHelper;
