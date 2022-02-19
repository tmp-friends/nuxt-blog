export default {
    head() {
        return {
            title: this.currentPost.fields.title + ' - ' + process.env.SITE_NAME,
            meta: [
                { hid: 'description', name: 'description', content: this.currentPost.fields.description },
                { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_NAME },
                { hid: 'og:type', property: 'og:type', content: 'website' },
                { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL + this.$route.path },
                { hid: 'og:title', property: 'og:title', content: this.currentPost.fields.title },
                { hid: 'og:description', property: 'og:description', content: this.currentPost.fields.description },
                { hid: 'og:image', property: 'og:image', content: this.setMetaImage(this.currentPost.url) },
                { hid: 'twitter:card', name: 'twitter:card', content: "summary_large_image" },
                { hid: 'twitter:site', name: 'twitter:site', content: process.env.TWITTER_ACCOUNT },
                { hid: 'twitter:image', name: 'twitter:image', content: this.setMetaImage(this.currentPost.url) }
            ]
        }
    },
    methods: {
        setMetaImage: () => (post) => {
            if (!!post.fields.image && !!post.fields.image.fields) return { url: `https:${post.fields.image.fields.file.url}` }
            else return { url: `${process.env.BASE_URL}/assets/images/defaultEyeCatch.jpg` }
        },

    }

}