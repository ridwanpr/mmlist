import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import anime from './anime'
/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:21
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
 * @see app/Http/Controllers/CommentController.php:21
 * @route '/comment'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::store
 * @see app/Http/Controllers/CommentController.php:21
 * @route '/comment'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:74
 * @route '/comment/{commentId}'
 */
export const update = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/comment/{commentId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:74
 * @route '/comment/{commentId}'
 */
update.url = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{commentId}', parsedArgs.commentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::update
 * @see app/Http/Controllers/CommentController.php:74
 * @route '/comment/{commentId}'
 */
update.put = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:87
 * @route '/comment/{commentId}'
 */
export const destroy = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/comment/{commentId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:87
 * @route '/comment/{commentId}'
 */
destroy.url = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{commentId}', parsedArgs.commentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:87
 * @route '/comment/{commentId}'
 */
destroy.delete = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CommentController::upvote
 * @see app/Http/Controllers/CommentController.php:66
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
 * @see app/Http/Controllers/CommentController.php:66
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
 * @see app/Http/Controllers/CommentController.php:66
 * @route '/comment/upvote/{commentId}'
 */
upvote.put = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: upvote.url(args, options),
    method: 'put',
})
const comment = {
    anime: Object.assign(anime, anime),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
upvote: Object.assign(upvote, upvote),
}

export default comment