import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TriggerCommentController::store
 * @see app/Http/Controllers/TriggerCommentController.php:42
 * @route '/trigger-comment'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/trigger-comment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TriggerCommentController::store
 * @see app/Http/Controllers/TriggerCommentController.php:42
 * @route '/trigger-comment'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TriggerCommentController::store
 * @see app/Http/Controllers/TriggerCommentController.php:42
 * @route '/trigger-comment'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const triggerComment = {
    store: Object.assign(store, store),
}

export default triggerComment