import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::action
 * @see app/Http/Controllers/AuthController.php:44
 * @route '/login'
 */
export const action = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: action.url(options),
    method: 'post',
})

action.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::action
 * @see app/Http/Controllers/AuthController.php:44
 * @route '/login'
 */
action.url = (options?: RouteQueryOptions) => {
    return action.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::action
 * @see app/Http/Controllers/AuthController.php:44
 * @route '/login'
 */
action.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: action.url(options),
    method: 'post',
})
const login = {
    action: Object.assign(action, action),
}

export default login