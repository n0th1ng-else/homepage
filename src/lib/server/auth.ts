import { z } from 'zod';
import { runRawApi } from '$lib/common/api';
import { getRuntimeEnvironment } from '$lib/server/env';

const UserSchema = z
	.object({
		login: z.string(),
		id: z.number()
	})
	.describe('GitHub user schema');

export const fetchAccessToken = async (origin: string, code: string): Promise<string> => {
	const env = getRuntimeEnvironment();
	const url = new URL('https://github.com/login/oauth/access_token');
	url.searchParams.set('redirect_uri', `${origin}/api/v1/oauth`);
	url.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
	url.searchParams.set('client_secret', env.GITHUB_SECRET);
	url.searchParams.set('code', code ?? '');

	const response = await fetch(url);
	const data = await response.text();
	const responseData = new URLSearchParams(data);
	return responseData.get('access_token') ?? '';
};

export const fetchUserName = async (accessToken: string): Promise<string> => {
	const data = await runRawApi('https://api.github.com/user', 'GET', {
		Authorization: `token ${accessToken}`
	});

	try {
		const parsed = UserSchema.parse(data);
		return parsed.login;
	} catch (err) {
		return '';
	}
};

export const getAuthRedirectUrl = (origin: string, customState: string): URL => {
	const env = getRuntimeEnvironment();
	const url = new URL('https://github.com/login/oauth/authorize');

	const redirectUrl = new URL(`${origin}/api/v1/oauth`);
	redirectUrl.searchParams.set('state', customState);

	url.searchParams.set('redirect_uri', redirectUrl.toString());
	url.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
	url.searchParams.set('scope', ['read:user'].join(' '));
	url.searchParams.set('allow_signup', String(false));
	return url;
};
