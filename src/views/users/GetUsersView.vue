<script setup>
import {useAuthStore} from "@/store/auth_store.js";
import {UserService} from "@/services/user_service.js";
import {onMounted, ref} from "vue";
import ApiConstants from "@/constants/api_constants.js";
import CustomModal from "@/components/CustomModal.vue";

const authStore = useAuthStore();

const noUsersMessage = ref("")
const users = ref([])
const errorDeleteUser = ref("")
const isLoaded = ref(false)

const getUsers = async () => {
  const response = await UserService.getAllUsersByAdmin()

  if (!response) {
    isLoaded.value = true
    return
  }

  isLoaded.value = true

  users.value = response.data.data

  if (!users.value.length) {
    noUsersMessage.value = "No tienes usuarios registrados"
  }
}

const handleDelete = async (email) => {
  const deleteResponse = await UserService.deleteUser(email)

  if (!deleteResponse) {
    errorDeleteUser.value = `Intente más tarde y verifique que el usuario con el email: '${email}' exista`
    return
  }

  window.location.reload()
}

const closeModal = () => {
  errorDeleteUser.value = ""
}

onMounted(() => getUsers())

</script>

<template>
  <CustomModal :has-action="false" v-if="errorDeleteUser" @close-modal="closeModal" title="Ha ocurrido un error al eliminar el usuario" :content="errorDeleteUser"/>
  <div v-if="users.length" class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table class="w-full border-collapse bg-dark text-left text-sm text-dark">
      <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nombre</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900" v-if="authStore.isAdmin">Usuario</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Opciones</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      <tr v-for="user in users" class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="text-sm">
            <div class="font-medium text-gray-700">{{user.name}}</div>
          </div>
        </th>
        <td class="px-6 py-4" v-if="authStore.isAdmin">
          <span
              class="cursor-pointer inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
          >
              {{ user.email }}
            </span>
        </td>
        <td class="px-6 py-4">
          <div class="flex justify-start gap-4">
            <button v-if="authStore.isAdmin" @click.prevent="handleDelete(user.email)" x-data="{ tooltip: 'Delete' }">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                  x-tooltip="tooltip"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-if="isLoaded && noUsersMessage" class="min-h-screen flex items-center justify-center">
    <div class="rounded-lg shadow-lg p-5">
      <div class="flex flex-row items-center space-x-4">
        <span class="text-4xl text-darker">
          {{noUsersMessage}}
        </span>
        <svg width="80" height="80" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">

          <title/>

          <g data-name="Layer 2" id="Layer_2">

            <g id="Export">

              <path class="cls-1" d="M64,3A61,61,0,1,1,3,64,61.06,61.06,0,0,1,64,3m0-3a64,64,0,1,0,64,64A64,64,0,0,0,64,0Z"/>

              <path class="cls-1" d="M48.78,54.3l-4.53-7.84A1.5,1.5,0,0,0,41.66,48L45,53.8h-6.6a1.5,1.5,0,1,0,0,3h9A1.5,1.5,0,0,0,49,55.3s0-.07,0-.11A1.49,1.49,0,0,0,48.78,54.3Z"/>

              <path class="cls-1" d="M90.61,53.8H84L87.39,48a1.5,1.5,0,0,0-2.6-1.5L80.27,54.3a1.43,1.43,0,0,0-.19.9.34.34,0,0,0,0,.1,1.5,1.5,0,0,0,1.5,1.5h9a1.5,1.5,0,0,0,0-3Z"/>

              <path class="cls-1" d="M86.26,94.81a1.47,1.47,0,0,1-.85-.26,37.94,37.94,0,0,0-24.09-6.7A37.48,37.48,0,0,0,42.6,94.54a1.5,1.5,0,1,1-1.72-2.46,40.5,40.5,0,0,1,20.23-7.22,41,41,0,0,1,26,7.22,1.5,1.5,0,0,1-.85,2.73Z"/>

            </g>

          </g>

        </svg>
      </div>
      <router-link v-if="authStore.isAdmin" :to="{name: ApiConstants.CREATE_USERS}" class="bg-light hover:bg-light/70 my-5 w-full flex justify-center p-4  rounded-full tracking-wide
        font-semibold focus:outline-none focus:shadow-outline text-darker
        shadow-lg transition ease-in duration-300">
        Crear usuarios
      </router-link>
    </div>

  </div>
</template>

<style scoped>

</style>