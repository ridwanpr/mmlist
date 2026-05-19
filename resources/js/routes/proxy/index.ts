import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ImageProxyController::image
 * @see app/Http/Controllers/ImageProxyController.php:10
 * @route '/asset/image/{hash}'
 */
export const image = (args: { hash: string | number } | [hash: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: image.url(args, options),
    method: 'get',
})

image.definition = {
    methods: ["get","head"],
    url: '/asset/image/{hash}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImageProxyController::image
 * @see app/Http/Controllers/ImageProxyController.php:10
 * @route '/asset/image/{hash}'
 */
image.url = (args: { hash: string | number } | [hash: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return image.definition.url
            .replace('{hash}', parsedArgs.hash.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImageProxyController::image
 * @see app/Http/Controllers/ImageProxyController.php:10
 * @route '/asset/image/{hash}'
 */
image.get = (args: { hash: string | number } | [hash: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: image.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImageProxyController::image
 * @see app/Http/Controllers/ImageProxyController.php:10
 * @route '/asset/image/{hash}'
 */
image.head = (args: { hash: string | number } | [hash: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: image.url(args, options),
    method: 'head',
})
const proxy = {
    image: Object.assign(image, image),
}

export default proxy