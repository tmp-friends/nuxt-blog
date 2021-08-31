<template>
	<v-app>
		<my-header />
		<v-main style="padding: 112px 16px 0">
			<nuxt />
		</v-main>
	</v-app>
</template>

<script>
import myHeader from '../components/shared/myHeader.vue'
export default {
	components: { myHeader }
}
</script>
