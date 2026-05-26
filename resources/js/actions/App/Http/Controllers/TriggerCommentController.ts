import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TriggerCommentController::getTriggerComment
 * @see app/Http/Controllers/TriggerCommentController.php:23
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
export const getTriggerComment = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTriggerComment.url(args, options),
    method: 'get',
})

getTriggerComment.definition = {
    methods: ["get","head"],
    url: '/anime/discussion/{animeslug}/{triggerContentSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TriggerCommentController::getTriggerComment
 * @see app/Http/Controllers/TriggerCommentController.php:23
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
getTriggerComment.url = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    animeslug: args[0],
                    triggerContentSlug: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        animeslug: args.animeslug,
                                triggerContentSlug: args.triggerContentSlug,
                }

    return getTriggerComment.definition.url
            .replace('{animeslug}', parsedArgs.animeslug.toString())
            .replace('{triggerContentSlug}', parsedArgs.triggerContentSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriggerCommentController::getTriggerComment
 * @see app/Http/Controllers/TriggerCommentController.php:23
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
getTriggerComment.get = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTriggerComment.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TriggerCommentController::getTriggerComment
 * @see app/Http/Controllers/TriggerCommentController.php:23
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
getTriggerComment.head = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTriggerComment.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TriggerCommentController::store
 * @see app/Http/Controllers/TriggerCommentController.php:44
 * @route '/trigger-comment'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/trigger-comment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TriggerCommentController::store
 * @see app/Http/Controllers/TriggerCommentController.php:44
 * @route '/trigger-comment'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriggerCommentController::store
 * @see app/Http/Controllers/TriggerCommentController.php:44
 * @route '/trigger-comment'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const TriggerCommentController = { getTriggerComment, store }

export default TriggerCommentController