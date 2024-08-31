import { createHash } from 'crypto';
import { sortAsText } from '$lib/common/sort';
import { getUrlPrefix, runRawApi } from '$lib/common/api';
import { getRuntimeEnvironment } from '$lib/server/env';

const generateSha1Hash = (data: string): string => {
	const sha = createHash('sha1');
	sha.update(data);
	return sha.digest('hex');
};

export const enum CloudinaryResource {
	Image = 'image',
	Raw = 'raw',
	Video = 'video',
	Auto = 'auto'
}

interface BaseCloudinaryPayload {
	api_key: string;
	cloud_name?: string;
	resource_type: CloudinaryResource;
	timestamp: number;
	public_id?: string;
	eager?: string;
	upload_preset: string;
	tags?: string;
	invalidate?: 'true';
}

interface SignedCloudinaryPayload extends BaseCloudinaryPayload {
	signature: string;
}

const signPayload = (payload: BaseCloudinaryPayload, secret: string): SignedCloudinaryPayload => {
	const omitted = ['cloud_name', 'resource_type', 'api_key'];
	const pairs: string[] = [];
	for (const [key, value] of Object.entries(payload)) {
		if (!omitted.includes(key)) {
			pairs.push(`${key}=${value}`);
		}
	}

	const flat = sortAsText(pairs).join('&');
	const full = `${flat}${secret}`;
	return {
		...payload,
		signature: generateSha1Hash(full)
	};
};

const getUrl = (account: string, type: CloudinaryResource): string =>
	getUrlPrefix(`api.cloudinary.com/v1_1/${account}/${type}/upload`);

export const uploadFile = async (
	type: CloudinaryResource,
	form: FormData,
	opts: Pick<BaseCloudinaryPayload, 'tags' | 'public_id' | 'invalidate'> = {}
): Promise<string> => {
	const env = getRuntimeEnvironment();

	const api = {
		account: env.CLOUDINARY_ACCOUNT,
		key: env.CLOUDINARY_KEY,
		secret: env.CLOUDINARY_SECRET
	};

	const payload: BaseCloudinaryPayload = {
		api_key: api.key,
		timestamp: new Date().getTime(),
		resource_type: type,
		upload_preset: 'default',
		...opts
	};

	const url = getUrl(api.account, type);
	const signed = signPayload(payload, api.secret);

	for (const [key, value] of Object.entries(signed)) {
		form.append(key, value);
	}

	const cloudinaryResponse = await runRawApi<{ url: string }, FormData>(url, 'POST', {}, form);
	return cloudinaryResponse.url;
};
