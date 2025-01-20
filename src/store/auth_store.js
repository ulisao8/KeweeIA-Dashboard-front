import { defineStore } from 'pinia';
import { AuthService } from '@/services/auth_service.js';
import RoleConstants from "@/constants/role_constants.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        isAdmin: false,
        photoURL : "",
        email: ""
    }),
    actions: {
        loadAuthSession() {
            const token = AuthService.getToken();
            const role = AuthService.getRole();
            const photoUrl = AuthService.getPhotoURL()
            const email = AuthService.getEmail()

            this.isAuthenticated = !!token;
            this.isAdmin = role === RoleConstants.ROLE_ADMIN;
            this.photoURL = photoUrl
            this.email = email
        },
        logIn(token, role, email, photoURL) {
            AuthService.setSession(token, role, email);
            AuthService.setPhotoURL(photoURL)
            AuthService.setEmail(email)

            this.isAuthenticated = true;
            this.isAdmin = role === RoleConstants.ROLE_ADMIN;
            this.photoURL = photoURL
            this.email = email
        },
        logOut() {
            AuthService.clearSession();
            this.isAuthenticated = false;
            this.isAdmin = false;
            this.photoURL = ""
        },
    },
});
