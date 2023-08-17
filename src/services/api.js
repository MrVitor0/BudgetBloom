import axios from 'axios';

if(process.env.VUE_APP_ENVIRONMENT === 'development') {
  axios.defaults.baseURL = process.env.VUE_APP_JSON_SERVER;
} else if(process.env.VUE_APP_ENVIRONMENT === 'production') {
  axios.defaults.baseURL = process.env.VUE_APP_API;
}

// Adicionando um interceptor de solicitação
axios.interceptors.request.use(
  config => {
    // Você pode fazer alterações na configuração da solicitação aqui, se necessário
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
