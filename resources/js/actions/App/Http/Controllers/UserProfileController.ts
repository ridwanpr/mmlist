import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserProfileController::update
 * @see app/Http/Controllers/UserProfileController.php:14
 * @route '/profile/{username}'
 */
export const update = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/profile/{username}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\UserProfileController::update
 * @see app/Http/Controllers/UserProfileController.php:14
 * @route '/profile/{username}'
 */
update.url = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { username: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    username: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        username: args.username,
                }

    return update.definition.url
            .replace('{username}', parsedArgs.username.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserProfileController::update
 * @see app/Http/Controllers/UserProfileController.php:14
 * @route '/profile/{username}'
 */
update.put = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
const UserProfileController = { update }

export default UserProfileController