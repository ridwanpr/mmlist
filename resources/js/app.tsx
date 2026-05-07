import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
  strictMode: true,
  pages: {
    path: "./Pages",
    extension: ".tsx",
    lazy: true,
  },
  progress: {
    color: "#445439",
    showSpinner: true,
  },
  withApp(app) {
    return <>{app}</>;
  },
});
