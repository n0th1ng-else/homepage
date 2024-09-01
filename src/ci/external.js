import { Logger } from './log.js';
import { getBasePublication, getPublication } from './publication.js';
import { getFullLink, sleepFor } from './link.js';
import { getLinkInfo } from '../lib/server/meta.js';

const logger = new Logger('external-links');

const getPublicationInfo = (base, retry = 0) => {
	if (retry > 10) {
		return Promise.reject(new Error(`Unable to fetch metadata for ${base.fullUrl}`));
	}

	return sleepFor(retry * 1000).then(() =>
		getLinkInfo(base.fullUrl).then(meta => {
			const pub = getPublication(base, {
				description: meta.description,
				date: meta.date,
				image: meta.image,
				title: meta.title
			});
			logger.writeOutput(`${pub.id}. ${pub.meta.title}`);

			if (!pub.meta.title || !pub.meta.description) {
				logger.writeWarning(
					`Unable to fetch metadata for ${pub.fullUrl}. Retrying (${retry} out of 10)`
				);
				return getPublicationInfo(base, retry + 1);
			}

			return pub;
		})
	);
};

/**
 *
 * @param publications {object[]}
 * @param publications.fullUrl {string}
 */
const getPublicationsInfo = async (publications, info = []) => {
	const publication = publications.shift();

	if (!publication) {
		return info;
	}

	return getPublicationInfo(publication).then(pub =>
		getPublicationsInfo(publications, [...info, pub])
	);
};

export const getExternalPublications = async resources => {
	const publications = resources.publications.map(pub => {
		const url = getFullLink(resources, pub.service, pub.url, pub.lang);
		return getBasePublication(pub, url, false, false);
	});

	return getPublicationsInfo(publications);
};
