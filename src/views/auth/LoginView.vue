<script setup>

import {AuthService} from "@/services/auth_service.js";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/auth_store.js";
import ApiConstants from "@/constants/api_constants.js";
import ErrorMessageBanner from "@/components/ErrorMessageBanner.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

const router = useRouter();
const authStore = useAuthStore()

const loginForm = ref({
  email: null,
  password: null
})

const errorMessage = ref('')

const loginFormValidated = computed(() => {
  const validated = loginForm.value.email && loginForm.value.password

  if (validated) {
    errorMessage.value = ''
  }

  return validated
})

const handleLogin = async () => {
  const data = await AuthService.login(loginForm.value.email, loginForm.value.password)

  if (data.code === "auth/invalid-credential" ||
      data.code === "auth/wrong-password" ||
      data.code === "auth/user-not-found") {
    loginForm.value = {
      email: null,
      password: null
    }

    errorMessage.value = 'Credenciales incorrectas'

    return ;
  }

  const response = await AuthService.getClaims(loginForm.value.email)
  const metaData = response.data.data

  authStore.logIn(data.user.accessToken, metaData.role, loginForm.value.email, metaData.photoURL)

  return router.push({name: ApiConstants.FILES_GET});
}
</script>

<template>

  <section class="bg-white">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full rounded-xl shadow-md md:mt-0 sm:max-w-md xl:p-0 bg-dark text-darker">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
            Iniciar sesión
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium">Ingresa tu correo electrónico</label>
              <input
                  class="bg-gray-50 border border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  type="email"
                  placeholder="Correo electrónico"
                  v-model="loginForm.email"
                  required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium">Ingresa tu contraseña</label>
              <input
                  class="bg-gray-50 border border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  type="password"
                  name="password"
                  placeholder="Password"
                  v-model="loginForm.password"
                  required>
            </div>
            <ErrorMessageBanner :error-message="errorMessage" text-color="text-white"/>
            <div>
              <ButtonPrimary text="Iniciar sesión" :disabled="!loginFormValidated"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>