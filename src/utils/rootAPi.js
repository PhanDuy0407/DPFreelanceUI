import axios from 'axios'

// Create an Axios instance
const rootApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 1000,
});

// Add a request interceptor
rootApi.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
);

export default rootApi