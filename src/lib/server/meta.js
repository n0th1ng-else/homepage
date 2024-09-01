import scrapper from 'metascraper';
import sauthor from 'metascraper-author';
import sdate from 'metascraper-date';
import sdescription from 'metascraper-description';
import simage from 'metascraper-image';
import slogo from 'metascraper-logo';
import spublisher from 'metascraper-publisher';
import stitle from 'metascraper-title';
import surl from 'metascraper-url';

/**
 * [Warning] The file is used in CI as well!
 */

const metaScraper = scrapper([
	sauthor(),
	sdate(),
	sdescription(),
	simage(),
	slogo(),
	spublisher(),
	stitle(),
	surl()
]);

/**
 *
 * @param url {string}
 *
 * @return {Promise<string>}
 */
const getLinkHtml = url => fetch(url).then(result => result.text());

/**
 * The scrapped meta data for the web page
 * @typedef {Object} LinkMeta
 * @property {string} title - Page title
 * @property {string} description - Page description
 * @property {string} image - Page Logo
 * @property {string} date - Page publication date
 */

/**
 *
 * @param url {string}
 *
 * {Promise<LinkMeta>}
 */
export const getLinkInfo = async url => {
	const html = await getLinkHtml(url);
	return metaScraper({ html, url });
};
