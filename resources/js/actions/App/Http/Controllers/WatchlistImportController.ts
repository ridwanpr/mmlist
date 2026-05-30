import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WatchlistImportController::store
 * @see app/Http/Controllers/WatchlistImportController.php:12
 * @route '/watchlist/import'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/watchlist/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WatchlistImportController::store
 * @see app/Http/Controllers/WatchlistImportController.php:12
 * @route '/watchlist/import'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WatchlistImportController::store
 * @see app/Http/Controllers/WatchlistImportController.php:12
 * @route '/watchlist/import'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const WatchlistImportController = { store }

export default WatchlistImportController