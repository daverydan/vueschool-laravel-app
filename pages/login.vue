<script setup lang="ts">
import { AxiosError } from "axios";
import { LoginPayload } from "@/types";
import type { FormKitNode } from "@formkit/core";

  definePageMeta({
    layout: "centered",
    middleware: ["guest"],
  });

  const { login } = useAuth();

  const handleLogin = async (payload: LoginPayload, node?: FormKitNode) => {
    try {
      await login(payload);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 422) {
        // 1. array of msgs for the entire form, 2. error msg for individual fields
        node?.setErrors([], error.response.data.errors)
      }
      if (error instanceof AxiosError && error.response?.status === 429) {
        node?.setErrors(['Too many login attempts. Please try again later.'], error.response.data.errors)
      }
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
