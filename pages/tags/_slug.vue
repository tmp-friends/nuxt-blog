<template>
    <div>
        <breadcrumbs :add-items="addBreads" />
        <v-container>
            <h1>{{ tag.fields.name }}</h1>
            <v-list-item
                v-for="(post, i) in relatedPosts"
                :key="i"
                :to="$store.getters.linkTo('posts', post)"
            >
                <v-list-item-content>
                    <v-list-item-title>
                        {{ post.fields.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-container>
    </div>
</template>

<script>
import { mdiTagOutline } from '@mdi/js'
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('linkTo'),
        addBreads() {
            return [{ icon: mdiTagOutline, text: 'タグ一覧', to: '/tags' }]
        }
    },
    asyncData({ payload, params, error, store, env }) {
        const tag = payload || store.state.tags.find(tag => tag.fields.slug === params.slug)
        if (tag) {
            const relatedPosts = store.getters.associatePosts(tag)
            
            return { tag, relatedPosts }
        } else {
            error({ statusCode: 400 })
        }
    }
}
</script>