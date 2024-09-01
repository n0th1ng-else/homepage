import { json, error } from '@sveltejs/kit';
import { Logger } from '$lib/common/log';
import { CloudinaryResource, uploadFile } from '$lib/server/cloudinary';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const logger = new Logger('api:upload-image');
	try {
		const form = await request.formData();
		const cloudinaryUrl = await uploadFile(CloudinaryResource.Image, form);
		return json({ url: cloudinaryUrl });
	} catch (err) {
		logger.error('Unable to upload image', err);
		error(500, 'Something went wrong');
	}
};
