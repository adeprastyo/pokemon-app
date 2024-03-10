import axios from "axios";

const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "https://pokeapi.co/api/v2/";

  return axiosConfig;
});

export default axiosWithConfig;
