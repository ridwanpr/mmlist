import { createInertiaApp } from "@inertiajs/react";
import { Fragment, jsx } from "react/jsx-runtime";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
//#region resources/js/app.tsx
var render = await createInertiaApp({
	strictMode: true,
	resolve: async (name, page) => {
		const module = await (/* @__PURE__ */ Object.assign({
			"./Pages/Anime/Show.tsx": () => import("./assets/Show-qKu3d3Va.js"),
			"./Pages/Auth/Login.tsx": () => import("./assets/Login-DxeS1cjo.js"),
			"./Pages/Auth/Register.tsx": () => import("./assets/Register-Dts8-Azv.js"),
			"./Pages/Backend/Dashboard/Index.tsx": () => import("./assets/Index-C414rf5b.js"),
			"./Pages/Browse/Index.tsx": () => import("./assets/Index-DhQi6Tfy.js"),
			"./Pages/Home/Index.tsx": () => import("./assets/Index-eugl-DYW.js"),
			"./Pages/UserDash/Index.tsx": () => import("./assets/Index-uZLRJ3uv.js")
		}))[`./Pages/${name}.tsx`]?.();
		if (!module) throw new Error(`Page not found: ${name}`);
		return module.default ?? module;
	},
	progress: {
		color: "#445439",
		showSpinner: true
	},
	withApp(app) {
		return /* @__PURE__ */ jsx(Fragment, { children: app });
	}
});
var renderPage = (page) => render(page, renderToString);
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=app.js.map