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
      readonly slug: string | null;
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
    export type LoginData = {
      readonly username: string;
      readonly password: string;
    };
    export type RegisterData = {
      readonly username: string;
      readonly name: string;
      readonly email: string;
      readonly password: string;
    };
    export type UserData = {
      readonly id: number;
      readonly name: string;
      readonly username: string;
      readonly email: string | null;
      readonly createdAt: string | null;
      readonly roleId: string;
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
