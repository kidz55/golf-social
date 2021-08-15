import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://locahost:9000/',
  headers: { Pragma: 'no-cache' },
});

export default axiosInstance;
