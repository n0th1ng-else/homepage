<script lang="ts">
	import { profileStore } from '$lib/browser/stores';
	import Title from '$lib/browser/ui/Title.svelte';
	import SubTitle from '$lib/browser/ui/SubTitle.svelte';
	import Meta from '$lib/browser/ui/Meta.svelte';
	import Paragraph from '$lib/browser/ui/Paragraph.svelte';
	import { legalTitle as title } from '$lib/common/labels';
	import type { PageData } from './$types';

	export let data: PageData;

	const { url } = data;
</script>

<Meta
	image="{$profileStore?.image ?? ''}"
	description="The legal information regarding the content in my blog. Contribution guide."
	{url}
/>
<article>
	<Title>Legal information</Title>
	<SubTitle>Opinions</SubTitle>
	<div class="legal-text">
		<Paragraph flat>
			All views expressed on this site are my own and do not represent the opinions of any entity
			whatsoever with which I have been, am now, or will be affiliated.
		</Paragraph>
	</div>
	<!-- <SubTitle>Publications</SubTitle>
    <p>
        // TODO add some distribution info
    </p>
    -->
	<SubTitle>Source Code</SubTitle>
	<div class="legal-text">
		<Paragraph flat
			>In case it is not explicitly specified, all code is distributed under the MIT License:</Paragraph
		>
	</div>
	<div class="legal-text">
		<Paragraph mono flat>Copyright © Sergey Nikitin</Paragraph>
		<Paragraph mono flat>
			Permission is hereby granted, free of charge, to any person obtaining a copy of this software
			and associated documentation files (the "Software"), to deal in the Software without
			restriction, including without limitation the rights to use, copy, modify, merge, publish,
			distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
			Software is furnished to do so, subject to the following conditions:
		</Paragraph>
		<Paragraph mono flat>
			The above copyright notice and this permission notice shall be included in all copies or
			substantial portions of the Software.
		</Paragraph>
		<Paragraph mono flat>
			THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
			BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
			NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
			DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
		</Paragraph>
	</div>
</article>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<style lang="scss">
	@import '../../global';

	.legal-text {
		margin-block: $unit;
		margin-inline: 0;
	}
</style>
