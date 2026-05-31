import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DiscussionListController::index
 * @see app/Http/Controllers/DiscussionListController.php:10
 * @route '/discussion'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/discussion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiscussionListController::index
 * @see app/Http/Controllers/DiscussionListController.php:10
 * @route '/discussion'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiscussionListController::index
 * @see app/Http/Controllers/DiscussionListController.php:10
 * @route '/discussion'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DiscussionListController::index
 * @see app/Http/Controllers/DiscussionListController.php:10
 * @route '/discussion'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const DiscussionListController = { index }

export default DiscussionListController