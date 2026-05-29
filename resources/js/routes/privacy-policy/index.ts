import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LegalController::index
 * @see app/Http/Controllers/LegalController.php:10
 * @route '/privacy-policy'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/privacy-policy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LegalController::index
 * @see app/Http/Controllers/LegalController.php:10
 * @route '/privacy-policy'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LegalController::index
 * @see app/Http/Controllers/LegalController.php:10
 * @route '/privacy-policy'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LegalController::index
 * @see app/Http/Controllers/LegalController.php:10
 * @route '/privacy-policy'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const privacyPolicy = {
    index: Object.assign(index, index),
}

export default privacyPolicy