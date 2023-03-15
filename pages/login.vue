<script setup lang="ts">
import { AxiosError } from "axios";

  definePageMeta({
    layout: "centered",
    middleware: ["guest"],
  });

  const { login } = useAuth();

  const form = ref({
    email: "",
    password: "",
  })

  const errors = ref({
    email: [],
    password: [],
  })

  const handleLogin = async () => {
    try {
      await login(form.value);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  }
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label>
        <div>Email</div>
        <input v-model="form.email" type="text" />
        <div v-for="error in errors.email" :key="error" class="text-red-600 p-1">
          {{ error }}
        </div>
      </label>

      <label>
        <div>Password</div>
        <input v-model="form.password" type="password" />
        <div v-for="error in errors.password" :key="error" class="text-red-600 p-1">
          {{ error }}
        </div>
      </label>
      <button class="btn">Login</button>
    </form>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
