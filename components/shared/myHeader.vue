<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            app
            temporary
        >
            <v-list
                dense
                nav
            >
                <v-list-item :to="homeIcon.link" >
                    <v-list-item-icon>
                        <v-icon>{{ homeIcon.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ homeIcon.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                    v-for="category in categories"
                    :key="category.title"
                    :to="category.link"
                    class="pl-8"
                >
                    <v-list-item-icon>
                        <v-icon>{{ category.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ category.title }}</v-list-item-title>
                </v-list-item>

                <v-list-item :to="tagIcon.link" >
                    <v-list-item-icon>
                        <v-icon>{{ tagIcon.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ tagIcon.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        
        <v-app-bar
            app
            hide-on-scroll
            color="primary"
        >
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <nuxt-link
                to="/"
                class="site-name"
            >
                {{ siteName }}
            </nuxt-link>
            <v-spacer />
            <div v-if="$vuetify.breakpoint.xs">
                <v-btn
                    icon
                    to="/search"
                >
                    <v-icon>{{ searchIcon }}</v-icon>
                </v-btn>
            </div>
            <div v-else class="header_search_area">
                <v-btn
                    icon
                    to="/search"
                >
                    <v-icon>{{ searchIcon }}</v-icon>
                </v-btn>
                <search-form />
            </div>

            <template v-slot:extension>
                <v-tabs
                    grow
                    show-arrows
                >
                    <v-tabs-slider color="accent"></v-tabs-slider>

                    <v-tab
                        v-for="category in categories"
                        :key="category.title"
                        :to="category.link"
                        :href="'#tab-' + category.title"
                    >
                        {{ category.title }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
    </div>
</template>

<script>
import {
    mdiHomeOutline,
    mdiViewDashboard,
    mdiApplication,
    mdiApplicationCog,
    mdiDraw,
    mdiDrawing,
    mdiApplicationSettings,
    mdiTagOutline,
    mdiMagnify,
} from '@mdi/js'

import searchForm from '../ui/searchForm.vue'
export default {
    components: { searchForm },
    data: () => ({
        drawer: false,
        siteName: process.env.SITE_NAME,
        homeIcon: { title: 'Home', icon: mdiHomeOutline, link: '/' },
        tagIcon: { title: 'Tag', icon: mdiTagOutline, link: '/tags' },
        searchIcon: mdiMagnify,
        categories: [
            { title: 'All', icon: mdiViewDashboard, link: '/' },
            { title: 'Frontend', icon: mdiApplication, link: '/categories/frontend' },
            { title: 'Backend', icon: mdiApplicationCog, link: '/categories/backend' },
            { title: 'Illust', icon: mdiDraw, link: '/categories/illust' },
            { title: 'Design', icon: mdiDrawing, link: '/categories/design' },
            { title: 'Infra', icon: mdiApplicationSettings, link: '/categories/infra' },
        ]
    })
}
</script>

<style lang="scss" scoped>
a.site-name {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.25rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.header_search_area {
    .v-btn {
        float: left;
    }
}

.v-tab.v-tab {
    color: rgba(0, 0, 0, 0.87);
}

.v-list .v-list-item--active {
    color: initial !important;
}
</style>
