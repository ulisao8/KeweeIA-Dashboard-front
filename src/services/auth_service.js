import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import apiClient from "@/services/axios.js";
import ApiConstants from "@/constants/api_constants.js";

export const AuthService = {
    setSession(token, role, email) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email)
    },
    setPhotoURL(photoURL) {
      localStorage.setItem('photoURL', photoURL)
    },
    setEmail(email) {
      localStorage.setItem('email', email)
    },
    getPhotoURL() {
      return localStorage.getItem('photoURL')
    },
    getToken() {
        return localStorage.getItem('token');
    },
    getRole() {
        return localStorage.getItem('role');
    },
    getEmail() {
        return localStorage.getItem('email')
    },
    clearSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('photoURL')
    },
    async login(email, password) {
        try {
            const auth = getAuth()

            return await signInWithEmailAndPassword(auth, email, password)
        } catch (e) {
            return e
        }
    },
    async getClaims(email) {
        return apiClient.post(`/auth/${ApiConstants.LOGIN_ROUTE}`, { email })
    }
};