import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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

/**
* @see \App\Http\Controllers\Backend\ManageUserController::edit
 * @see app/Http/Controllers/Backend/ManageUserController.php:23
 * @route '/admin/user/{userId}'
 */
export const edit = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/user/{userId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Backend\ManageUserController::edit
 * @see app/Http/Controllers/Backend/ManageUserController.php:23
 * @route '/admin/user/{userId}'
 */
edit.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    userId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        userId: args.userId,
                }

    return edit.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Backend\ManageUserController::edit
 * @see app/Http/Controllers/Backend/ManageUserController.php:23
 * @route '/admin/user/{userId}'
 */
edit.get = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Backend\ManageUserController::edit
 * @see app/Http/Controllers/Backend/ManageUserController.php:23
 * @route '/admin/user/{userId}'
 */
edit.head = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})
const ManageUserController = { index, edit }

export default ManageUserController