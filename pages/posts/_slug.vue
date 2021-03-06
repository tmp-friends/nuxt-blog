<template>
    <div class="wrapper">
        <breadcrumbs :add-items="addBreads" />
        <v-container>
            <template v-if="currentPost">
                <h1 class="page_title">
                    {{ currentPost.fields.title }}
                </h1>
                <template v-if="currentPost.fields.tags">
                    <div class="">
                        <v-chip
                            v-for="(tag) in currentPost.fields.tags"
                            :key="tag.sys.id"
                            :to="linkTo('tags', tag)"
                            small
                            label
                            outlined
                            class="mb-5 mr-3"
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
                    </div>
                </template>
                <v-img
                    :src="setEyeCatch(currentPost).url"
                    :alt="setEyeCatch(currentPost).title"
                    :aspect-ratio="16 / 9"
                    max-width="600"
                    class="mx-auto"
                >
                </v-img>
                <div class="publishdate_area">
                    {{ currentPost.fields.publishDate.substr( 0, 10 ).replace(/-/g, '/') }}
                </div>
                <div class="wrapper_content" v-html="$md.render(currentPost.fields.body)"></div>
            </template>

            <template v-else>
                お探しの記事は見つかりませんでした
            </template>

            <client-only>
                <share-btns :page-title="currentPost.fields.title" />
            </client-only>
        </v-container>
    </div>
</template>

<script>
import { mdiFolderOutline, mdiLabel } from '@mdi/js';
import { mapGetters } from 'vuex';
import Meta from '~/assets/mixins/meta';
import Prism from '~/plugins/prism';

import shareBtns from '~/components/ui/shareBtns'

export default {
    components: {
        shareBtns
    },
    mixins: [Meta],
    data: () => ({
        tagLabelIcon: mdiLabel
    }),
    computed: {
        ...mapGetters(['setEyeCatch', 'linkTo']),
        addBreads() {
            return [
                {
                    icon: mdiFolderOutline,
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
            // OGP画像動作確認OK
            // TODO:別関数に切り出す
            if (!!currentPost.fields.image && !!currentPost.fields.image.fields) {
                return {
                    currentPost,
                    category: currentPost.fields.category,
                    ogpImageUrl: `https:${currentPost.fields.image.fields.file.url}`
                }
            } else {
                return {
                    currentPost,
                    category: currentPost.fields.category,
                    ogpImageUrl: 'https://res.cloudinary.com/komekami/image/upload/v1632822782/defaultEyeCatch_jmalig.jpg'
                }
            }
        } else {
            return error({ statusCode: 400 })
        }
    }
};
</script>

<style lang="scss" scoped>
$h1-font-size: 24px;
$h2-font-size: 18px;

h1 {
    padding-bottom: 10px;
}

.wrapper {
	max-width: 800px;
	margin: 0 auto;
}

.publishdate_area {
    text-align: right;
    padding-top: 10px;
}

/* v-htmlによってレンダリングされるhtmlにはスコープ付きcssが使えない */
::v-deep .wrapper_content {
    margin-bottom: 40px;

    word-break: break-all; // 折り返し設定

    // SEOの観点からwrapper_content内に<h1>タグを使わない
    h2 {
        font-size: $h1-font-size;
        border-bottom: 1px solid #b1b1b1;
        margin: 0 0 20px;
        padding: 40px 0 5px;
    }
    h3 {
        font-size: $h2-font-size;
        padding: 20px 0;
    }
    h4 {
        font-size: $font-size-root;
        padding: 10px 0;
    }

    img {
        width: 100%;
        max-width: 400px;
        display: block;
        margin: 0 auto;
    }

    pre {
        margin: 16px 0;
    }

    blockquote {
        border-left: 5px solid #ddd;
        color: rgba(0, 0, 0, 0.7);
        padding: 10px;
        margin-bottom: 16px;
        p {
            margin-bottom: 0;
        }
    }

    table {
        margin: 20px auto;
        border: 1px solid #b1b1b1;
        border-radius: 8px;
        th, td {
            padding: 5px 10px;
        }
        th {
            border-bottom: 1px solid #b1b1b1;
        }
    }
    thead {
        border: 1px solid #b1b1b1;
    }
    @media screen and (max-width: 600px){
        table {
            font-size: 11px;
            th, td {
                padding: 10px 3px;
            }
        }
    }

    .table-of-contents {
        padding: 15px 20px;
        background-color: #f7f9f9;
        .toc-container-header {
            font-weight: 700;
        }
        ul {
            list-style: none;
            padding-left: 0;
        }
        li {
            padding:15px 0 0px;
            border-bottom: 1px dotted #b1b1b1;
        }
        a {
            color: rgba(0, 0, 0, 0.7);
            text-decoration: none;
            &:hover {
                opacity: 0.5;
            }
        }
    }
}
</style>
