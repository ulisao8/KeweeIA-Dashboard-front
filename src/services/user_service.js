import apiClient from "@/services/axios.js";
import ApiConstants from "@/constants/api_constants.js";
import {AuthService} from "@/services/auth_service.js";

export const UserService = {
    async createUser(email, password, name) {
        try {
            const data = {
                email,
                password,
                name
            }

            return await
                apiClient.post(`/${ApiConstants.USERS}/create`, data, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization" : `Bearer ${AuthService.getToken()}`
                    }
                })
        } catch (e) {
            return false
        }
    },
    async getAllUsersByAdmin () {
        return await
            apiClient.get(`/${ApiConstants.USERS}/admin`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${AuthService.getToken()}`
                }
            })
    },
    async getUsersByAdmin (name) {
        return await
            apiClient.get(`/${ApiConstants.USERS}/myUsers`, {
                params : {
                  name
                },
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${AuthService.getToken()}`
                }
            })
    },
    async deleteUser(email) {
        try {
            return await
                apiClient.post(`/${ApiConstants.USERS}/delete`, {
                    email
                }, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization" : `Bearer ${AuthService.getToken()}`
                    }
                })
        } catch (e) {

        }
    }
}