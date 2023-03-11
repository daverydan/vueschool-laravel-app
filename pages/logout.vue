<script setup>
  import axios from 'axios'
  axios.post('/logout')
  useRouter().replace('/login')
</script>

<template>
  <div>Logging Out...</div>
</template>
