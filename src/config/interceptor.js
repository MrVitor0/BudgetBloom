import axios from 'axios';
import store from '../store';


const BASE_URL = process.env.VUE_APP_ENVIRONMENT === 'development' ? process.env.VUE_APP_JSON_SERVER : process.env.VUE_APP_API
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Tempo limite para as requisições
});

// Interceptor para adicionar o token JWT a cada requisição
apiClient.interceptors.request.use(config => {
  const token = store.state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// Interceptor para tratar erros de autenticação e renovação do JWT
apiClient.interceptors.response.use(response => {
  return response;
}, async error => {
  if (error.response && error.response.status === 401) {
    const token = store.state.auth.token;
    if (token) {
      try {
        const response = await axios.post(`${BASE_URL}/api/auth/refresh-token`, { token });
        const newToken = response.data.token;
        store.dispatch('auth/updateToken', newToken);
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        store.dispatch('auth/logout');
      }
    } else {
      store.dispatch('auth/logout');
    }
  }
  return Promise.reject(error);
});

export default apiClient;
