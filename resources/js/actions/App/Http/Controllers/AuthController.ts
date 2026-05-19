import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:35
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:35
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:35
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:35
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AuthController::register
 * @see app/Http/Controllers/AuthController.php:19
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::register
 * @see app/Http/Controllers/AuthController.php:19
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::register
 * @see app/Http/Controllers/AuthController.php:19
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::register
 * @see app/Http/Controllers/AuthController.php:19
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AuthController::registerAction
 * @see app/Http/Controllers/AuthController.php:24
 * @route '/register'
 */
export const registerAction = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerAction.url(options),
    method: 'post',
})

registerAction.definition = {
    methods: ["post"],
    url: '/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::registerAction
 * @see app/Http/Controllers/AuthController.php:24
 * @route '/register'
 */
registerAction.url = (options?: RouteQueryOptions) => {
    return registerAction.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::registerAction
 * @see app/Http/Controllers/AuthController.php:24
 * @route '/register'
 */
registerAction.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerAction.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::loginAction
 * @see app/Http/Controllers/AuthController.php:44
 * @route '/login'
 */
export const loginAction = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: loginAction.url(options),
    method: 'post',
})

loginAction.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::loginAction
 * @see app/Http/Controllers/AuthController.php:44
 * @route '/login'
 */
loginAction.url = (options?: RouteQueryOptions) => {
    return loginAction.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::loginAction
 * @see app/Http/Controllers/AuthController.php:44
 * @route '/login'
 */
loginAction.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: loginAction.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:67
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:67
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:67
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})
const AuthController = { login, register, registerAction, loginAction, logout }

export default AuthController