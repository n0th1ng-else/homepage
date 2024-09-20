<script lang="ts">
	export let mono = false;

	export let centered = false;

	export let flat = false;

	export let printVisible = true;
</script>

<p class="ui-paragraph" class:mono class:centered class:flat class:no-print="{!printVisible}">
	<slot />
</p>

<style lang="scss">
	@import './theme';
	@import '../../../global';

	.ui-paragraph {
		margin: $unit-half;

		&.flat {
			margin: 0;
		}

		&.mono {
			@include set-font-mono();
		}

		&.centered {
			text-align: center;
		}
	}

	@media print {
		.no-print {
			display: none;
		}
	}
</style>
