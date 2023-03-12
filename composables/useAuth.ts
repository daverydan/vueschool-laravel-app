import axios from "axios";

interface User {
	created_at: Date;
	email: string;
	email_verified_at?: Date;
	id: number;
	name: string;
	two_factor_confirmed_at?: Date;
	two_factor_recovery_codes?: number;
	two_factor_secret?: string;
	updated_at: Date;
}

const user = ref<User | null>(null);

export const useAuth = () => {
	// User
	async function getUser(): Promise<User | null> {
		if (user.value) return user.value;
		try {
			const res = await axios.get('/user');
			const user = res.data;
			return {
				...user,
				created_at: new Date(user.created_at),
				updated_at: new Date(user.updated_at),
				email_verified_at: user. email_verified_at ? new Date(user.updated_at) : null,
				two_factor_confirmed_at: user. two_factor_confirmed_at
					? new Date(user.two_factor_confirmed_at)
					: null,
			}
		} catch (error) {
			return null;
		}
	}
	async function initUser() {
		user.value = await getUser()
	}

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
		await axios.post('/logout')
		user.value = null;
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
		initUser,
		login,
		logout,
		register,
		user,
	}
}
