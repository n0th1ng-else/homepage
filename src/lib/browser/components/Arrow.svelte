<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/browser/ui/Button.svelte';
	import type { ArrowDirection, ArrowSize } from '$lib/browser/ui/types';

	import iconUp from '../../../assets/icons/arrow-up.svg';
	import iconLeft from '../../../assets/icons/arrow-left.svg';

	const dispatch = createEventDispatcher();
	const onClick = (): void => {
		dispatch('click');
	};

	export let type: ArrowDirection = 'up';
	export let size: ArrowSize = 'xl';
	export let hint: string | undefined = undefined;

	const icon = type === 'up' ? iconUp : iconLeft;
</script>

<Button
	secondary
	on:click="{onClick}"
	printVisible="{false}"
	{hint}
	{icon}
	iconOutline
	iconSize="{size}"
/>
