<script setup>

import {FileService} from "@/services/file_service.js";
import {computed, ref} from "vue";
import {AuthService} from "@/services/auth_service.js";
import router from "@/router/router.js";
import ApiConstants from "@/constants/api_constants.js";
import {UserService} from "@/services/user_service.js";
import VueSelect from "vue3-select-component";
import ErrorMessageBanner from "@/components/ErrorMessageBanner.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

const file = ref(null)
const fileName = ref('')
const emailUser = ref('')
const fileInput = ref(null);
const users = ref(null)
const userSelected = ref()
const fileErrorMessage = ref('')
let timeoutId = null;
const timeOut = 500

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0]

  if (selectedFile) {
    const fileName = selectedFile.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    if (fileExtension === 'pdf') {
      fileErrorMessage.value = ''
      file.value = selectedFile;
    } else {
      fileErrorMessage.value = "Solo se admiten archivos .pdf"
      file.value = null;
    }
  }
}

const triggerFileInput = () => {
  fileInput.value.click();
};

const getUserByAdmin = async () => {

  if(timeoutId) {
    clearTimeout(timeoutId)
  }

  users.value = null

  timeoutId = setTimeout(async () => {
    const response = await UserService.getUsersByAdmin(emailUser.value)
    const data = response.data.data

    if (!data) {
      return
    }

    users.value = data.map(user => {
      return {
        label: user.name,
        value: user.email
      }
    })
  }, timeOut)
}

const uploadFile = async () => {

  if (!file.value) {
    alert('Por favor selecciona un archivo');
    return;
  }

  const email = AuthService.getEmail();
  const formData = new FormData();
  formData.append('file', file.value);
  formData.append('name', fileName.value)
  formData.append('email', userSelected.value)

  await FileService.uploadFile(formData);
  return router.push({name: ApiConstants.FILES_GET })
}

const validateForm = computed(() => {
  return fileName.value != null &&
      userSelected.value != null &&
      file.value != null
})

</script>

<template>

  <div class="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 items-center">
    <div class="sm:max-w-lg w-full p-10 bg-dark rounded-xl shadow-md">
      <div class="text-center">
        <h2 class="mt-5 text-3xl font-bold text-gray-900">
          Cargar archivos
        </h2>
      </div>
      <form class="mt-8 space-y-3" @submit.prevent="uploadFile">
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Nombre del archivo</label>
          <input v-model="fileName" class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
        </div>

        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Buscar usuario</label>
          <input @keydown="getUserByAdmin" v-model="emailUser" class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
        </div>

        <div class="grid grid-cols-1 space-y-2" v-if="users">
          <VueSelect
              placeholder="Selecciona un usuario"
              :options="users"
              v-model="userSelected"
          />
        </div>

        <ErrorMessageBanner
            v-if="!users && emailUser"
            error-message="No hay resultados"
            text-color="text-red-400"
            background-color="bg-gray-200"
        />

        <div class="grid grid-cols-1 space-y-2" v-show="!file">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Adjuntar Documento</label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col rounded-lg border-4 border-dashed border-darker w-full h-60 p-10 group text-center">
              <span class="h-full w-full text-center flex flex-col items-center justify-center">
                <span class="pointer-none text-gray-500 "><span class="text-sm">Arrastra y suelta</span> tus archivos aquí <br /> or <a href="" id="" class="text-blue-600 hover:underline">selecciona un archivo</a> de tu computadora</span>
              </span>
              <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload">
            </label>
          </div>
        </div>
        <div v-if="file" class="text-sm text-gray-400 space-y-2">
          <p>
            Archivo cargado exitosamente!!
          </p>
          <div class="text-gray-500 space-x-4">
            <span>
              {{file.name}}
            </span>
            <button @click.prevent="triggerFileInput" type="button" class="rounded-md px-4 py-1 bg-green-400 text-white">
              Subir otro archivo
            </button>
          </div>
        </div>

        <ErrorMessageBanner :error-message="fileErrorMessage" text-color="text-red-500"/>

        <p class="text-sm text-gray-300">
          <span>Tipos de archivo: pdf</span>
        </p>
        <div>
          <ButtonPrimary :disabled="!validateForm" text="Subir"/>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>

</style>