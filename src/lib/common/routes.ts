const enum RoutePath {
	Home = '',
	Blog = 'blog',
	Projects = 'projects',
	About = 'about',
	Legal = 'legal',
	NotFound = '404',
	Rss = 'rss.xml',
	ReadingList = 'reading-list'
}

const toPath = (path?: RoutePath): string => {
	if (!path) {
		return '/';
	}

	return `/${path}`;
};

export const homeRoute = toPath(RoutePath.Home);

export const blogRoute = toPath(RoutePath.Blog);

export const newArticleRoute = `${blogRoute}/draft`;

export const projectsRoute = toPath(RoutePath.Projects);

export const aboutRoute = toPath(RoutePath.About);

export const legalRoute = toPath(RoutePath.Legal);

export const rssRoute = toPath(RoutePath.Rss);

export const notFoundRoute = toPath(RoutePath.NotFound);

export const readingListRoute = toPath(RoutePath.ReadingList);

export const toArticle = (id: string): string => `${blogRoute}/${id}`;

export const getAbsoluteArticleUrl = (host: string, slug: string): string => `${host}/blog/${slug}`;

export const getAbsoluteRssUrl = (host: string): string => `${host}${rssRoute}`;

export interface RoutePriority {
	critical: string[];
	major: string[];
	minor: string[];
	trivial: string[];
}

export const getRoutes = (internalSlugs: string[], externalSlugs: string[]): RoutePriority => {
	return {
		critical: internalSlugs.map(slug => `${blogRoute}/${slug}`),
		major: externalSlugs.map(slug => `${blogRoute}/${slug}`),
		minor: [homeRoute, blogRoute, projectsRoute, aboutRoute],
		trivial: [legalRoute, notFoundRoute]
	};
};
