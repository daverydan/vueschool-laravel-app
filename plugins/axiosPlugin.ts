import axios from "axios"

export default defineNuxtPlugin(async (nuxtApp) => {
	const config = useRuntimeConfig();
	axios.defaults.baseURL = `${config.public.appURL}/api`;
	axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.post['Accept'] = 'application/json';
	axios.defaults.withCredentials = true;

	axios.interceptors.response.use(
		(res) => res,
		(error) => {
			// handle session expiry
			if (
				[401, 419].includes(error.response.status)
				&& !error.request.responseURL.endsWith('/api/user')
			) {
				const { logout } = useAuth();
				logout();
			} else {
				return Promise.reject(error)
			}
		},
	);

	await axios.get("/sanctum/csrf-cookie", {
		baseURL: config.public.appURL,
	});
})
