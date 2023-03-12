import axios from "axios";

export const useAuth = () => {
	// Login
	interface LoginPayload {
		email: string,
		password: string,
	}
	async function login(payload: LoginPayload) {
		await axios.post('/login', payload);
		useRouter().push('/me');
	}

	// Logout
	async function logout() {
		axios.post('/logout')
		useRouter().replace('/login')
	}

	// Register
	interface RegisterPayload {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	}
	async function register(payload: RegisterPayload) {
		await axios.post("/register", payload)
		useRouter().push('/me');
	}

	return {
		login,
		logout,
		register,
	}
}
