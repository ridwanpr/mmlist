import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Backend\ManageUserController::index
 * @see app/Http/Controllers/Backend/ManageUserController.php:14
 * @route '/admin/user'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Backend\ManageUserController::index
 * @see app/Http/Controllers/Backend/ManageUserController.php:14
 * @route '/admin/user'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Backend\ManageUserController::index
 * @see app/Http/Controllers/Backend/ManageUserController.php:14
 * @route '/admin/user'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Backend\ManageUserController::index
 * @see app/Http/Controllers/Backend/ManageUserController.php:14
 * @route '/admin/user'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const manageUser = {
    index: Object.assign(index, index),
}

export default manageUser