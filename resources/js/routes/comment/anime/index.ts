import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:33
 * @route '/discussion/{animeSlug}'
 */
export const index = (args: { animeSlug: string | number } | [animeSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/discussion/{animeSlug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:33
 * @route '/discussion/{animeSlug}'
 */
index.url = (args: { animeSlug: string | number } | [animeSlug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{animeSlug}', parsedArgs.animeSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:33
 * @route '/discussion/{animeSlug}'
 */
index.get = (args: { animeSlug: string | number } | [animeSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentController::index
 * @see app/Http/Controllers/CommentController.php:33
 * @route '/discussion/{animeSlug}'
 */
index.head = (args: { animeSlug: string | number } | [animeSlug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})
const anime = {
    index: Object.assign(index, index),
}

export default anime