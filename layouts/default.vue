<template>
	<v-app>
		<my-header />
		<v-main>
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
