import { Logger } from '$lib/common/log';
import { getReadingList } from '$lib/server/readingList';
import type { PageServerLoad } from './$types';

interface Output {
	url: string;
	items: Awaited<ReturnType<typeof getReadingList>>;
}
export const load: PageServerLoad<Output> = async ({ url }) => {
	const logger = new Logger('layout:ssr');

	try {
		const items = await getReadingList();
		return {
			url: url.toString(),
			items
		};
	} catch (err) {
		logger.error('Unable to get the reading list', err);
		return {
			url: url.toString(),
			items: []
		};
	}
};
