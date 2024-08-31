import { sortArticlesByDate } from '$lib/common/date';
import { getRoutes } from '$lib/common/routes';
import { isInternalArticle } from '$lib/common/articles';
import { getAllArticles } from '$lib/server/articles';
import { getXMLHeaders } from '$lib/server/xml';
import { generateSitemap } from '$lib/server/sitemap';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url: urlData }) => {
	const url = urlData.origin;

	const articles = sortArticlesByDate(getAllArticles());
	const internal = articles.filter(article => isInternalArticle(article)).map(({ id }) => id);
	const external = articles.filter(article => !isInternalArticle(article)).map(({ id }) => id);

	const routes = getRoutes(internal, external);
	return new Response(generateSitemap(url, routes), {
		headers: getXMLHeaders()
	});
};
