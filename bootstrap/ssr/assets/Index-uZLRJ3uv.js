import { t as FrontLayout } from "./FrontLayout-BrNsE2Qd.js";
import { t as SidebarLink } from "./SidebarLink-DX2Pxg-L.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { LuBookmark, LuCheck, LuCog, LuHouse, LuLogOut, LuStar } from "react-icons/lu";
//#region resources/js/Components/UserDash/MainContent.tsx
var MainContent = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "border-border flex-1 border-r p-4",
		children: "MainContent"
	});
};
//#endregion
//#region resources/js/Components/UserDash/SideMenu.tsx
var SideMenu = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "border-border bg-surface flex w-[270px] flex-col border-x p-4",
		children: [
			/* @__PURE__ */ jsxs(SidebarLink, {
				href: "#",
				routeName: "user.dash.index",
				children: [/* @__PURE__ */ jsx(LuHouse, { size: 18 }), " Dashboard"]
			}),
			/* @__PURE__ */ jsxs(SidebarLink, {
				href: "#",
				routeName: "watchlist.index",
				children: [/* @__PURE__ */ jsx(LuBookmark, { size: 18 }), " Watchlist"]
			}),
			/* @__PURE__ */ jsxs(SidebarLink, {
				href: "#",
				routeName: "watchlist.index",
				children: [/* @__PURE__ */ jsx(LuStar, { size: 18 }), " Reviews"]
			}),
			/* @__PURE__ */ jsxs(SidebarLink, {
				href: "#",
				routeName: "watchlist.index",
				children: [/* @__PURE__ */ jsx(LuCheck, { size: 18 }), " My Votes"]
			}),
			/* @__PURE__ */ jsxs(SidebarLink, {
				href: "#",
				routeName: "watchlist.index",
				children: [/* @__PURE__ */ jsx(LuCog, { size: 18 }), " Settings"]
			}),
			/* @__PURE__ */ jsxs(SidebarLink, {
				href: "#",
				routeName: "watchlist.index",
				children: [/* @__PURE__ */ jsx(LuLogOut, { size: 18 }), " Logout"]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-surface-alt my-4 rounded-lg p-4",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-text font-semibold",
						children: "Your Impact"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-text-muted text-sm",
						children: "Thank you for helping make anime a safer space for everyone!"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-text-muted text-sm",
							children: "Votes Submitted"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xl font-semibold",
							children: "127"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-text-muted text-sm",
							children: "Reviews Written"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xl font-semibold",
							children: "127"
						})]
					})
				]
			})
		]
	});
};
//#endregion
//#region resources/js/Pages/UserDash/Index.tsx
var UserDash = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex w-full max-w-7xl flex-1",
		children: [/* @__PURE__ */ jsx(SideMenu, {}), /* @__PURE__ */ jsx(MainContent, {})]
	});
};
UserDash.layout = (page) => /* @__PURE__ */ jsx(FrontLayout, { children: page });
//#endregion
export { UserDash as default };

//# sourceMappingURL=Index-uZLRJ3uv.js.map