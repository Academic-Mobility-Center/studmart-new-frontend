import { OptionsType, deleteCookie, getCookie, setCookie } from 'cookies-next';

const TOKEN_KEY = 'auth_token';

export const getAuthToken = (options?: OptionsType) => {
	return getCookie(TOKEN_KEY, options);
};

export const setAuthToken = (token: string, options?: OptionsType) => {
	setCookie(TOKEN_KEY, token, {
		...options,
		maxAge: 60 * 60 * 24 * 7,
		path: '/',
	});
};

export const removeAuthToken = (options?: OptionsType) => {
	deleteCookie(TOKEN_KEY, options);
};

export const verifyToken = async (options?: OptionsType) => {
	const token = getAuthToken(options);
	if (!token) return false;

	try {
		const response = await fetch('/api/auth/verify', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.ok;
	} catch (error) {
		console.log(error);
		return false;
	}
};
