<script lang="ts">
	import { blogRoute, projectsRoute, aboutRoute } from '$lib/common/routes';
	import HeaderLink from '$lib/browser/ui/HeaderLink.svelte';
	import List from '$lib/browser/ui/List.svelte';

	export let activePath = '';
</script>

<List type="header">
	<li>
		<HeaderLink url="{blogRoute}" active="{blogRoute === activePath}">
			<span class="nav__item">Blog.</span>
		</HeaderLink>
	</li>
	<li>
		<HeaderLink url="{projectsRoute}" active="{projectsRoute === activePath}">
			<span class="nav__item">Projects.</span>
		</HeaderLink>
	</li>
	<!--		<li>-->
	<!--			<HeaderLink url="{readingListRoute}" active="{readingListRoute === activePath}">-->
	<!--				<span class="nav__item">Reading list.</span>-->
	<!--			</HeaderLink>-->
	<!--		</li>-->
	<li>
		<HeaderLink url="{aboutRoute}" active="{aboutRoute === activePath}" label="About me">
			<span class="nav__item">It's me.</span>
		</HeaderLink>
	</li>
</List>

<style lang="scss">
	@import '../ui/theme';
	@import '../../../global';

	@media (min-width: $md) {
		.nav__item {
			font-size: $font-size-plus;
		}
	}
</style>
