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
        // Faça uma requisição para renovar o token usando o token
        const response = await apiClient.post(`/api/auth/refresh-token`);
        const newToken = response.data.token;
        // Atualize o token no store
        store.dispatch('auth/updateToken', newToken);
        // Reenvie a requisição original com o novo token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Caso ocorra um erro ao renovar o token, faça o logout
        store.dispatch('auth/logout');
        // Redirecione para a página de login ou realize outras ações necessárias
      }
    } else {
      // Caso não haja refreshToken, faça o logout
      store.dispatch('auth/logout');
      // Redirecione para a página de login ou realize outras ações necessárias
    }
  }
  return Promise.reject(error);
});

export default apiClient;
