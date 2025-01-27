import axios from 'axios';
import {useAuthStore} from "@/store/auth_store.js";
import {AuthService} from "@/services/auth_service.js";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.request.use(
    async config => {
        const authStore = useAuthStore()
        const authToken = AuthService.getToken()

        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;

            const isTokenExpiring = checkTokenExpiry(authToken);
            if (isTokenExpiring) {
                try {
                    await authStore.logOut()
                } catch (error) {
                    throw error;
                }
            }
        }

        return config;
    },
    error => Promise.reject(error)
)

const checkTokenExpiry = (token) => {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime < 60;
}

export default apiClient;