export const getEmail = (): string => 'srg.post@gmail.com';

export const getTwitterLink = (account: string): string => `https://twitter.com/${account}`;

export const getMediumLink = (account: string): string => `https://${account}.medium.com`;

export const getGithubLink = (account: string): string => `https://github.com/${account}`;

export const getLinkedInLink = (account: string): string =>
	`https://www.linkedin.com/in/${account}`;

export const getHabrLink = (account: string): string => `https://habr.com/users/${account}`;

export const getDevtoLink = (account: string): string => `https://www.dev.to/${account}`;

export const getEmailLink = (email: string): string => `mailto:${email}`;

export const getGMapsLink = (query: string): string =>
	`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const openUrl = (url: string) => window.open(url, '_blank', 'noreferrer, noopener');
