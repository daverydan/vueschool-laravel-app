<script setup lang="ts">
  import type { FormKitNode } from "@formkit/core";
  import type { RegisterPayload } from "@/types";

  definePageMeta({
    layout: "centered",
    middleware: ["guest"],
  });

  const { register } = useAuth();

  const handleRegister = async (payload: RegisterPayload, node?: FormKitNode) => {
    try {
      await register(payload);
    } catch (error) {
      handleInvalidForm(error, node);
    }
  }
</script>

<template>
  <div class="register">
    <h1>Register</h1>
    <FormKit type="form" @submit="handleRegister">
      <FormKit
        label="Name"
        name="name"
        type="text"
      />
      <FormKit
        label="Email"
        name="email"
        type="text"
      />
      <FormKit
        label="Password"
        name="password"
        type="password"
        validation="required"
      />
      <FormKit
        label="Confirm Password"
        name="password_confirmation"
        type="password"
        validation="required|confirm:password"
      />
    </FormKit>

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>
