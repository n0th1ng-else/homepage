import { z } from 'zod';

export const ReadingListItemStateSchema = z
	.object({
		action: z.literal('READS'),
		url: z.string(),
		note: z.string().optional()
	})
	.describe('The follower state for reading list schema');

export type ReadingListItemState = z.infer<typeof ReadingListItemStateSchema>;
