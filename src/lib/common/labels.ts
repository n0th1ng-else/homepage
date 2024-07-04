import { Position } from '$lib/browser/utils/projects';
import { isInternalArticle } from '$lib/common/articles';
import type { PublicationInfo } from '$lib/common/@types/common';

export const getPageTitle = (title: string): string => {
	const brand = 'Nothing Else';
	return title ? `${title} | ${brand}` : brand;
};

export const homeTitle = getPageTitle('Home');

export const blogTitle = getPageTitle('Blog');

export const projectsTitle = getPageTitle('Projects');

export const aboutTitle = getPageTitle('About');

export const legalTitle = getPageTitle('Legal Information');

export const newArticleTitle = getPageTitle('New Article');

export const notFoundTitle = getPageTitle('Page Not Found');

export const getServiceTitle = (article: PublicationInfo): string => {
	if (isInternalArticle(article)) {
		return '';
	}

	return article.service === 'devto' ? 'dev.to' : article.service;
};

export const getPositionTitle = (position?: Position): string => {
	switch (position) {
		case Position.Middle:
			return 'Software Engineer II';
		case Position.SeniorL1:
			return 'Senior Software Engineer I';
		case Position.Senior:
			return 'Senior Frontend Engineer';
		case Position.Fullstack:
			return 'FullStack Engineer';
		default:
			return '';
	}
};
