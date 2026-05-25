import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TriggerCommentController::getTriggerComment
 * @see app/Http/Controllers/TriggerCommentController.php:20
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
 * @see app/Http/Controllers/TriggerCommentController.php:20
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
 * @see app/Http/Controllers/TriggerCommentController.php:20
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
getTriggerComment.get = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTriggerComment.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TriggerCommentController::getTriggerComment
 * @see app/Http/Controllers/TriggerCommentController.php:20
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
getTriggerComment.head = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTriggerComment.url(args, options),
    method: 'head',
})
const TriggerCommentController = { getTriggerComment }

export default TriggerCommentController