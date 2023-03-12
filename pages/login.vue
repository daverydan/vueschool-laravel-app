<script setup lang="ts">
import axios from "axios";

  definePageMeta({
    layout: "centered",
  });

  const form = ref({
    email: "",
    password: "",
  })

  const login = async () => {
    await axios.post('/login', form.value);
    useRouter().push('/me');
  }
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label>
        <div>Email</div>
        <input v-model="form.email" type="text" />
      </label>

      <label>
        <div>Password</div>
        <input v-model="form.password" type="password" />
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
