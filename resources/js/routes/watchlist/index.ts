import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\WatchlistController::index
 * @see app/Http/Controllers/WatchlistController.php:38
 * @route '/watchlist'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/watchlist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WatchlistController::index
 * @see app/Http/Controllers/WatchlistController.php:38
 * @route '/watchlist'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::index
 * @see app/Http/Controllers/WatchlistController.php:38
 * @route '/watchlist'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WatchlistController::index
 * @see app/Http/Controllers/WatchlistController.php:38
 * @route '/watchlist'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WatchlistController::store
 * @see app/Http/Controllers/WatchlistController.php:21
 * @route '/watchlist'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/watchlist',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WatchlistController::store
 * @see app/Http/Controllers/WatchlistController.php:21
 * @route '/watchlist'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::store
 * @see app/Http/Controllers/WatchlistController.php:21
 * @route '/watchlist'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WatchlistController::destroy
 * @see app/Http/Controllers/WatchlistController.php:31
 * @route '/watchlist/{watchlistId}'
 */
export const destroy = (args: { watchlistId: string | number } | [watchlistId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/watchlist/{watchlistId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\WatchlistController::destroy
 * @see app/Http/Controllers/WatchlistController.php:31
 * @route '/watchlist/{watchlistId}'
 */
destroy.url = (args: { watchlistId: string | number } | [watchlistId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watchlistId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    watchlistId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        watchlistId: args.watchlistId,
                }

    return destroy.definition.url
            .replace('{watchlistId}', parsedArgs.watchlistId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::destroy
 * @see app/Http/Controllers/WatchlistController.php:31
 * @route '/watchlist/{watchlistId}'
 */
destroy.delete = (args: { watchlistId: string | number } | [watchlistId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\WatchlistController::update
 * @see app/Http/Controllers/WatchlistController.php:71
 * @route '/watchlist/{watchlistId}'
 */
export const update = (args: { watchlistId: string | number } | [watchlistId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/watchlist/{watchlistId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\WatchlistController::update
 * @see app/Http/Controllers/WatchlistController.php:71
 * @route '/watchlist/{watchlistId}'
 */
update.url = (args: { watchlistId: string | number } | [watchlistId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watchlistId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    watchlistId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        watchlistId: args.watchlistId,
                }

    return update.definition.url
            .replace('{watchlistId}', parsedArgs.watchlistId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistController::update
 * @see app/Http/Controllers/WatchlistController.php:71
 * @route '/watchlist/{watchlistId}'
 */
update.put = (args: { watchlistId: string | number } | [watchlistId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
const watchlist = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
update: Object.assign(update, update),
}

export default watchlist