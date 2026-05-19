import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserDashboardController::index
 * @see app/Http/Controllers/UserDashboardController.php:10
 * @route '/dash'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dash',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserDashboardController::index
 * @see app/Http/Controllers/UserDashboardController.php:10
 * @route '/dash'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserDashboardController::index
 * @see app/Http/Controllers/UserDashboardController.php:10
 * @route '/dash'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserDashboardController::index
 * @see app/Http/Controllers/UserDashboardController.php:10
 * @route '/dash'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const UserDashboardController = { index }

export default UserDashboardController