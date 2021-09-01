<template>
    <div>
        <p class="font-weight-bold">
            この記事をシェアする
        </p>
        <v-btn
            color="#00acee"
            @click="windowOpen(twitterShareLink)"
        >
            <!-- area-hidden,area-label：SEO対策 -->
            <v-icon
                area-hidden="false"
                area-label="Twitter"
                color="#fff"
            >
                {{ twitterIcon }}   
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
import { mdiTwitter } from '@mdi/js'

export default {
    props: {
        pageTitle: {
            type: String,
            default: process.env.SITE_NAME
        }
    },
    // data:()=>({})の形式だとthis.$routeが取得できない
    // →アロー演算子だとthisの参照先が異なるため
    data() {
        return {
            twitterIcon: mdiTwitter,

            url: (process.env.BASE_URL + this.$route.path),
            twitter: process.env.TWITTER_ACCOUNT,
            hashtag: process.env.SITE_NAME,
            twitterLink: 'https://twitter.com/intent/tweet?url={0}&text={1}&hashtags={2}&related={3}&via={4}&lang=ja'
        }
    },
    computed: {
        twitterShareLink() {
            // link url{0}, text{1}, hashtags{2}, related{3}, via{4}
            return this.formatByArr(this.twitterLink, this.url, this.pageTitle, this.hashtag, this.twitter, this.twitter)
        }
    },
    methods: {
        formatByArr(msg) {
            let args = []
            for (let i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i]
            }
            args = args.map(x => encodeURIComponent(x))
            return msg.replace(/\{(\d+)\}/g, (m, k) => {
                return args[k]
            })
        },
        windowOpen(link) {
            return window.open(link, '_blank', 'top=100,left=100,width=600,height=500')
        }
    }
}
</script>

<style lang="scss" scoped>
.v-btn {
    width: 100px;
    margin-bottom: 16px;
}
</style>