import { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

export function handleInvalidForm(error: any, node?: FormKitNode) {
	if (error instanceof AxiosError && error.response?.status === 422) {
		node?.setErrors([], error.response.data.errors);
	}
	if (error instanceof AxiosError && error.response?.status === 429) {
		node?.setErrors(
			['Too many login attempts. Please try again soon.'],
			error.response.data.errors
		);
	}
}
