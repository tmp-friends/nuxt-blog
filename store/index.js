import defaultEyeCatch from  '~/assets/images/defaultEyeCatch.jpg'
import client from '~/plugins/contentful'

export const state = () => ({
    posts: []
})

export const getters = {
    // EyeCatch画像がない場合の処理
    setEyeCatch: () => (post) => {
        if (!!post.fields.image && !!post.fields.image.fields) return { url: `https:${post.fields.image.fields.file.url}`, title: post.fields.image.fields.title }
        else return { url: defaultEyeCatch, title: 'defaultImage' }
    },
    linkTo: () => (name, obj) => {
        return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
    }
}

export const mutations = {
    setPosts(state, payload) {
        state.posts = payload
    }
}

// ミューテーションをコミット（非同期）
export const actions = {
    // 記事データを非同期で取得
    async getPosts({ commit }) {
        await client.getEntries({
            content_type: process.env.CTF_BLOG_POST_TYPE_ID,
            order: '-fields.publishDate'
        }).then(res =>
            commit('setPosts', res.items)
        ).catch(console.error)
    }    
}