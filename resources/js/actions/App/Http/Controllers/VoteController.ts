import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VoteController::voteAnimeTrigger
 * @see app/Http/Controllers/VoteController.php:20
 * @route '/vote-anime-trigger/{triggerContentId}/{animeSlug}'
 */
export const voteAnimeTrigger = (args: { triggerContentId: string | number, animeSlug: string | number } | [triggerContentId: string | number, animeSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voteAnimeTrigger.url(args, options),
    method: 'post',
})

voteAnimeTrigger.definition = {
    methods: ["post"],
    url: '/vote-anime-trigger/{triggerContentId}/{animeSlug}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoteController::voteAnimeTrigger
 * @see app/Http/Controllers/VoteController.php:20
 * @route '/vote-anime-trigger/{triggerContentId}/{animeSlug}'
 */
voteAnimeTrigger.url = (args: { triggerContentId: string | number, animeSlug: string | number } | [triggerContentId: string | number, animeSlug: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    triggerContentId: args[0],
                    animeSlug: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        triggerContentId: args.triggerContentId,
                                animeSlug: args.animeSlug,
                }

    return voteAnimeTrigger.definition.url
            .replace('{triggerContentId}', parsedArgs.triggerContentId.toString())
            .replace('{animeSlug}', parsedArgs.animeSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::voteAnimeTrigger
 * @see app/Http/Controllers/VoteController.php:20
 * @route '/vote-anime-trigger/{triggerContentId}/{animeSlug}'
 */
voteAnimeTrigger.post = (args: { triggerContentId: string | number, animeSlug: string | number } | [triggerContentId: string | number, animeSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voteAnimeTrigger.url(args, options),
    method: 'post',
})

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
const VoteController = { voteAnimeTrigger, index }

export default VoteController