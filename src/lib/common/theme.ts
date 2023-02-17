import { z } from 'zod';
import Cookies from 'js-cookie';
import type { CookiesWrapper } from '$lib/common/cookie';
import { getCookie, setCookie } from '$lib/common/cookie';

const ThemeSchema = z
	.union([z.literal('light'), z.literal('dark')])
	.describe('Theme validation schema');

export type Theme = z.infer<typeof ThemeSchema>;

export const DEFAULT_THEME: Theme = 'dark';

export const readTheme = (instance: CookiesWrapper = Cookies): Theme => {
	const cookieValue = getCookie('theme', instance);
	return ThemeSchema.catch(DEFAULT_THEME).parse(cookieValue);
};

export const persistTheme = (theme: Theme): void => {
	setCookie('theme', theme);
};
