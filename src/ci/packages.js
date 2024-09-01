import { randomUUID } from 'node:crypto';
import { getFullLink, sleepFor } from './link.js';
import { Logger } from './log.js';
import { getLinkInfo } from '../lib/server/meta.js';

const logger = new Logger('packages');

const getBasePackage = (resources, pack) => {
	const fullUrl = getFullLink(resources, pack.service, pack.url, pack.lang);
	return {
		id: randomUUID(),
		service: pack.service,
		fullUrl,
		url: pack.url,
		link: pack.link,
		logo: pack.logo
	};
};

const getPackage = (base, meta) => {
	return {
		...base,
		meta
	};
};

const getPackageInfo = (base, retry = 0) => {
	if (retry > 10) {
		return Promise.reject(new Error(`Unable to fetch metadata for ${base.fullUrl}`));
	}

	return sleepFor(retry * 1000).then(() =>
		getLinkInfo(base.fullUrl).then(meta => {
			const pack = getPackage(base, {
				title: meta.title,
				description: meta.description,
				url: meta.url
			});
			logger.writeOutput(`${pack.id}. ${pack.meta.title}`);

			if (!pack.meta.title || !pack.meta.description) {
				logger.writeWarning(
					`Unable to fetch metadata for ${base.fullUrl}. Retrying (${retry} out of 10)`
				);
				return getPackageInfo(base, retry + 1);
			}

			return pack;
		})
	);
};

const getPackagesInfo = async (packages, info = []) => {
	if (!packages.length) {
		return info;
	}

	const pack = packages.shift();
	return getPackageInfo(pack).then(meta => getPackagesInfo(packages, [...info, meta]));
};

export const getExternalPackagesInfo = async resources => {
	const packagesMeta = resources.packages.map(pack => getBasePackage(resources, pack));
	return getPackagesInfo(packagesMeta);
};
