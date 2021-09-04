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

<style lang="scss" scoped>
// 【HACK】v-mainのstyleが上書きできないので!importを使用
.v-main {
	padding-top: 116px !important;
}
@media screen and (min-width: 600px){
	.v-main {
		padding-left: 16px !important;
		padding-right: 16px !important;
	}
}
</style>