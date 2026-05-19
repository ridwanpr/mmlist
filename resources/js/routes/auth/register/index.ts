import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::action
 * @see app/Http/Controllers/AuthController.php:24
 * @route '/register'
 */
export const action = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: action.url(options),
    method: 'post',
})

action.definition = {
    methods: ["post"],
    url: '/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::action
 * @see app/Http/Controllers/AuthController.php:24
 * @route '/register'
 */
action.url = (options?: RouteQueryOptions) => {
    return action.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::action
 * @see app/Http/Controllers/AuthController.php:24
 * @route '/register'
 */
action.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: action.url(options),
    method: 'post',
})
const register = {
    action: Object.assign(action, action),
}

export default register