<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $mal_id
 * @property string $url
 * @property string|null $season
 * @property int|null $year
 * @property array<array-key, mixed>|null $images
 * @property array<array-key, mixed>|null $trailer
 * @property bool $approved
 * @property array<array-key, mixed>|null $titles
 * @property string $title
 * @property string|null $title_english
 * @property string|null $title_japanese
 * @property array<array-key, mixed>|null $title_synonyms
 * @property string|null $type
 * @property string|null $source
 * @property int|null $episodes
 * @property string|null $status
 * @property bool $airing
 * @property array<array-key, mixed>|null $aired
 * @property string|null $duration
 * @property string|null $rating
 * @property numeric|null $score
 * @property string|null $synopsis
 * @property string|null $background
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Demographic> $demographics
 * @property-read int|null $demographics_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereAired($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereAiring($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereBackground($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereEpisodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereSeason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereSource($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereSynopsis($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitleEnglish($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitleJapanese($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitleSynonyms($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitles($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTrailer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereYear($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperAnime {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $anime_id
 * @property int $demographic_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereDemographicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperAnimeDemographic {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $anime_id
 * @property int $genre_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereGenreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperAnimeGenre {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $anime_id
 * @property int $producer_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereProducerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperAnimeProducer {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $anime_id
 * @property int $studio_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereStudioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperAnimeStudio {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $anime_id
 * @property int $theme_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereThemeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperAnimeTheme {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $mal_id
 * @property string $type
 * @property string $name
 * @property string $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Anime> $animes
 * @property-read int|null $animes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereUrl($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperDemographic {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $mal_id
 * @property string $type
 * @property string $name
 * @property string $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Genre whereUrl($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperGenre {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $mal_id
 * @property string $type
 * @property string $name
 * @property string $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereUrl($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperProducer {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperRole {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $mal_id
 * @property string $type
 * @property string $name
 * @property string $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Studio whereUrl($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperStudio {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $mal_id
 * @property string $type
 * @property string $name
 * @property string $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Theme whereUrl($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperTheme {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $username
 * @property string|null $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * @property-read int|null $roles_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUsername($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperUser {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $role_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserRole newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserRole newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserRole query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserRole whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserRole whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserRole whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserRole whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserRole whereUserId($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperUserRole {}
}

