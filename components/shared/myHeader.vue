<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            app
        >
            <v-list
                dense
                nav
            >
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.link"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        
        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <nuxt-link
                to="/"
                class="site-name"
            >
                {{ siteName }}
            </nuxt-link>
            <v-spacer />
            <div
                v-if="$vuetify.breakpoint.xs"
            >
                <v-btn
                    icon
                    text
                    to="/search"
                >
                    <v-icon>{{ searchIcon }}</v-icon>
                </v-btn>
            </div>
            <div v-else>
                <search-form />
            </div>
        </v-app-bar>
    </div>
</template>

<script>
import {
    mdiViewDashboard,
    mdiMagnify
} from '@mdi/js'

import searchForm from '../ui/searchForm.vue'
export default {
    components: { searchForm },
    data: () => ({
        drawer: null,
        siteName: 'KomeLog',
        items: [
            { title: 'Index', icon: mdiViewDashboard, link: '/' },
        ],
        searchIcon: mdiMagnify,
    })
}
</script>

<style scoped lang="scss">
a.site-name {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.25rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
