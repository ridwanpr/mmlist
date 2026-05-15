import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
  strictMode: true,
  pages: {
    path: "./Pages",
    extension: ".tsx",
    lazy: true,
  },
  progress: {
    color: "#b34d56",
    showSpinner: true,
  },
  withApp(app) {
    return <>{app}</>;
  },
});
