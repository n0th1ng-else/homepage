<script lang="ts">
	import { profileStore } from '$lib/browser/stores';
	import Title from '$lib/browser/ui/Title.svelte';
	import List from '$lib/browser/ui/List.svelte';
	import Meta from '$lib/browser/ui/Meta.svelte';
	import Link from '$lib/browser/ui/Link.svelte';
	import { projectsTitle as title } from '$lib/common/labels';
	import { sortByDate } from '$lib/common/date';
	import type { PageData } from './$types';

	export let data: PageData;

	const { url, items } = data;
	const sorted = sortByDate(items, item => new Date(item.date));
</script>

<Meta image="{$profileStore?.image ?? ''}" description="My reading list" {url} />
<article>
	<Title>Reading list</Title>
	<List>
		{#each sorted as item}
			<li class="reading-list-item">
				<div class="info">
					<div>
						<Link inline external url="{item.url}">
							{item.title}
						</Link>
					</div>
					{#if item.note}
						<div>
							– {item.note}
						</div>
					{/if}
				</div>
				{#if item.image}
					<div>
						<img class="image" src="{item.image}" alt="" />
					</div>
				{/if}
			</li>
		{/each}
	</List>
</article>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<style lang="scss">
	@import '../../global';

	.reading-list-item {
		margin-block-end: $unit-plus;
		display: flex;
		gap: $unit;
	}

	.image {
		height: $unit-triple;
		width: $unit-triple;
		object-fit: contain;
	}

	.info {
		flex: 1;
	}
</style>
