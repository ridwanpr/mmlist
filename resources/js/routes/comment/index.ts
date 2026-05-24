import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import anime from './anime'
/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:22
 * @route '/comment'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/comment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:22
 * @route '/comment'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:22
 * @route '/comment'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CommentController::upvote
 * @see app/Http/Controllers/CommentController.php:63
 * @route '/comment/upvote/{commentId}'
 */
export const upvote = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: upvote.url(args, options),
    method: 'put',
})

upvote.definition = {
    methods: ["put"],
    url: '/comment/upvote/{commentId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CommentController::upvote
 * @see app/Http/Controllers/CommentController.php:63
 * @route '/comment/upvote/{commentId}'
 */
upvote.url = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { commentId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    commentId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        commentId: args.commentId,
                }

    return upvote.definition.url
            .replace('{commentId}', parsedArgs.commentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::upvote
 * @see app/Http/Controllers/CommentController.php:63
 * @route '/comment/upvote/{commentId}'
 */
upvote.put = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: upvote.url(args, options),
    method: 'put',
})
const comment = {
    anime: Object.assign(anime, anime),
store: Object.assign(store, store),
upvote: Object.assign(upvote, upvote),
}

export default comment