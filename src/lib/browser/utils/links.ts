import { getUrlPrefix } from '$lib/common/api';

export const getEmail = (full = false): [string, string, string] => {
	const parts: [string, string, string] = ['srg.post', 'gmail', 'com'];
	return full ? [`${parts[0]}@${parts[1]}.${parts[2]}`, '', ''] : parts;
};

export const getXLink = (account: string): string => getUrlPrefix(`x.com/${account}`);

export const getMediumLink = (account: string): string => getUrlPrefix(`${account}.medium.com`);

export const getGithubLink = (account: string, repo?: string): string => {
	const link = getUrlPrefix(`github.com/${account}`);
	return repo ? `${link}/${repo}` : link;
};

export const getLinkedInLink = (account: string): string =>
	getUrlPrefix(`www.linkedin.com/in/${account}`);

export const getHabrLink = (account: string): string => getUrlPrefix(`habr.com/users/${account}`);

export const getDevtoLink = (account: string): string => getUrlPrefix(`www.dev.to/${account}`);

export const getEmailLink = (email: string): string => `mailto:${email}`;

export const getGMapsLink = (query: string): string =>
	getUrlPrefix(`www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);

export const openUrl = (url: string): void => {
	window.open(url, '_blank', 'noreferrer, noopener');
};
