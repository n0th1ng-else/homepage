import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { env } from './env.js';
import { getPathUrl, metaFileName, metaFolderName } from './dirs.js';

/**
 *
 * @param rootDir {URL}
 * @param meta {object}
 */
export const saveMetaToFile = (rootDir, meta) => {
	if (!existsSync(getPathUrl(rootDir, metaFolderName))) {
		mkdirSync(getPathUrl(rootDir, metaFolderName));
	}

	const filePath = getPathUrl(rootDir, metaFolderName, metaFileName);
	const content = JSON.stringify(meta, null, 2);
	writeFileSync(filePath, `${content}\n`);
	return filePath;
};

/**
 *
 * @param service {string}
 */
const getLoginByService = service => {
	const login = env.accounts[service];
	if (!login) {
		throw new Error(`Login for ${service} not found`);
	}
	return login;
};

/**
 *
 * @param data {object}
 * @param data.services {Record<string, {host: string, pattern: string}>}
 * @param service {string}
 * @param path {string}
 * @param lang {string}
 */
export const getFullLink = (data, service, path = '', lang = '') => {
	const host = data.services[service].host;
	const pattern = data.services[service].pattern;
	const login = getLoginByService(service);
	if (!pattern) {
		throw new Error(`Service must have pattern (compiling ${service})`);
	}
	const url = pattern
		.replace('%h', host)
		.replace('%u', login)
		.replace('%p', path)
		.replace('%l', lang);
	return `https://${url}`;
};

export const sleepFor = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
