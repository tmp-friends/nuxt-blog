<template>
    <div>
        <breadcrumbs :add-items="addBreads" />
        <v-container>
            <div class="wrapper">
                <template v-if="currentPost">
                    {{ currentPost.fields.title }}
                    <v-img
                        :src="setEyeCatch(currentPost).url"
                        :alt="setEyeCatch(currentPost).title"
                        :aspect-ratio="16 / 9"
                        max-width="600"
                        class="mx-auto"
                    >
                    </v-img>
                    {{ currentPost.fields.publishDate }}<br />
                    <div v-html="$md.render(currentPost.fields.body)"></div>
                </template>
            
                <template v-else>
                    お探しの記事は見つかりませんでした
                </template>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['setEyeCatch', 'linkTo']),

        addBreads() {
            return [
                {
                    icon: 'mdi-folder-outline',
                    text: this.category.fields.name,
                    to: this.linkTo('categories', this.category)
                }
            ]
        }
    },
    async asyncData({ payload, store, params, error }){
        const currentPost = payload || await store.state.posts.find(post => post.fields.slug === params.slug)
        if (currentPost) {
            return {
                currentPost,
                category: currentPost.fields.category
            }
        } else {
            return error({ statusCode: 400 })
        }
    }
};
</script>

<style scoped>
.wrapper {
    max-width: 600px;
    margin: 0 auto;
}
</style>
