import { t as FrontLayout } from "./FrontLayout-BrNsE2Qd.js";
import { Link, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { LuBookmark, LuChevronRight, LuCircleCheck, LuFlame, LuRadio, LuSearch, LuShieldAlert, LuShieldCheck, LuStar, LuUsers, LuVote } from "react-icons/lu";
import "react";
//#region resources/js/Components/Home/Hero.tsx
var Hero = () => {
	const { routes } = usePage().props;
	return /* @__PURE__ */ jsx("div", {
		className: "bg-surface w-full",
		children: /* @__PURE__ */ jsx("div", {
			className: "relative mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8 lg:py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ jsxs("h1", {
						className: "mb-4 font-serif text-4xl font-extrabold tracking-wide xl:text-5xl",
						children: [
							"Know what to expect.",
							" ",
							/* @__PURE__ */ jsx("span", {
								className: "text-primary block sm:inline",
								children: "Enjoy what you love."
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mx-auto max-w-xl text-base text-gray-600",
						children: "Mamorulist provides trigger warning information for anime so you can protect your peace of mind and enjoy what matters to you."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/",
							className: "bg-primary text-surface flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition hover:cursor-pointer hover:opacity-90 sm:w-auto",
							children: "Get Started"
						}), /* @__PURE__ */ jsx(Link, {
							href: routes["browse.index"],
							className: "bg-surface text-primary border-primary flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3 font-semibold transition hover:cursor-pointer hover:bg-gray-50 sm:w-auto",
							children: "Browse Anime"
						})]
					})
				]
			})
		})
	});
};
//#endregion
//#region resources/js/Components/Home/SectionHeader.tsx
var SectionHeader = ({ title, icon }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ jsxs("h2", {
			className: "mb-2 flex items-center gap-2 font-bold text-primary",
			children: [
				icon,
				" ",
				title
			]
		}), /* @__PURE__ */ jsxs(Link, {
			className: "flex items-center text-sm",
			children: ["View All ", /* @__PURE__ */ jsx(LuChevronRight, {})]
		})]
	});
};
//#endregion
//#region resources/js/Components/UI/AnimeCard.tsx
var AnimeCard = ({ animeData }) => {
	return /* @__PURE__ */ jsx(Link, {
		href: "/anime/show",
		className: "group mb-4 block lg:mb-0",
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-surface border-surface-alt group-hover:border-primary-soft flex h-40 overflow-hidden rounded-lg border transition duration-200 group-hover:shadow-sm",
			children: [/* @__PURE__ */ jsx("div", {
				className: "relative h-full w-26.5 shrink-0 overflow-hidden",
				children: /* @__PURE__ */ jsx("img", {
					src: animeData && animeData.images.jpg.image_url,
					alt: animeData && `${animeData.title} cover image`,
					className: "h-full w-full object-cover transition duration-300 group-hover:scale-105"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-1 flex-col overflow-hidden p-3",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "mb-1 line-clamp-2 text-sm leading-snug font-bold md:text-base",
						title: "Anime Title Here Lorem ipsum dolor sit amet.",
						children: animeData && animeData.title
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-text/80 mb-1 truncate text-xs",
						children: [
							animeData && (animeData.year ? `${animeData.year} |` : ""),
							" ",
							animeData && (animeData.episodes ? `${animeData.episodes} episodes |` : ""),
							" ",
							animeData && (animeData.type ?? "")
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-text/80 mb-2 truncate text-xs",
						children: animeData && animeData.genres ? animeData.genres.map((genre) => `${genre.name} `) : ""
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-auto flex flex-wrap gap-1 overflow-hidden",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium",
								children: "Trigger"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium",
								children: "Trigger"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium",
								children: "+3"
							})
						]
					})
				]
			})]
		})
	});
};
//#endregion
//#region resources/js/Components/Home/AnimeList.tsx
var AnimeList = ({ nowAiring, topAnime }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl p-4 lg:py-8",
		children: [
			/* @__PURE__ */ jsx(SectionHeader, {
				title: "Now Airing",
				icon: /* @__PURE__ */ jsx(LuRadio, {
					size: "32px",
					className: "text-primary"
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "now-airing",
				className: "mb-8",
				children: /* @__PURE__ */ jsx("div", {
					className: "gap-4 md:grid md:grid-cols-2 xl:grid-cols-4",
					children: nowAiring && nowAiring.data.map((airing) => /* @__PURE__ */ jsx(AnimeCard, { animeData: airing }, airing.malId))
				})
			}),
			/* @__PURE__ */ jsx(SectionHeader, {
				title: "Top Anime",
				icon: /* @__PURE__ */ jsx(LuFlame, {
					size: "32px",
					className: "text-primary"
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "top",
				className: "mb-4",
				children: /* @__PURE__ */ jsx("div", {
					className: "gap-4 md:grid md:grid-cols-2 xl:grid-cols-4",
					children: topAnime && topAnime.data.map((top) => /* @__PURE__ */ jsx(AnimeCard, { animeData: top }, top.malId))
				})
			})
		]
	});
};
//#endregion
//#region resources/js/Components/Home/Status.tsx
var Status = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "mb-4 flex justify-center px-4 lg:px-16 lg:-mt-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-background border-surface grid grid-cols-2 rounded-lg border sm:grid-cols-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "border-surface flex items-center gap-3.5 border-r border-b px-6 py-4 sm:border-b-0",
					children: [/* @__PURE__ */ jsx(LuUsers, {
						size: 24,
						className: "text-primary shrink-0"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-lg leading-tight font-bold",
						children: "12,500+"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground text-sm",
						children: "Community Members"
					})] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-surface flex items-center gap-3.5 border-b px-6 py-4 sm:border-r sm:border-b-0",
					children: [/* @__PURE__ */ jsx(LuShieldCheck, {
						size: 24,
						className: "text-primary shrink-0"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-lg leading-tight font-bold",
						children: "8,000+"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground text-sm",
						children: "Anime Covered"
					})] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-surface flex items-center gap-3.5 border-r px-6 py-4 sm:border-r",
					children: [/* @__PURE__ */ jsx(LuVote, {
						size: 24,
						className: "text-primary shrink-0"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-lg leading-tight font-bold",
						children: "8,000+"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground text-sm",
						children: "Votes Cast"
					})] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3.5 px-6 py-4",
					children: [/* @__PURE__ */ jsx(LuStar, {
						size: 24,
						className: "text-primary shrink-0"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-lg leading-tight font-bold",
						children: "3,900+"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground text-sm",
						children: "User Reviews"
					})] })]
				})
			]
		})
	});
};
//#endregion
//#region resources/js/Components/Home/Features.tsx
var Features = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl p-4 lg:py-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-8 text-center",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "mb-2 font-serif text-2xl font-bold lg:text-3xl",
				children: "Everything you need to watch with confidence"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-text-muted text-sm lg:text-base",
				children: "Built by anime fans, for anime fans"
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "border-border flex flex-col items-center gap-4 rounded-lg border p-8 text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "bg-background shrink-0 rounded-full p-6",
							children: /* @__PURE__ */ jsx(LuSearch, {
								size: 40,
								className: "text-primary"
							})
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-text text-xl font-semibold",
							children: "Search and Discover"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-text-muted text-base leading-relaxed",
							children: "Find any anime and see community-rated trigger warnings before you start."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-border flex flex-col items-center gap-4 rounded-lg border p-8 text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "bg-background shrink-0 rounded-full p-6",
							children: /* @__PURE__ */ jsx(LuShieldCheck, {
								size: 40,
								className: "text-primary"
							})
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-text text-xl font-semibold",
							children: "Detailed Trigger Info"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-text-muted text-base leading-relaxed",
							children: "See which trigger appear and how frequently based on real user experiences."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-border flex flex-col items-center gap-4 rounded-lg border p-8 text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "bg-background shrink-0 rounded-full p-6",
							children: /* @__PURE__ */ jsx(LuUsers, {
								size: 40,
								className: "text-primary"
							})
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-text text-xl font-semibold",
							children: "Community Driven"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-text-muted text-base leading-relaxed",
							children: "Vote, reviews, help others by sharing your experiences with trigger content."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-border flex flex-col items-center gap-4 rounded-lg border p-8 text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "bg-background shrink-0 rounded-full p-6",
							children: /* @__PURE__ */ jsx(LuBookmark, {
								size: 40,
								className: "text-primary"
							})
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-text text-xl font-semibold",
							children: "Save & Track"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-text-muted text-base leading-relaxed",
							children: "Save anime to your watchlist, track your progress, and manage what you watch."
						})
					]
				})
			]
		})]
	});
};
//#endregion
//#region resources/js/Components/Home/HowItWork.tsx
var HowItWork = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl p-4 lg:py-12",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-text mb-12 text-center font-serif text-2xl font-bold lg:text-3xl",
			children: "How it works"
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-4 lg:gap-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex max-w-62.5 flex-1 flex-col items-center justify-center gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "bg-primary absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md",
							children: "1"
						}), /* @__PURE__ */ jsx("div", {
							className: "bg-surface border-surface-alt flex h-24 w-24 shrink-0 items-center justify-center rounded-full border",
							children: /* @__PURE__ */ jsx(LuSearch, {
								size: 40,
								className: "text-primary"
							})
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-text font-semibold",
							children: "Find an anime"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-text-muted mt-1 text-sm",
							children: "Search for any anime you want to watch."
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hidden h-24 items-center justify-center md:flex",
					children: /* @__PURE__ */ jsx(LuChevronRight, {
						size: 40,
						className: "text-text-muted font-light"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex max-w-62.5 flex-1 flex-col items-center justify-center gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "bg-primary absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md",
							children: "2"
						}), /* @__PURE__ */ jsx("div", {
							className: "bg-surface border-surface-alt flex h-24 w-24 shrink-0 items-center justify-center rounded-full border",
							children: /* @__PURE__ */ jsx(LuShieldCheck, {
								size: 40,
								className: "text-primary"
							})
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-text font-semibold",
							children: "Check trigger warnings"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-text-muted mt-1 text-sm",
							children: "See community-rated triggers and their intensity."
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hidden h-24 items-center justify-center md:flex",
					children: /* @__PURE__ */ jsx(LuChevronRight, {
						size: 40,
						className: "text-text-muted font-light"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex max-w-62.5 flex-1 flex-col items-center justify-center gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "bg-primary absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md",
							children: "3"
						}), /* @__PURE__ */ jsx("div", {
							className: "bg-surface border-surface-alt flex h-24 w-24 shrink-0 items-center justify-center rounded-full border",
							children: /* @__PURE__ */ jsx(LuCircleCheck, {
								size: 40,
								className: "text-primary"
							})
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-text font-semibold",
							children: "Watch with confidence"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-text-muted mt-1 text-sm",
							children: "Make informed choice that are right for you."
						})]
					})]
				})
			]
		})]
	});
};
//#endregion
//#region resources/js/Components/Home/CTA.tsx
var CTA = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "p-4 lg:py-8 mb-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-primary-soft border-surface-alt mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-lg border p-6 text-center md:flex-row md:p-8 md:text-left",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "shrink-0",
					children: /* @__PURE__ */ jsx(LuShieldAlert, {
						size: 70,
						className: "text-primary"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-text font-serif text-2xl font-bold md:text-3xl",
						children: "You're not Alone."
					}), /* @__PURE__ */ jsx("p", {
						className: "text-base opacity-80 md:text-lg",
						children: "Together, we're creating a safer space for anime fans everywhere."
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex shrink-0 flex-col items-center gap-3 md:items-end",
					children: [/* @__PURE__ */ jsx(Link, {
						href: "#",
						className: "bg-primary text-surface inline-flex items-center justify-center rounded-lg px-8 py-3 font-semibold transition-opacity hover:opacity-90",
						children: "Join Mamorulist"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-70",
						children: "Free to join. Always will be."
					})]
				})
			]
		})
	});
};
//#endregion
//#region resources/js/Pages/Home/Index.tsx
var Home = ({ nowAiring, topAnime }) => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx(Status, {}),
		/* @__PURE__ */ jsx(AnimeList, {
			nowAiring,
			topAnime
		}),
		/* @__PURE__ */ jsx(Features, {}),
		/* @__PURE__ */ jsx(HowItWork, {}),
		/* @__PURE__ */ jsx(CTA, {})
	] });
};
Home.layout = (page) => /* @__PURE__ */ jsx(FrontLayout, { children: page });
//#endregion
export { Home as default };

//# sourceMappingURL=Index-eugl-DYW.js.map