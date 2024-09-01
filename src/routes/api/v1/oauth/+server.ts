import { error, json } from '@sveltejs/kit';
import { Logger } from '$lib/common/log';
import { ReadingListItemStateSchema } from '$lib/common/readingList';
import { getRuntimeEnvironment } from '$lib/server/env';
import { saveReadingList } from '$lib/server/readingList';
import { fetchAccessToken, fetchUserName } from '$lib/server/auth';
import type { RequestHandler } from './$types';

const SupportedFollowersSchema = ReadingListItemStateSchema;

export const GET: RequestHandler = async ({ url: urlData }) => {
	const logger = new Logger('api:oauth');
	const env = getRuntimeEnvironment();
	const code = urlData.searchParams.get('code');
	const state = urlData.searchParams.get('state');

	try {
		const accessToken = await fetchAccessToken(urlData.origin, code ?? '');
		const userName = await fetchUserName(accessToken);

		const isAuthorized = Boolean(userName) && String(userName) === env.GH_AUTHOR_LOGIN;

		if (!isAuthorized) {
			logger.warn('Not authorized', {
				expectedUserName: env.GH_AUTHOR_LOGIN,
				receivedUserName: userName
			});
			error(401, 'Not authorized');
		}
	} catch (err) {
		logger.error('Could not fetch access token or user data', err);
		error(401, 'Not authorized');
	}

	let res: Record<string, unknown> = {};
	try {
		const parsedState = decodeURIComponent(state ?? '');
		const data = SupportedFollowersSchema.parse(JSON.parse(parsedState));

		if (data.action === 'READS') {
			res = await saveReadingList(data.url, data.note);
		}
	} catch (err) {
		logger.error('Could not parse the redirect state after auth', err);
		error(400, 'Could not parse the redirect state');
	}

	return json({
		message: 'Success',
		res
	});
};
