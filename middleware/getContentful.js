export default async ({ store }) => {
    // Contentfulから記事を取得
    if (!store.state.posts.length) await store.dispatch('getPosts')
}