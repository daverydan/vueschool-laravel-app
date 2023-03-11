import axios from "axios"

export default defineNuxtPlugin(async (nuxtApp) => {
	axios.defaults.baseURL = "http://localhost:84";
	axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.post['Accept'] = 'application/json';
	axios.defaults.withCredentials = true;

	await axios.get("/sanctum/csrf-cookie")
})
