<template>
    <div>
        <v-form
            @submit.prevent="submit"
            class="ma-3"
        >
            <v-text-field
                ref="searchForm"
                v-model="query"
                hide-details
                placeholder="キーワードを入力"
                dense
            />
        </v-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: ''
        }
    },
    computed: {
        validQuery() {
            return !!this.query && // 入力必須
                !/^\s+$/.test(this.query) && // 空白のみ禁止
                this.$route.query.q !== this.query // 前と同じ検索ワード
        }
    },
    methods: {
        submit() {
            if (this.validQuery) {
                this.$router.push({ path: '/search', query: { q: this.query } })
                this.query = ''
                this.$refs.searchForm.blur()
            }
        }
    }
}
</script>