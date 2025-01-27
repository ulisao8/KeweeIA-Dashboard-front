<script setup>
import {onBeforeMount, ref} from 'vue'
import {useAuthStore} from "@/store/auth_store.js";
import CustomModal from "@/components/CustomModal.vue";
import ApiConstants from "@/constants/api_constants.js";
import {useRouter} from "vue-router";

const router = useRouter()
const authStore = useAuthStore();
const isOpenLogOutModal = ref(false)

const handleLogOut = () => {
  authStore.logOut();
  closeModal()

  return router.push({name: 'login'})
}

const openCloseLogOutModal = (openModal) => {
  isOpenLogOutModal.value = openModal
}

const closeModal = () => {
  isOpenLogOutModal.value = false
}

onBeforeMount(() => {
  authStore.loadAuthSession()
})

</script>

<template>
  <div class="flex flex-row w-full">
    <div id="hs-offcanvas-example" class="h-screen top-0 start-0 bottom-0 w-64 bg-dark pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0" role="dialog" tabindex="-1" aria-label="Sidebar">
      <nav class="mx-auto hs-accordion-group p-6 w-full flex flex-col items-center space-y-6 text-darker" data-hs-accordion-always-open>
        <div v-if="authStore.photoURL">
          <img :src="authStore.photoURL" alt="" class="object-cover rounded-full h-24 w-24">
        </div>
        <ul class="space-y-1.5">
          <li>
            <router-link v-if="authStore.isAdmin" :to="{name: ApiConstants.FILES_UPLOAD}" class="transition-colors hover:bg-primary-light flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg" href="#">
              <svg height="20" viewBox="0 0 1792 1792" width="20" fill="#545454" xmlns="http://www.w3.org/2000/svg"><path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"/></svg>
              Subir archivos
            </router-link>
          </li>

          <li>
            <router-link v-if="authStore.isAuthenticated" :to="{name: ApiConstants.FILES_GET}" class="transition-colors hover:bg-primary-light flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg" href="#">
              <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Ver archivos
            </router-link>
          </li>

          <li>
            <router-link v-if="authStore.isAdmin" :to="{name: ApiConstants.GET_USERS}" class="transition-colors hover:bg-primary-light flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg" href="#">
              <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Ver usuarios
            </router-link>
          </li>

          <li>
            <router-link v-if="authStore.isAdmin" :to="{name: ApiConstants.CREATE_USERS}" class="transition-colors hover:bg-primary-light flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg" href="#">
              <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Crear usuarios
            </router-link>
          </li>

          <li v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="transition-colors hover:bg-primary-light flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg" href="#">
              <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Iniciar sesión
            </router-link>
          </li>

          <li v-else>
            <button @click="openCloseLogOutModal(true)" class="transition-colors hover:bg-primary-light flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg">
              <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <CustomModal v-if="isOpenLogOutModal" @close-modal="closeModal" @action="handleLogOut" content="Estás seguro que deseas cerrar sesión" title="Cerrar sesión"/>
    <div class="w-full">
      <RouterView/>
    </div>
  </div>


</template>

<style scoped>

</style>