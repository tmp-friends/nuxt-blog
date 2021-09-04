<template>
	<v-app>
		<my-header />
		<v-main class="base">
			<nuxt />
		</v-main>
		<my-footer />
	</v-app>
</template>

<script>
import myHeader from '../components/shared/myHeader.vue'
import myFooter from '../components/shared/myFooter.vue'
export default {
	components: { myHeader, myFooter }
}
</script>

<style lang="scss" scoped>
// .v-application {
// 	background-color: $base;
// }

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