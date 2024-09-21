<script lang="ts">
	import Link from '$lib/browser/ui/Link.svelte';
	import Paragraph from '$lib/browser/ui/Paragraph.svelte';
	import SubTitle from '$lib/browser/ui/SubTitle.svelte';
	import { blogRoute } from '$lib/common/routes';
	import imageNotFound from '../../../assets/images/not-found.svg';
</script>

<article>
	<SubTitle centered>Ops, bumped into empty space?</SubTitle>

	<aside class="container">
		<img class="image" src="{imageNotFound}" alt="" title="Page not found" />
	</aside>

	<Paragraph centered flat>
		One day something funny would appear on this page... But for now, I was not able to find
		anything for you, really. My bad. Check out <Link inline url="{blogRoute}">my blog</Link>, if
		you have not already
	</Paragraph>
</article>

<style lang="scss">
	@import '../../../lib/browser/ui/theme';
	@import '../../../global';

	.image {
		height: 100%;
		object-fit: contain;
		width: 100%;
	}

	.container {
		margin: auto;
		height: auto;
		padding-block: $unit;
		padding-inline: 0;
		width: 4 * $unit-plus;
	}

	@media (min-width: $sm) {
		.container {
			width: 6 * $unit-plus;
		}
	}

	@media (min-width: $md) {
		.container {
			width: 10 * $unit-plus;
		}
	}
</style>
