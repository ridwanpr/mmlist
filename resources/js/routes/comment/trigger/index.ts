import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TriggerCommentController::index
 * @see app/Http/Controllers/TriggerCommentController.php:25
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
export const index = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/anime/discussion/{animeslug}/{triggerContentSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TriggerCommentController::index
 * @see app/Http/Controllers/TriggerCommentController.php:25
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
index.url = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{animeslug}', parsedArgs.animeslug.toString())
            .replace('{triggerContentSlug}', parsedArgs.triggerContentSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriggerCommentController::index
 * @see app/Http/Controllers/TriggerCommentController.php:25
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
index.get = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TriggerCommentController::index
 * @see app/Http/Controllers/TriggerCommentController.php:25
 * @route '/anime/discussion/{animeslug}/{triggerContentSlug}'
 */
index.head = (args: { animeslug: string | number, triggerContentSlug: string | number } | [animeslug: string | number, triggerContentSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})
const trigger = {
    index: Object.assign(index, index),
}

export default trigger