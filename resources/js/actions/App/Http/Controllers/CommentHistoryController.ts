import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CommentHistoryController::index
 * @see app/Http/Controllers/CommentHistoryController.php:17
 * @route '/comment-history'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/comment-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CommentHistoryController::index
 * @see app/Http/Controllers/CommentHistoryController.php:17
 * @route '/comment-history'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CommentHistoryController::index
 * @see app/Http/Controllers/CommentHistoryController.php:17
 * @route '/comment-history'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CommentHistoryController::index
 * @see app/Http/Controllers/CommentHistoryController.php:17
 * @route '/comment-history'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const CommentHistoryController = { index }

export default CommentHistoryController