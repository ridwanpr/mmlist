import { Link, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { LuBookmark, LuHouse, LuList, LuSearch, LuUser } from "react-icons/lu";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
//#region resources/js/Components/UI/DekstopNav.tsx
var DekstopNav = () => {
	const { routes, auth } = usePage().props;
	const { component } = usePage();
	return /* @__PURE__ */ jsx("div", {
		className: "bg-surface hidden lg:flex border border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex w-full max-w-7xl items-center justify-between p-4",
			children: [
				/* @__PURE__ */ jsx(Link, {
					href: routes["home.index"],
					className: "text-primary font-serif text-2xl font-bold tracking-wider",
					children: "Mamorulist"
				}),
				/* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", {
					className: "flex items-center gap-8",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							href: routes["home.index"],
							className: component === "Home/Index" ? "text-accent-gold text-sm font-bold" : "text-sm font-semibold",
							children: "Home"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							href: routes["browse.index"],
							className: component.startsWith("Browse/") ? "text-accent-gold text-sm font-bold" : "text-sm font-semibold",
							children: "Browse Anime"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							href: "#",
							className: "text-sm font-semibold",
							children: "Trigger List"
						}) })
					]
				}) }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("input", {
						type: "text",
						className: "border-primary rounded-md border px-2 py-1 placeholder:text-sm",
						placeholder: "Search anime..."
					}), /* @__PURE__ */ jsx("div", { children: !auth.user ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
						href: routes["auth.register"],
						className: "bg-primary text-surface mr-2 rounded-md p-2 text-sm font-medium",
						children: "Register"
					}), /* @__PURE__ */ jsx(Link, {
						href: routes["login"],
						className: "bg-accent-gold text-surface rounded-md p-2 text-sm font-medium",
						children: "Login"
					})] }) : /* @__PURE__ */ jsx(Link, {
						href: routes["user.dash.index"],
						className: "bg-primary text-surface mr-2 rounded-md p-2 text-sm font-medium",
						children: "My Account"
					}) })]
				})
			]
		})
	});
};
//#endregion
//#region resources/js/Components/UI/Footer.tsx
var Footer = () => {
	return /* @__PURE__ */ jsx("footer", {
		className: "bg-background border-primary/10 border-t pb-20 lg:pb-0",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl px-4 py-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/",
							className: "text-primary text-xl font-bold tracking-tight",
							children: "Mamorulist"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-primary-dark max-w-sm text-xs",
							children: "Helping anime fans make informed content choices."
						})]
					}),
					/* @__PURE__ */ jsxs("nav", {
						className: "flex flex-wrap gap-x-8 gap-y-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex gap-4",
							children: [
								/* @__PURE__ */ jsx(Link, {
									href: "/faq",
									className: "text-primary-dark hover:text-primary text-sm transition-colors",
									children: "FAQ"
								}),
								/* @__PURE__ */ jsx(Link, {
									href: "/about",
									className: "text-primary-dark hover:text-primary text-sm transition-colors",
									children: "About"
								}),
								/* @__PURE__ */ jsx(Link, {
									href: "/contact",
									className: "text-primary-dark hover:text-primary text-sm transition-colors",
									children: "Contact"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "border-primary/10 flex gap-4 lg:border-l lg:pl-8",
							children: [/* @__PURE__ */ jsx(Link, {
								href: "/tos",
								className: "text-primary-dark hover:text-primary text-sm transition-colors",
								children: "Terms"
							}), /* @__PURE__ */ jsx(Link, {
								href: "/privacy",
								className: "text-primary-dark hover:text-primary text-sm transition-colors",
								children: "Privacy"
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-primary-dark text-xs opacity-70",
						children: "© Mamorulist"
					})
				]
			})
		})
	});
};
//#endregion
//#region resources/js/Components/UI/MobileNav.tsx
var MobileNav = () => {
	const { routes } = usePage().props;
	const { component } = usePage();
	return /* @__PURE__ */ jsx("div", {
		className: "bg-surface border-border fixed bottom-0 left-0 z-50 w-full border-t px-6 py-4",
		children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", {
			className: "flex items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
					href: routes["home.index"],
					className: `flex flex-col items-center ${component === "Home/Index" ? "text-primary" : "text-text"}`,
					children: [/* @__PURE__ */ jsx(LuHouse, { size: "20px" }), /* @__PURE__ */ jsx("span", {
						className: "text-xs",
						children: "Home"
					})]
				}) }),
				/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
					href: routes["browse.index"],
					className: `flex flex-col items-center ${component.startsWith("Browse/") ? "text-primary" : "text-text"}`,
					children: [/* @__PURE__ */ jsx(LuSearch, { size: "20px" }), /* @__PURE__ */ jsx("span", {
						className: "text-xs",
						children: "Browse"
					})]
				}) }),
				/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
					href: "#",
					className: "text-text flex flex-col items-center",
					children: [/* @__PURE__ */ jsx(LuList, { size: "20px" }), /* @__PURE__ */ jsx("span", {
						className: "text-xs",
						children: "Trigger"
					})]
				}) }),
				/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
					href: "#",
					className: "text-text flex flex-col items-center",
					children: [/* @__PURE__ */ jsx(LuBookmark, { size: "20px" }), /* @__PURE__ */ jsx("span", {
						className: "text-xs",
						children: "Watchlist"
					})]
				}) }),
				/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
					href: "#",
					className: "text-text flex flex-col items-center",
					children: [/* @__PURE__ */ jsx(LuUser, { size: "20px" }), /* @__PURE__ */ jsx("span", {
						className: "text-xs",
						children: "Profile"
					})]
				}) })
			]
		}) })
	});
};
//#endregion
//#region resources/js/Layouts/FrontLayout.tsx
var FrontLayout = ({ children }) => {
	const { flash } = usePage();
	useEffect(() => {
		if (flash.success) toast.success(flash.success);
		if (flash.error) toast.error(flash.error);
		if (flash.warning) toast.warning(flash.warning);
		if (flash.info) toast.info(flash.info);
	}, [flash]);
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ jsx(Toaster, {
				position: "top-right",
				richColors: true
			}),
			/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(DekstopNav, {}) }),
			/* @__PURE__ */ jsx("main", {
				className: "flex flex-1 flex-col",
				children
			}),
			/* @__PURE__ */ jsx("div", {
				className: "lg:hidden",
				children: /* @__PURE__ */ jsx(MobileNav, {})
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	}) });
};
//#endregion
export { FrontLayout as t };

//# sourceMappingURL=FrontLayout-BrNsE2Qd.js.map