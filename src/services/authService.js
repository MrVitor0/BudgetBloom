import PurpleInterceptor from '../config/interceptor';
import jwtDecode from 'jwt-decode';

export default {
  async login(email, password) {
    try {
      const response = await PurpleInterceptor.post('/api/auth/login', { email, password });
      if (response.status === 200) {
        const token = response.data?.token;
        return token;
      } else {
        throw new Error(response.data?.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },


  isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
  },
  storeTokenLocally(token) {
    localStorage.setItem('USER_AUTH_KEY', token);
    localStorage.setItem('IS_AUTHENTICATED_KEY', true);
  },
  storeTokenSession(token) {
    sessionStorage.setItem('USER_AUTH_KEY', token);
    sessionStorage.setItem('IS_AUTHENTICATED_KEY', true);
  },
};
