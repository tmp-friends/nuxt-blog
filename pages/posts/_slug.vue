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
                    <div class="wrapper_content" v-html="$md.render(currentPost.fields.body)"></div>
                </template>
            
                <template v-else>
                    お探しの記事は見つかりませんでした
                </template>

                <client-only>
                    <share-btns :page-title="currentPost.fields.title" />
                    <follow-btns />
                </client-only>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Prism from '~/plugins/prism';

import shareBtns from '~/components/ui/shareBtns'
import followBtns from '~/components/ui/followBtns'

export default {
    components: {
        shareBtns, followBtns
    },
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
    mounted() {
        Prism.highlightAll()
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

<style lang="scss" scoped>
$h1-font-size: 28px;
$h2-font-size: 20px;

.wrapper {
    max-width: 600px;
    margin: 0 auto;
}

/* v-htmlによってレンダリングされるhtmlにはスコープ付きcssが使えない */
::v-deep .wrapper_content {
    img {
        width: 100%;
    }
    h1 {
        font-size: $h1-font-size;
        border-bottom: 1px solid #b1b1b1;
        margin: 10px 0;
    }
    h2 {
        font-size: $h2-font-size;
    }
    h3 {
        font-size: $font-size-root;
    }
}
</style>
