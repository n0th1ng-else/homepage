import { readFileSync } from 'node:fs';
import { getFullLink, saveMetaToFile } from './link.js';
import { env } from './env.js';
import { Logger } from './log.js';
import { getExternalPublications } from './external.js';
import { getInternalPublications } from './internal.js';
import { getExternalPackagesInfo } from './packages.js';
import { externalResourcesFile, rootDir, rootDirURL } from './dirs.js';
import { getLinkInfo } from '../lib/server/meta.js';

const logger = new Logger('links');

/**
 *
 * @param resources {object}
 * @param rootFolder {string}
 */
const getPublicationsInfo = async (resources, rootFolder) => {
	const external = await getExternalPublications(resources);
	const internal = await getInternalPublications(rootFolder);
	return [...external, ...internal];
};

const externalResources = JSON.parse(readFileSync(externalResourcesFile, { encoding: 'utf-8' }));
logger.writeOutput(`Detected version=${env.version} version build=${env.versionBuild}`);

/**
 *
 * @param resources {object}
 * @param resources.services {Record<string, {host: string, pattern: string}>}
 */
const getProfileInfo = async resources => {
	const userInfoUrl = getFullLink(resources, 'github');
	const info = await getLinkInfo(userInfoUrl);
	return {
		image: info.image
	};
};

Promise.all([
	getProfileInfo(externalResources),
	getPublicationsInfo(externalResources, rootDir),
	getExternalPackagesInfo(externalResources)
])
	.then(([profile, publications, packages]) => {
		const filePath = saveMetaToFile(rootDirURL, { profile, publications, packages, env });
		logger.writeOutput('Meta file is saved, location:', filePath.href);
		process.exit();
	})
	.catch(err => {
		logger.writeError('Unable to fetch profile info', err);
		process.exit(1);
	});
