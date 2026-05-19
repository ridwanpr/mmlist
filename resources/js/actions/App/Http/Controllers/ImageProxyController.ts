import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ImageProxyController::show
 * @see app/Http/Controllers/ImageProxyController.php:10
 * @route '/asset/image/{hash}'
 */
export const show = (args: { hash: string | number } | [hash: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/asset/image/{hash}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImageProxyController::show
 * @see app/Http/Controllers/ImageProxyController.php:10
 * @route '/asset/image/{hash}'
 */
show.url = (args: { hash: string | number } | [hash: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hash: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    hash: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hash: args.hash,
                }

    return show.definition.url
            .replace('{hash}', parsedArgs.hash.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImageProxyController::show
 * @see app/Http/Controllers/ImageProxyController.php:10
 * @route '/asset/image/{hash}'
 */
show.get = (args: { hash: string | number } | [hash: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImageProxyController::show
 * @see app/Http/Controllers/ImageProxyController.php:10
 * @route '/asset/image/{hash}'
 */
show.head = (args: { hash: string | number } | [hash: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const ImageProxyController = { show }

export default ImageProxyController