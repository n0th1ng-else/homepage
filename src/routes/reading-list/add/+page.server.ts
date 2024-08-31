import type { PageServerLoad } from './$types';

interface Output {
	url: string;
}
export const load: PageServerLoad<Output> = async ({ url }) => {
	return {
		url: url.toString()
	};
};
