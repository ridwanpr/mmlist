import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Backend\ManageAnimeController::index
 * @see app/Http/Controllers/Backend/ManageAnimeController.php:15
 * @route '/admin/anime'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/anime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Backend\ManageAnimeController::index
 * @see app/Http/Controllers/Backend/ManageAnimeController.php:15
 * @route '/admin/anime'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Backend\ManageAnimeController::index
 * @see app/Http/Controllers/Backend/ManageAnimeController.php:15
 * @route '/admin/anime'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Backend\ManageAnimeController::index
 * @see app/Http/Controllers/Backend/ManageAnimeController.php:15
 * @route '/admin/anime'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const manageAnime = {
    index: Object.assign(index, index),
}

export default manageAnime