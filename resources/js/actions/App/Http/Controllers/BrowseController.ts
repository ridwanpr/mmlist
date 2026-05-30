import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:19
 * @route '/browse'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/browse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:19
 * @route '/browse'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:19
 * @route '/browse'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrowseController::index
 * @see app/Http/Controllers/BrowseController.php:19
 * @route '/browse'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const BrowseController = { index }

export default BrowseController