<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" sm="11" md="10" xl="8">
                <v-row v-if="posts.length">
                    <v-col
                        v-for=" (post, i) in posts"
                        :key="i"
                        cols="12"
                        sm="6"
                        lg="4"
                        xl="3"
                    >
                        <v-hover
                            v-slot="{ hover }"
                        >
                            <v-card
                                :elevation="hover ? 16:2"
                                :class="{ 'on-hover': hover }"
                                outlined
                                shaped
                                max-width="400"
                                class="mx-auto"
                                :to="linkTo('posts', post)"
                            >
                                <v-img
                                    :src="setEyeCatch(post).url"
                                    :alt="setEyeCatch(post).title"
                                    :aspect-ratio="16 / 9"
                                    max-height="200"
                                    class="white--text"
                                >
                                    <v-card-text>
                                        <v-chip
                                            small
                                            dark
                                            :color="categoryColor(post.fields.category)"
                                            :to="linkTo('categories', post.fields.category)"
                                            class="font-weight-bold"
                                        >
                                            {{ post.fields.category.fields.name }}
                                        </v-chip>
                                    </v-card-text>
                                </v-img>

                                <v-card-title>
                                    {{ post.fields.title }}
                                </v-card-title>

                                <v-list-item three-line style="min-height: unset">
                                    <v-list-item-subtitle>
                                        <div v-html="$md.render(post.fields.body)"></div>
                                    </v-list-item-subtitle>
                                </v-list-item>

                                <v-card-text>
                                    <template v-if="post.fields.tags">
                                        <v-chip
                                            v-for="(tag) in post.fields.tags"
                                            :key="tag.sys.id"
                                            :to="linkTo('tags', tag)"
                                            small
                                            label
                                            outlined
                                            class="ma-1"
                                        >
                                            <v-icon
                                                left
                                                size="18"
                                                color="grey"
                                            >
                                                {{ tagLabelIcon }}
                                            </v-icon>
                                            {{ tag.fields.name }}
                                        </v-chip>
                                    </template>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
                <div v-else class="text-center">投稿された記事はありません</div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mdiLabel } from '@mdi/js'

import { mapState, mapGetters } from 'vuex'

export default {
    data: () => ({
        tagLabelIcon: mdiLabel
    }),
    computed: {
        ...mapState(['posts']),
        ...mapGetters(['setEyeCatch', 'linkTo']),
        
        categoryColor() {
            return (category) => {
                switch (category.fields.name) {
                    case 'Nuxt.js': return '#236244'
                    case 'git': return 'grey darken-3'
                    default: return '#fff'
                }
            }
        }
    },
};
</script>

<style scoped>
.v-card__title, .v-card__text {
    padding: 8px 16px;
}

.v-list-item__subtitle {
    font-size: 0.75rem;
}
</style>