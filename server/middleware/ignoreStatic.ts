import {defineEventHandler, sendNoContent} from 'h3'

const STATIC_EXT = /\.(ico|png|jpg|jpeg|gif|svg|webp|woff2?|css|js)$/i

export default defineEventHandler((event) => {
    const path = (event.path ?? getRequestURL(event).pathname ?? '').split('?')[0]
    if (path && STATIC_EXT.test(path)) {
        return sendNoContent(event)
    }
})
