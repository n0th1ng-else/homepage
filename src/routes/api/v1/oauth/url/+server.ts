import { error, json } from '@sveltejs/kit';
import { getAuthRedirectUrl } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url: urlData }) => {
	const state = urlData.searchParams.get('state');
	if (!state) {
		error(400, 'state s not provided');
	}

	const url = getAuthRedirectUrl(urlData.origin, state);
	return json({
		url: url.toString()
	});
};
