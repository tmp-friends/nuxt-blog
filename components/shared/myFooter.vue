<template>
    <v-footer
        padless
    >
        <v-card
            flat
            tile
            class="flex accent white--text text-center"
        >
            <v-card-text>
                <v-btn
                    v-for="icon in icons"
                    :key="icon.title"
                    @click="windowOpen(icon.link)"
                    class="mx-4 white--text"
                    icon
                >
                    <v-icon size="24px">
                        {{ icon.icon }}
                    </v-icon>
                </v-btn>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} - <strong>Komekami</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
import { 
    mdiTwitter,
    mdiGithub,
    mdiLink
} from '@mdi/js'

export default {
    data: () => ({
        icons: [
            { title: 'twitterIcon', icon: mdiTwitter, link: `https://twitter.com/${process.env.TWITTER_ACCOUNT}` },
            { title: 'githubIcon', icon: mdiGithub, link: `https://github.com/tmp-friends` },
            { title: 'homepageIcon', icon: mdiLink, link: `https://komekami.info` },
        ]
    }),
    methods: {
        windowOpen(link) {
            return window.open(link, '_blank')
        }
    }
}
</script>

<style lang="scss" scoped>
.v-card__text {
    padding: 8px 16px;
}
</style>
