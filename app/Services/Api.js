import axios from 'axios';
import { message } from 'antd';
import { configureStore } from '../Redux/store/configureStore';
import { logoutAction } from '../Redux/actions/auth';
import { debug, uri, uriDev } from '../Settings/services.json';

const store = configureStore();

export const URI = debug ? uriDev : uri;

export const API = axios.create({
  baseURL: URI
});

export const token = () => store.getState().login.token;

API.interceptors.response.use(
  response => response,
  error => {
    switch (error.response.status) {
      case 401:
        store.dispatch(logoutAction());
        console.log('intercepted, force logout');
        break;
      case 400:
      case 500:
        message.error(error.response.data.message);
        return error.response;
      default:
        console.log(error);
        return error;
    }
    return error;
  }
);

export async function login({ username, password }) {
  return await API.post(`auth`, {
    strategy: 'local',
    user_name: username,
    password
  }).then(
    response => {
      return response.data;
    },
    rejected => {
      return rejected.response;
    }
  );
}
