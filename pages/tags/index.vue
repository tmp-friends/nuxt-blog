<template>
    <div>
        <breadcrumbs :add-items="addBreads" />
        <v-container>
            <v-row
                justify="center"
            >
                <v-col
                    cols="12"
                    sm="10"
                    md="8"
                >
                    <v-card>
                        <v-card-title>
                            <v-text-field
                                v-model="search"
                                :append-icon=searchIcon
                                label="Search"
                                single-line
                                hide-details
                            />
                        </v-card-title>

                        <v-data-table
                            :headers="headers"
                            :items="tableItems"
                            :search="search"
                            :sort-by="sortBy"
                            :items-per-page="itemsPerPage"
                            :page.sync="page"
                            sort-desc
                            hide-default-footer
                            @page-count="pageCount = $event"
                        >
                            <template v-slot:[`item.fields.name`]="{ item }">
                                <v-icon size="18">
                                    {{ tagOutlineIcon }}
                                </v-icon>

                                <nuxt-link
                                    :to="linkTo('tags', item)"
                                >
                                    {{ item.fields.name }}
                                </nuxt-link>
                            </template>

                        </v-data-table>
                        <div class="text-center py-2">
                            <v-pagination
                                v-model="page"
                                :length="pageCount"
                                :total-visible="totalVisible"
                                circle
                                :prev-icon=menuLeftIcon
                                :next-icon=menuRightIcon
                                color="accent"
                            />
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import {
    mdiMagnify, mdiTagOutline, mdiMenuLeft, mdiMenuRight
} from '@mdi/js'

import { mapState, mapGetters } from 'vuex'

export default {
    data: () => ({
        searchIcon: mdiMagnify,
        tagOutlineIcon: mdiTagOutline,
        menuLeftIcon: mdiMenuLeft,
        menuRightIcon: mdiMenuRight,
        
        search: '',
        sortBy: 'fields.postcount',
        itemsPerPage: 15,
        page: 1,
        pageCount: 0,
        totalVisible: 5,
        headers: [
            {
                text: 'タグ',
                align: 'left',
                value: 'fields.name'
            },
            {
                text: '投稿数',
                align: 'center',
                width: 150,
                value: 'fields.postcount'
            }
        ]
    }),
    computed: {
        ...mapState(['tags']),
        ...mapGetters(['linkTo']),

        addBreads() {
            return [{ icon: mdiTagOutline, text: 'タグ一覧', to: '/tags', disabled: true, iconColor: 'accent' }]
        },
        tableItems() {
            const tags = []
            for (let i = 0; i < this.tags.length; i++) {
                const tag = this.tags[i]

                tag.fields.postcount = this.$store.getters.associatePosts(tag).length
                tags.push(tag)
            }
            return tags
        }
    }
}
</script>