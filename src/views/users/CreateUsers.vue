<script setup>
import {UserService} from "@/services/user_service.js";
import {computed, ref} from "vue";
import ApiConstants from "@/constants/api_constants.js";
import {useRouter} from "vue-router";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

const router = useRouter();

const createUserForm = ref({
  name: null,
  email: null,
  password: null,
  password_confirm: null
})

const errorMessage = ref('')

const handleCreateUser = async () => {
  const formValue = createUserForm.value
  const data = await UserService.createUser(
      formValue.email,
      formValue.password,
      formValue.name
  )

  if (data.data.error) {
    createUserForm.value = {
      email: null,
      password: null,
      name: null
    }

    errorMessage.value = data.data.error

    return ;
  }

  return router.push({name: ApiConstants.FILES_GET});
}

const validateForm = computed(() => {

  return createUserForm.value.name != null
      && createUserForm.value.email != null
      && passwordsMatch.value === true
})

const passwordsMatch = computed(() => {

  const password = createUserForm.value.password
  const passwordConfirm = createUserForm.value.password_confirm

  if (passwordConfirm && (password !== passwordConfirm)) {
    errorMessage.value = 'Las contraseñas no coinciden'
  } else {
    errorMessage.value = ''
  }

  if (!passwordConfirm || !password) {
    return false
  }

  return createUserForm.value.password === createUserForm.value.password_confirm
})

</script>

<template>
  <div class="mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
    <form @submit.prevent="handleCreateUser" class="w-full max-w-sm mx-auto shadow-md sm:max-w-lg p-10 bg-dark rounded-xl">
      <div class="text-center mb-8">
        <h2 class="mt-5 text-3xl font-bold text-gray-900">
          Crear usuarios
        </h2>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nombre</label>
        <input v-model="createUserForm.name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
               type="text" id="name" name="name" placeholder="John Doe">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Correo electrónico</label>
        <input v-model="createUserForm.email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
               type="email" id="email" name="email" placeholder="john@example.com">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Contraseña</label>
        <input v-model="createUserForm.password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
               type="password" id="password" name="password" placeholder="********">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">Confirmar Contraseña</label>
        <input v-model="createUserForm.password_confirm" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
               type="password" id="confirm-password" name="confirm-password" placeholder="********">
      </div>
      <ButtonPrimary text="Registrar usuario" :disabled="!validateForm"/>
      <p v-if="errorMessage" class="mt-2 text-red-500 bg-red-500/40 rounded-md font-semibold p-1.5">
        {{errorMessage}}
      </p>
    </form>
  </div>
</template>

<style scoped>

</style>