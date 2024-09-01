import { error } from '@sveltejs/kit';
import { Logger } from '$lib/common/log';
import { getProfile } from '$lib/common/api';
import { sortArticlesByDate } from '$lib/common/date';
import { getAllArticles } from '$lib/server/articles';
import { generateRss } from '$lib/server/rss';
import { getXMLHeaders } from '$lib/server/xml';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url: urlData }) => {
	const logger = new Logger('rss');
	const url = urlData.origin;

	const articles = sortArticlesByDate(getAllArticles());

	try {
		const profile = await getProfile(url);
		return new Response(generateRss(url, articles, profile.image), {
			headers: getXMLHeaders()
		});
	} catch (err) {
		logger.error('Unable to fetch profile', err);
		error(500, 'Something went wrong');
	}
};
