import apiClient from "@/services/axios.js";
import ApiConstants from "@/constants/api_constants.js";
import {useAuthStore} from "@/store/auth_store.js";
import {AuthService} from "@/services/auth_service.js";

const authStore = useAuthStore()

export const FileService = {
    async uploadFile(formData) {
        try {
            return await
                apiClient.post(`/${ApiConstants.FILES_ROUTE}/upload`, formData, {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        "Authorization" : `Bearer ${AuthService.getToken()}`
                    }
                })
        } catch (e) {
            return false
        }
    },

    async getUserFiles() {
        try {
            return await
                apiClient.get(`/${ApiConstants.FILES_ROUTE}`, {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        "Authorization" : `Bearer ${AuthService.getToken()}`
                    }
                })
        } catch (e) {
            return false
        }
    },
    async deleteFile(fileName, email) {
        try {
            const data = {
                fileName,
                email
            }

            return await
                apiClient.post(`/${ApiConstants.FILES_ROUTE}/delete`, data, {
                    headers: {
                        "Authorization" : `Bearer ${AuthService.getToken()}`
                    }
                })
        } catch (e) {
            return false
        }
    }
}