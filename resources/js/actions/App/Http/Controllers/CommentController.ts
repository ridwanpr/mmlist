import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CommentController::getAnimeComment
 * @see app/Http/Controllers/CommentController.php:49
 * @route '/anime/discussion/{animeSlug}'
 */
export const getAnimeComment = (args: { animeSlug: string | number } | [animeSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAnimeComment.url(args, options),
    method: 'get',
})

getAnimeComment.definition = {
    methods: ["get","head"],
    url: '/anime/discussion/{animeSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::getAnimeComment
 * @see app/Http/Controllers/CommentController.php:49
 * @route '/anime/discussion/{animeSlug}'
 */
getAnimeComment.url = (args: { animeSlug: string | number } | [animeSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animeSlug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    animeSlug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        animeSlug: args.animeSlug,
                }

    return getAnimeComment.definition.url
            .replace('{animeSlug}', parsedArgs.animeSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::getAnimeComment
 * @see app/Http/Controllers/CommentController.php:49
 * @route '/anime/discussion/{animeSlug}'
 */
getAnimeComment.get = (args: { animeSlug: string | number } | [animeSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAnimeComment.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::getAnimeComment
 * @see app/Http/Controllers/CommentController.php:49
 * @route '/anime/discussion/{animeSlug}'
 */
getAnimeComment.head = (args: { animeSlug: string | number } | [animeSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAnimeComment.url(args, options),
    method: 'head',
})

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
 * @see app/Http/Controllers/CommentController.php:77
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
 * @see app/Http/Controllers/CommentController.php:77
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
 * @see app/Http/Controllers/CommentController.php:77
 * @route '/comment/{commentId}'
 */
update.put = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CommentController::destroy
 * @see app/Http/Controllers/CommentController.php:88
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
 * @see app/Http/Controllers/CommentController.php:88
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
 * @see app/Http/Controllers/CommentController.php:88
 * @route '/comment/{commentId}'
 */
destroy.delete = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CommentController::upvote
 * @see app/Http/Controllers/CommentController.php:70
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
 * @see app/Http/Controllers/CommentController.php:70
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
 * @see app/Http/Controllers/CommentController.php:70
 * @route '/comment/upvote/{commentId}'
 */
upvote.put = (args: { commentId: string | number } | [commentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: upvote.url(args, options),
    method: 'put',
})
const CommentController = { getAnimeComment, store, update, destroy, upvote }

export default CommentController