import { z } from 'zod';
import { runRawApi } from '$lib/common/api';
import { CloudinaryResource, uploadFile } from '$lib/server/cloudinary';
import { getRuntimeEnvironment } from '$lib/server/env';
import { getLinkInfo } from '$lib/server/meta';

const ReadingListItemSchema = z
	.object({
		title: z.string(),
		description: z.string().optional(),
		image: z.string().optional(),
		url: z.string(),
		note: z.string().optional(),
		date: z.number()
	})
	.describe('Reading list item descriptor');

type ReadingListItem = z.infer<typeof ReadingListItemSchema>;

const ReadingListItemsSchema = z.array(ReadingListItemSchema);

const FILE_NAME = 'readingList.txt';

const getReadingListUrl = (): string => {
	const env = getRuntimeEnvironment();
	return `https://res.cloudinary.com/${env.CLOUDINARY_ACCOUNT}/raw/upload/blog/${FILE_NAME}`;
};

export const getReadingList = async (): Promise<ReadingListItem[]> => {
	const response = await runRawApi(getReadingListUrl(), 'GET');
	const list = ReadingListItemsSchema.parse(response);

	return list;
};

export const saveReadingList = async (url: string, note?: string): Promise<ReadingListItem> => {
	const form = new FormData();

	const meta = await getLinkInfo(url);
	const newItem: ReadingListItem = {
		title: meta.title || url,
		description: meta.description || '',
		image: meta.image || '',
		url,
		note,
		date: new Date().getTime()
	};

	const oldItems = await getReadingList();
	const isIncludedItem = oldItems.find(item => item.url.includes(newItem.url));

	if (isIncludedItem) {
		return isIncludedItem;
	}

	const allItems = [newItem, ...oldItems];
	const textBlob = new Blob([JSON.stringify(allItems)], {
		type: 'text/plain'
	});
	form.append('file', textBlob);

	await uploadFile(CloudinaryResource.Raw, form, {
		tags: 'reading-list-page-data',
		public_id: FILE_NAME,
		invalidate: 'true'
	});

	return newItem;
};
