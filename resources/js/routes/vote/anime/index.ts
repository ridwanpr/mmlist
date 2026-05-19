import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\VoteController::trigger
 * @see app/Http/Controllers/VoteController.php:20
 * @route '/vote-anime-trigger/{triggerContentId}/{animeSlug}'
 */
export const trigger = (args: { triggerContentId: string | number, animeSlug: string | number } | [triggerContentId: string | number, animeSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: trigger.url(args, options),
    method: 'post',
})

trigger.definition = {
    methods: ["post"],
    url: '/vote-anime-trigger/{triggerContentId}/{animeSlug}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoteController::trigger
 * @see app/Http/Controllers/VoteController.php:20
 * @route '/vote-anime-trigger/{triggerContentId}/{animeSlug}'
 */
trigger.url = (args: { triggerContentId: string | number, animeSlug: string | number } | [triggerContentId: string | number, animeSlug: string | number ], options?: RouteQueryOptions) => {
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

    return trigger.definition.url
            .replace('{triggerContentId}', parsedArgs.triggerContentId.toString())
            .replace('{animeSlug}', parsedArgs.animeSlug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoteController::trigger
 * @see app/Http/Controllers/VoteController.php:20
 * @route '/vote-anime-trigger/{triggerContentId}/{animeSlug}'
 */
trigger.post = (args: { triggerContentId: string | number, animeSlug: string | number } | [triggerContentId: string | number, animeSlug: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: trigger.url(args, options),
    method: 'post',
})
const anime = {
    trigger: Object.assign(trigger, trigger),
}

export default anime