declare namespace App {
  namespace DTOs {
    export type AnimeData = {
      readonly mal_id: number;
      readonly url: string;
      readonly season: string | null;
      readonly year: number | null;
      readonly images: Record<string, any>;
      readonly trailer: Record<string, any>;
      readonly approved: boolean;
      readonly titles: App.DTOs.AnimeTitleData[];
      readonly title: string;
      readonly title_english: string | null;
      readonly title_japanese: string | null;
      readonly title_synonyms: any[];
      readonly type: string | null;
      readonly source: string | null;
      readonly episodes: number | null;
      readonly status: string | null;
      readonly airing: boolean;
      readonly aired: Record<string, any>;
      readonly duration: string | null;
      readonly rating: string | null;
      readonly score: number | null;
      readonly synopsis: string | null;
      readonly background: string | null;
      readonly rank: number | null;
      readonly demographics: App.DTOs.AnimeMetaData[];
      readonly genres: App.DTOs.AnimeMetaData[];
      readonly producers: App.DTOs.AnimeMetaData[];
      readonly studios: App.DTOs.AnimeMetaData[];
      readonly themes: App.DTOs.AnimeMetaData[];
      readonly triggers: App.DTOs.AnimeTriggerData[];
      readonly slug: string;
      readonly ai_advisory: string | null;
    };
    export type AnimeMetaData = {
      readonly mal_id: number;
      readonly type: string;
      readonly name: string;
      readonly url: string;
    };
    export type AnimeTitleData = {
      readonly type: string;
      readonly title: string;
    };
    export type AnimeTriggerData = {
      readonly trigger_content_id: number;
      readonly anime_id: number;
      readonly user_id: number;
      readonly is_appear: boolean;
      readonly severity: string | null;
      readonly framing: string | null;
      readonly triggerContent: App.DTOs.TriggerContentData | null;
    };
    export type GenreData = {
      readonly id: number;
      readonly mal_id: number;
      readonly type: string;
      readonly name: string;
      readonly url: string;
    };
    export type LoginData = {
      readonly username: string;
      readonly password: string;
    };
    export type PaginatedAnimeData = {
      readonly data: App.DTOs.AnimeData[];
      readonly current_page: number;
      readonly last_page: number;
      readonly per_page: number;
      readonly total: number;
      readonly next_page_url: string | null;
      readonly prev_page_url: string | null;
      readonly links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
    };
    export type RegisterData = {
      readonly username: string;
      readonly name: string;
      readonly email: string | null;
      readonly password: string;
    };
    export type ThemeData = {
      readonly id: number;
      readonly mal_id: number;
      readonly type: string;
      readonly name: string;
      readonly url: string;
    };
    export type TriggerContentData = {
      readonly id: number;
      readonly trigger_id: number;
      readonly name: string;
      readonly importance: number;
      readonly description: string | null;
      readonly created_at: string | null;
      readonly updated_at: string | null;
      readonly animeTriggers: App.DTOs.AnimeTriggerData[];
      readonly stats: App.DTOs.TriggerStatsData | null;
    };
    export type TriggerData = {
      readonly id: number;
      readonly name: string;
      readonly importance: number;
      readonly description: string | null;
      readonly created_at: string | null;
      readonly updated_at: string | null;
      readonly triggerContents: App.DTOs.TriggerContentData[];
    };
    export type TriggerStatsData = {
      readonly appear_true: number;
      readonly appear_false: number;
      readonly severity: {
        Mild: number;
        Moderate: number;
        Severe: number;
        Extreme: number;
      };
      readonly framing: {
        Serious: number;
        Neutral: number;
        Romanticized: number;
        Comedic: number;
      };
    };
    export type UserData = {
      readonly id: number;
      readonly name: string;
      readonly username: string;
      readonly email: string | null;
      readonly createdAt: string | null;
      readonly roleId: string;
    };
    export type WatchlistData = {
      readonly anime_id: number;
      readonly user_id: number;
      readonly status: string;
      readonly progress: number;
      readonly score: number | null;
      readonly note: string | null;
      readonly started_at: string | null;
      readonly completed_at: string | null;
      readonly created_at: string | null;
      readonly updated_at: string | null;
    };
  }
}
declare namespace Illuminate {
  export type CursorPaginator<TKey, TValue> = {
    data: TKey extends string ? Record<TKey, TValue> : TValue[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    meta: {
      path: string;
      per_page: number;
      next_cursor: string | null;
      next_page_url: string | null;
      prev_cursor: string | null;
      prev_page_url: string | null;
    };
  };
  export type CursorPaginatorInterface<TKey, TValue> =
    Illuminate.CursorPaginator<TKey, TValue>;
  export type LengthAwarePaginator<TKey, TValue> = {
    data: TKey extends string ? Record<TKey, TValue> : TValue[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    meta: {
      total: number;
      current_page: number;
      first_page_url: string;
      from: number | null;
      last_page: number;
      last_page_url: string;
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number | null;
    };
  };
  export type LengthAwarePaginatorInterface<TKey, TValue> =
    Illuminate.LengthAwarePaginator<TKey, TValue>;
}
