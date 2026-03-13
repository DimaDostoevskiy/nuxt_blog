import {defineEventHandler, getCookie, getQuery} from 'h3'
import {IListPostsParams, postsService} from '../../services/postsService'
import {IUserCookie} from "../../../app/types/user";

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as IListPostsParams
    const authUser = getCookie(event, 'auth_user') as IUserCookie | undefined
    return await postsService.searchPost(query, authUser?.role)
})
