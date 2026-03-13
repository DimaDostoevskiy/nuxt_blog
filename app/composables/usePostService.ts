import type {BlogPost} from "../types/blog";

export default () => {
    const getPostList = async (
        q: string = '',
        limit: number = 5,
        offset: number = 0
    ): Promise<BlogPost[]> => await $fetch<BlogPost[]>('/api/posts/get-all', {
        query: {
            q,
            limit,
            offset
        },
    })
        .then(nextChunk => nextChunk)
        .catch((err) => {
            alert(err)
            return []
        })
    return {
        getPostList
    }
}
