export default async ({ store }) => {
    // Contentfulから記事を取得
    if (!store.state.posts.length) await store.dispatch('getPosts')
    // Contentfulからカテゴリーを取得
    if (!store.state.categories.length) await store.dispatch('getCategories')
}