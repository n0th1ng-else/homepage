import { z } from 'zod';

const RuntimeEnvSchema = z
	.object({
		// NODE_ENV: z.string().optional(),
		// COMMIT_HASH: z.string().optional(),
		// APP_VERSION: z.string().optional(),
		GH_AUTHOR_LOGIN: z.string(),
		// GH_AUTHOR_LINKED_IN: z.string(),
		// GH_AUTHOR_TELEGRAM: z.string(),
		// GH_AUTHOR_MEDIUM: z.string(),
		// GH_AUTHOR_HABR: z.string(),
		// GH_AUTHOR_NPM: z.string(),
		// GH_AUTHOR_TWITTER: z.string(),
		// GH_AUTHOR_DEVTO: z.string(),
		CLOUDINARY_ACCOUNT: z.string(),
		CLOUDINARY_KEY: z.string(),
		CLOUDINARY_SECRET: z.string(),
		GITHUB_SECRET: z.string(),
		GITHUB_CLIENT_ID: z.string()
	})
	.describe('App env schema');

export const getRuntimeEnvironment = (env = process.env): z.infer<typeof RuntimeEnvSchema> => {
	const parsed = RuntimeEnvSchema.parse(env);
	return parsed;
};
