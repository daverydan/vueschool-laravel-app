<script setup lang="ts">
  import type { FormKitNode } from "@formkit/core";
  import type { LoginPayload } from "@/types";

  definePageMeta({
    layout: "centered",
    middleware: ["guest"],
  });

  const { login } = useAuth();

  const handleLogin = async (payload: LoginPayload, node?: FormKitNode) => {
    try {
      await login(payload);
    } catch (error) {
      handleInvalidForm(error, node);
    }
  }
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <FormKit type="form" submit-label="Login" @submit="handleLogin">
      <FormKit label="Email" name="email" type="email" />
      <FormKit label="Password" name="password" type="password" />
    </FormKit>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register">
        Register now!
      </NuxtLink
      >
    </p>
  </div>
</template>
