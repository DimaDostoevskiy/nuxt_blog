import {defineEventHandler} from 'h3'
import {IListPostsParams, postsService} from '../../services/postsService'

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as IListPostsParams
    return await postsService.searchPost(query)
})
