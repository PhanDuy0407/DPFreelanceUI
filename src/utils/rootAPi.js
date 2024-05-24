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
    config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmMiLCJleHAiOjE3MTk2MDEzMTB9.zZqxHOtpd0FjKTtsQ0GkuUI-o7P1bJVjRxFM3db0ZKc';
    return config;
  },
);

export default rootApi