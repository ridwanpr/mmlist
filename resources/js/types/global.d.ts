import "@inertiajs/core";

declare module "@inertiajs/core" {
  export interface InertiaConfig {
    sharedPageProps: {
      routes: {
        "home.index": string;
        "browse.index": string;
        "auth.register": string;
        login: string;
        "dashboard.index": string;
        "user.dash.index": string;
        "watchlist.store": string;
      };
      currentRoute: string | null;
      auth: {
        user: {
          id: number;
          name: string;
          username: string;
          role_id: string;
          votes_count: number;
          joined_at: string;
        } | null;
      };
    };
    flashDataType: {
      success?: string | null;
      error?: string | null;
      warning?: string | null;
      info?: string | null;
    };
  }
}
