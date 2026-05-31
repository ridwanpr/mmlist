import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Backend\ContactMessageController::index
 * @see app/Http/Controllers/Backend/ContactMessageController.php:16
 * @route '/admin/contact-message'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/contact-message',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Backend\ContactMessageController::index
 * @see app/Http/Controllers/Backend/ContactMessageController.php:16
 * @route '/admin/contact-message'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Backend\ContactMessageController::index
 * @see app/Http/Controllers/Backend/ContactMessageController.php:16
 * @route '/admin/contact-message'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Backend\ContactMessageController::index
 * @see app/Http/Controllers/Backend/ContactMessageController.php:16
 * @route '/admin/contact-message'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const contactMessage = {
    index: Object.assign(index, index),
}

export default contactMessage