import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\UserDashboardController::index
 * @see app/Http/Controllers/UserDashboardController.php:19
 * @route '/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserDashboardController::index
 * @see app/Http/Controllers/UserDashboardController.php:19
 * @route '/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserDashboardController::index
 * @see app/Http/Controllers/UserDashboardController.php:19
 * @route '/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserDashboardController::index
 * @see app/Http/Controllers/UserDashboardController.php:19
 * @route '/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const userSetting = {
    index: Object.assign(index, index),
}

export default userSetting