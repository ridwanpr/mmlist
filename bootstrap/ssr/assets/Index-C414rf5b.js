import { t as SidebarLink } from "./SidebarLink-DX2Pxg-L.js";
import { Link, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { LuBook, LuBookA, LuCog, LuFolder, LuHouse, LuMegaphone, LuMenu, LuMessageCircle, LuMessageSquareDiff, LuTag, LuUsers, LuVote } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
//#region resources/js/Components/UI/AdminSidebar.tsx
var AdminSidebar = ({ isOpen }) => {
	const { routes } = usePage().props;
	return /* @__PURE__ */ jsxs("div", {
		className: `bg-background border-border z-50 min-h-screen w-[270px] flex-col gap-4 border-r p-4 ${isOpen ? "absolute flex lg:static" : "hidden"}`,
		children: [/* @__PURE__ */ jsx(Link, {
			href: routes["dashboard.index"],
			className: "text-primary mb-2 text-center font-serif text-2xl font-bold",
			children: "Mamorulist"
		}), /* @__PURE__ */ jsxs("nav", {
			className: "flex flex-col",
			children: [
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: routes["dashboard.index"],
					routeName: "dashboard.index",
					children: [/* @__PURE__ */ jsx(LuHouse, { size: 18 }), " Overview"]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "my-2 px-3 text-sm",
					children: "Content"
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "anime.index",
					children: [/* @__PURE__ */ jsx(LuFolder, { size: 18 }), " Anime"]
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "genres.index",
					children: [/* @__PURE__ */ jsx(LuTag, { size: 18 }), " Genres"]
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "triggers.index",
					children: [/* @__PURE__ */ jsx(LuBook, { size: 18 }), " Trigger"]
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "trigger-categories.index",
					children: [/* @__PURE__ */ jsx(LuBookA, { size: 18 }), " Trigger Categories"]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "my-2 px-3 text-sm",
					children: "Community"
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "users.index",
					children: [/* @__PURE__ */ jsx(LuUsers, { size: 18 }), " Users"]
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "votes.index",
					children: [/* @__PURE__ */ jsx(LuVote, { size: 18 }), " Votes"]
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "reviews.index",
					children: [/* @__PURE__ */ jsx(LuMessageSquareDiff, { size: 18 }), " Reviews"]
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "comments.index",
					children: [/* @__PURE__ */ jsx(LuMessageCircle, { size: 18 }), " Comments"]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "my-2 px-3 text-sm",
					children: "System"
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "announcements.index",
					children: [/* @__PURE__ */ jsx(LuMegaphone, { size: 18 }), " Announcement"]
				}),
				/* @__PURE__ */ jsxs(SidebarLink, {
					href: "#",
					routeName: "settings.index",
					children: [/* @__PURE__ */ jsx(LuCog, { size: 18 }), " Settings"]
				})
			]
		})]
	});
};
//#endregion
//#region resources/js/Layouts/BackLayout.tsx
var BackLayout = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { flash } = usePage();
	useEffect(() => {
		if (window.innerWidth < 1024) setIsSidebarOpen(false);
	}, []);
	useEffect(() => {
		if (flash.success) toast.success(flash.success);
		if (flash.error) toast.error(flash.error);
		if (flash.warning) toast.warning(flash.warning);
		if (flash.info) toast.info(flash.info);
	}, [flash]);
	const toggleSidebar = () => {
		if (isSidebarOpen) setIsSidebarOpen(false);
		else setIsSidebarOpen(true);
	};
	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-screen",
		children: [
			/* @__PURE__ */ jsx(Toaster, {
				position: "top-right",
				richColors: true
			}),
			isSidebarOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
				onClick: closeSidebar
			}),
			/* @__PURE__ */ jsx(AdminSidebar, { isOpen: isSidebarOpen }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-background border-border flex items-center justify-between border-b p-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "hover:cursor-pointer",
						onClick: toggleSidebar,
						children: /* @__PURE__ */ jsx(LuMenu, { size: 24 })
					}), /* @__PURE__ */ jsxs(Popover, {
						className: "relative",
						children: [/* @__PURE__ */ jsx(PopoverButton, {
							className: "px-2 font-medium outline-none hover:cursor-pointer",
							children: "Admin 1"
						}), /* @__PURE__ */ jsx(PopoverPanel, {
							anchor: "bottom start",
							className: "bg-background border-border flex flex-col rounded-lg border p-2 opacity-100 shadow hover:cursor-pointer",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/logout",
								method: "post",
								as: "button",
								className: "text-sm font-semibold text-red-500 hover:cursor-pointer",
								children: "Logout"
							})
						})]
					})]
				}), /* @__PURE__ */ jsx("main", {
					className: "bg-surface flex-1 p-4",
					children
				})]
			})
		]
	});
};
//#endregion
//#region resources/js/Pages/Backend/Dashboard/Index.tsx
var Dashboard = () => {
	return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: "Overview" }) });
};
Dashboard.layout = (page) => /* @__PURE__ */ jsx(BackLayout, { children: page });
//#endregion
export { Dashboard as default };

//# sourceMappingURL=Index-C414rf5b.js.map