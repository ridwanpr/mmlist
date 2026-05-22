import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:45
 * @route '/votes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/votes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:45
 * @route '/votes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:45
 * @route '/votes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoteController::index
 * @see app/Http/Controllers/VoteController.php:45
 * @route '/votes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const votes = {
    index: Object.assign(index, index),
}

export default votes