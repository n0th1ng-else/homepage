import type { ProfileAccounts, PublicationInfo, PackageInfo, ProfileInfo } from '../@types/common';
import type { UrlResponse, Version } from './types';
import type { WithPagination } from '../types';

type RequestConfig = {
	type: 'json' | 'text';
};

type HttpMethod = 'POST' | 'GET';

export const runRawApi = async <Res = unknown, Req extends string | FormData = string>(
	url: string,
	method: HttpMethod,
	headers: Record<string, string> = {},
	body?: Req
): Promise<Res> => {
	const response = await fetch(url, {
		method,
		headers,
		body,
		credentials: 'same-origin'
	});
	if (!response.ok) {
		let cause = response;
		try {
			const json = await response.json();
			cause = json;
		} catch {
			// Do nothing, it's fine I guess
		}

		throw new Error(response.statusText, { cause });
	}

	const json = await response.json();
	return json;
};

export const runApi = async <Res = unknown, Req = unknown>(
	url: string,
	method: HttpMethod = 'GET',
	body?: Req,
	opts?: RequestConfig
): Promise<Res> => {
	const isText = opts?.type === 'text';
	const headers = {
		'Content-Type': isText ? 'text/plain' : 'application/json'
	};

	if (!body) {
		return runRawApi(url, method, headers);
	}

	const data = isText ? body.toString() : JSON.stringify(body);
	return runRawApi<Res, string>(url, method, headers, data);
};

const getApiPath = (path: string, pageUrl?: string): string => {
	const fullPath = `/api/v1/${path}`;
	if (!pageUrl) {
		return fullPath;
	}
	return `${getUrlPrefix(pageUrl)}${fullPath}`;
};

export const getUrlPrefix = (url: string): string => {
	if (url.startsWith('http')) {
		return url;
	}
	return url.includes('localhost') ? `http://${url}` : `https://${url}`;
};

const withQuery = (url: string, params: Record<string, unknown>): string => {
	const q = Object.keys(params)
		.filter(key => params[key])
		.map(key => `${key}=${params[key]}`)
		.join('&');
	return q ? `${url}?${q}` : url;
};

// Browser API ----------------------------------------------------------------

export const uploadImage = (form: FormData): Promise<UrlResponse> =>
	runRawApi(getApiPath('upload-image'), 'POST', {}, form);

export const getAuthUrl = (state: string): Promise<UrlResponse> =>
	runRawApi(getApiPath(`oauth/url?state=${state}`), 'GET');

// Server API ----------------------------------------------------------------
export const getProfile = (host: string): Promise<ProfileInfo> =>
	runApi(getApiPath('profile', host));

export const getPackages = (host: string): Promise<PackageInfo[]> =>
	runApi(getApiPath('packages', host));

export const getArticles = (
	host: string,
	draft?: boolean
): Promise<WithPagination<PublicationInfo>> =>
	runApi(withQuery(getApiPath('articles', host), { draft }));

export const getArticle = (host: string, slug: string, draft?: boolean): Promise<PublicationInfo> =>
	runApi(withQuery(getApiPath(`articles/${slug}`, host), { draft }));

export const getAccounts = (host: string): Promise<ProfileAccounts> =>
	runApi(getApiPath('accounts', host));

export const getVersion = (host: string): Promise<Version> => runApi(getApiPath('version', host));
