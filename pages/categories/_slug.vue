<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" sm="11" md="10" xl="8">
                <v-row>
                    <v-col
                        v-for=" (post, i) in relatedPosts"
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
                                    <div class="v-card__title_text">
                                        {{ post.fields.title }}
                                    </div>
                                </v-card-title>
                                
                                <v-list-item three-line style="min-height: unset">
                                    <v-list-item-subtitle>
                                        <!-- 非同期でcategoryの記事を取得してる間にrenderしてしまう -->
                                        <!-- <div v-html="$md.render(post.fields.body)"></div> -->
                                        {{ post.fields.body }}
                                    </v-list-item-subtitle>
                                </v-list-item>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['setEyeCatch', 'linkTo']),
        relatedPosts() {
            return this.$store.getters.relatedPosts(this.category)
        },
        categoryColor() {
            return (category) => {
                switch (category.fields.slug) {
                    case 'frontend': return '#0099ae'
                    case 'backend': return '#0048a6'
                    case 'illust': return '#d25972'
                    case 'design': return '#fdcb72'
                    case 'infra': return '#02216f'
                    default: return '#000'
                }
            }
        }

    },
    async asyncData({ payload, store, params, error }){
        const category = payload || await store.state.categories.find(cat => cat.fields.slug === params.slug)

        if (category) {
            return { category }
        } else {
            return error({ statusCode: 400 })
        }
    }
}
</script>

<style lang="scss" scoped>
.v-card__text, .v-card__title {
    padding: 8px 12px;
    overflow: hidden;
}

.v-list-item {
    padding: 0 12px 20px;

    .v-list-item__subtitle {
        font-size: 12px;

        ::v-deep h2 {
            font-size: 14px;
        }
    }
}
</style>
