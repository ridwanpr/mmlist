import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Backend\ManageUserController::index
 * @see app/Http/Controllers/Backend/ManageUserController.php:15
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
 * @see app/Http/Controllers/Backend/ManageUserController.php:15
 * @route '/admin/user'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Backend\ManageUserController::index
 * @see app/Http/Controllers/Backend/ManageUserController.php:15
 * @route '/admin/user'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Backend\ManageUserController::index
 * @see app/Http/Controllers/Backend/ManageUserController.php:15
 * @route '/admin/user'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Backend\ManageUserController::edit
 * @see app/Http/Controllers/Backend/ManageUserController.php:24
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
 * @see app/Http/Controllers/Backend/ManageUserController.php:24
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
 * @see app/Http/Controllers/Backend/ManageUserController.php:24
 * @route '/admin/user/{userId}'
 */
edit.get = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Backend\ManageUserController::edit
 * @see app/Http/Controllers/Backend/ManageUserController.php:24
 * @route '/admin/user/{userId}'
 */
edit.head = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Backend\ManageUserController::update
 * @see app/Http/Controllers/Backend/ManageUserController.php:33
 * @route '/admin/user/{userId}'
 */
export const update = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/user/{userId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Backend\ManageUserController::update
 * @see app/Http/Controllers/Backend/ManageUserController.php:33
 * @route '/admin/user/{userId}'
 */
update.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Backend\ManageUserController::update
 * @see app/Http/Controllers/Backend/ManageUserController.php:33
 * @route '/admin/user/{userId}'
 */
update.put = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Backend\ManageUserController::reset
 * @see app/Http/Controllers/Backend/ManageUserController.php:50
 * @route '/admin/user/{userId}'
 */
export const reset = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(args, options),
    method: 'post',
})

reset.definition = {
    methods: ["post"],
    url: '/admin/user/{userId}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Backend\ManageUserController::reset
 * @see app/Http/Controllers/Backend/ManageUserController.php:50
 * @route '/admin/user/{userId}'
 */
reset.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return reset.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Backend\ManageUserController::reset
 * @see app/Http/Controllers/Backend/ManageUserController.php:50
 * @route '/admin/user/{userId}'
 */
reset.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(args, options),
    method: 'post',
})
const manageUser = {
    index: Object.assign(index, index),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
reset: Object.assign(reset, reset),
}

export default manageUser