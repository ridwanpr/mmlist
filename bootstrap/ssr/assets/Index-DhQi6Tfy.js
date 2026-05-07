import { t as FrontLayout } from "./FrontLayout-BrNsE2Qd.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { LuArrowDownUp, LuChevronDown, LuFilter, LuX } from "react-icons/lu";
import { useState } from "react";
import { Checkbox, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Field, Label, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
//#region resources/js/Components/UI/RefineCheckbox.tsx
var RefineCheckbox = ({ label, count, checked = false, onChange = () => {} }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: "group/row flex items-center justify-between",
		children: [/* @__PURE__ */ jsxs(Field, {
			className: "flex cursor-pointer items-center gap-3",
			children: [/* @__PURE__ */ jsx(Checkbox, {
				checked,
				onChange,
				className: "bg-surface-alt border-border data-checked:bg-primary data-checked:border-primary focus-visible:ring-primary-soft block size-4 rounded border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
				children: /* @__PURE__ */ jsx("svg", {
					className: "stroke-surface opacity-0 transition-opacity data-checked:opacity-100",
					viewBox: "0 0 14 14",
					fill: "none",
					children: /* @__PURE__ */ jsx("path", {
						d: "M3 8L6 11L11 3.5",
						strokeWidth: 2,
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}), /* @__PURE__ */ jsx(Label, {
				className: "text-text group-hover/row:text-primary-dark cursor-pointer text-sm font-medium transition-colors select-none",
				children: label
			})]
		}), count && /* @__PURE__ */ jsx("p", {
			className: "text-text-muted text-xs",
			children: count
		})]
	});
};
//#endregion
//#region resources/js/Components/UI/DropdownMenu.tsx
var DropdownMenu = ({ title, items }) => {
	return /* @__PURE__ */ jsxs(Menu, { children: [/* @__PURE__ */ jsxs(MenuButton, {
		className: "bg-surface border-border hover:bg-surface-alt flex items-center justify-center gap-2 rounded-lg border px-4 py-2 transition-colors focus:ring-2 focus:ring-blue-500/50 focus:outline-none w-full",
		children: [title, /* @__PURE__ */ jsx(LuChevronDown, { className: "text-muted-foreground h-4 w-4" })]
	}), /* @__PURE__ */ jsx(MenuItems, {
		transition: true,
		anchor: "bottom start",
		className: "bg-surface border-border z-50 mt-2 w-48 origin-top-left rounded-xl border p-1.5 shadow-lg transition duration-150 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0",
		children: items.map((item, index) => /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx("button", {
			onClick: item.onClick,
			className: "text-foreground data-focus:bg-surface-alt flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
			children: item.label
		}) }, index))
	})] });
};
//#endregion
//#region resources/js/Components/Browse/RefineResults.tsx
var RefineResults = () => {
	const [clear, setClear] = useState(false);
	const [fromYear, setFromYear] = useState("From");
	const [toYear, setToYear] = useState("To");
	const hardcodedYears = [
		"2026",
		"2025",
		"2024",
		"2023"
	];
	const fromItems = hardcodedYears.map((year) => ({
		label: year,
		onClick: () => setFromYear(year)
	}));
	const toItems = hardcodedYears.map((year) => ({
		label: year,
		onClick: () => setToYear(year)
	}));
	const handleClearAll = () => {
		setFromYear("From");
		setToYear("To");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-background border-border hidden self-start rounded-lg border p-5 lg:flex lg:w-64 lg:flex-col lg:gap-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "border-border flex w-full items-center justify-between border-b pb-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-text font-bold",
					children: "Refine Results"
				}), /* @__PURE__ */ jsx("button", {
					onClick: handleClearAll,
					className: "text-primary hover:text-primary-dark text-sm font-semibold transition-colors focus:outline-none",
					children: "Clear All"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-text text-sm font-bold",
					children: "Genre"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2.5",
					children: [
						/* @__PURE__ */ jsx(RefineCheckbox, {
							label: "Action",
							count: "142"
						}),
						/* @__PURE__ */ jsx(RefineCheckbox, {
							label: "Adventure",
							count: "389"
						}),
						/* @__PURE__ */ jsx(RefineCheckbox, {
							label: "Drama",
							count: "501"
						}),
						/* @__PURE__ */ jsx(RefineCheckbox, {
							label: "Fantasy",
							count: "422"
						}),
						/* @__PURE__ */ jsx(RefineCheckbox, {
							label: "Romance",
							count: "194"
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-text text-sm font-bold",
					children: "Year"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex-1",
							children: /* @__PURE__ */ jsx(DropdownMenu, {
								title: fromYear,
								items: fromItems
							})
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-border font-medium",
							children: "-"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex-1",
							children: /* @__PURE__ */ jsx(DropdownMenu, {
								title: toYear,
								items: toItems
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-text text-sm font-bold",
					children: "Number of Episodes"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2.5",
					children: [
						/* @__PURE__ */ jsx(RefineCheckbox, { label: "1 - 25" }),
						/* @__PURE__ */ jsx(RefineCheckbox, { label: "25 - 50" }),
						/* @__PURE__ */ jsx(RefineCheckbox, { label: "51 - 100" }),
						/* @__PURE__ */ jsx(RefineCheckbox, { label: "100+" })
					]
				})]
			})
		]
	});
};
//#endregion
//#region resources/js/Components/Browse/AnimeList.tsx
var AnimeList = () => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl p-4 lg:pt-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-4 font-semibold",
			children: "1,248 anime found"
		}), /* @__PURE__ */ jsxs("div", {
			className: "lg:flex lg:gap-4",
			children: [/* @__PURE__ */ jsx(RefineResults, {}), /* @__PURE__ */ jsx("div", {
				className: "lg:flex-3",
				children: /* @__PURE__ */ jsx("div", { className: "gap-4 md:grid md:grid-cols-2 lg:grid-cols-3" })
			})]
		})]
	}) });
};
//#endregion
//#region resources/js/Components/UI/ModalDialog.tsx
var ModalDialog = ({ isOpen, setIsOpen, title, children }) => {
	return /* @__PURE__ */ jsxs(Dialog, {
		open: isOpen,
		onClose: () => setIsOpen(false),
		className: "relative z-50",
		children: [/* @__PURE__ */ jsx(DialogBackdrop, { className: "fixed inset-0 bg-black/50 transition-opacity" }), /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 flex w-screen items-center justify-center p-4 sm:p-0",
			children: /* @__PURE__ */ jsxs(DialogPanel, {
				className: "bg-surface border-border flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border shadow-xl",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "border-border flex items-center justify-between border-b p-4",
						children: [/* @__PURE__ */ jsx(DialogTitle, {
							className: "text-lg font-bold",
							children: title
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setIsOpen(false),
							className: "hover:bg-surface-alt rounded-full p-2 transition-colors",
							children: /* @__PURE__ */ jsx(LuX, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex-1 overflow-y-auto p-4",
						children
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-border flex gap-3 border-t p-4",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setIsOpen(false),
							className: "border-border hover:bg-surface-alt flex-1 rounded-lg border py-2.5 font-medium transition-colors",
							children: "Clear All"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setIsOpen(false),
							className: "bg-primary flex-1 rounded-lg py-2.5 font-medium text-white transition-colors",
							children: "Apply Filters"
						})]
					})
				]
			})
		})]
	});
};
//#endregion
//#region resources/js/Components/Browse/SearchSection.tsx
var SearchSection = () => {
	let [isOpen, setIsOpen] = useState(false);
	const genreOptions = [
		{
			label: "Action",
			onClick: () => console.log("Action clicked")
		},
		{
			label: "Adventure",
			onClick: () => console.log("Adventure clicked")
		},
		{
			label: "Comedy",
			onClick: () => console.log("Comedy clicked")
		}
	];
	const yearOptions = [{
		label: "2024",
		onClick: () => console.log("2024 clicked")
	}, {
		label: "2023",
		onClick: () => console.log("2023 clicked")
	}];
	return /* @__PURE__ */ jsx("div", {
		className: "bg-surface",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl p-4 lg:pt-8 lg:pb-6",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-text mb-2 font-serif text-2xl font-bold",
					children: "Browse Anime"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-text-muted mb-4",
					children: "Find anime and view trigger warnings to make informed choices."
				}),
				/* @__PURE__ */ jsx("input", {
					type: "text",
					className: "border-border mb-4 w-full rounded-lg border-2 p-3",
					placeholder: "Search anime..."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex w-full items-center gap-4",
					children: [
						/* @__PURE__ */ jsxs("button", {
							onClick: () => setIsOpen(true),
							className: "bg-surface-alt border-border flex flex-1 items-center justify-center gap-1 rounded-lg border p-3 lg:hidden",
							children: [/* @__PURE__ */ jsx(LuFilter, {}), " Filter"]
						}),
						/* @__PURE__ */ jsx(ModalDialog, {
							isOpen,
							setIsOpen,
							title: "Filter Anime",
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-6",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-3 text-sm font-semibold text-gray-500",
									children: "Genre"
								}), /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-2",
									children: genreOptions.map((genre) => /* @__PURE__ */ jsx("button", {
										onClick: genre.onClick,
										className: "border-border hover:bg-surface-alt rounded-full border px-4 py-1.5 text-sm transition-colors focus:border-blue-500 focus:bg-blue-100",
										children: genre.label
									}, genre.label))
								})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-3 text-sm font-semibold text-gray-500",
									children: "Year"
								}), /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-2",
									children: yearOptions.map((year) => /* @__PURE__ */ jsx("button", {
										onClick: year.onClick,
										className: "border-border hover:bg-surface-alt rounded-full border px-4 py-1.5 text-sm transition-colors focus:border-blue-500 focus:bg-blue-100",
										children: year.label
									}, year.label))
								})] })]
							})
						}),
						/* @__PURE__ */ jsxs("button", {
							className: "bg-surface border-border flex flex-1 items-center justify-center gap-1 rounded-lg border p-3 lg:hidden",
							children: [/* @__PURE__ */ jsx(LuArrowDownUp, {}), " Sort"]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "hidden lg:flex lg:gap-3",
							children: [
								/* @__PURE__ */ jsx(DropdownMenu, {
									title: "Genre",
									items: genreOptions
								}),
								/* @__PURE__ */ jsx(DropdownMenu, {
									title: "Year",
									items: yearOptions
								}),
								/* @__PURE__ */ jsxs("button", {
									className: "bg-surface border-border flex items-center justify-center gap-2 rounded-lg border px-4 py-2",
									children: ["Studio ", /* @__PURE__ */ jsx(LuChevronDown, { className: "text-muted-foreground h-4 w-4" })]
								}),
								/* @__PURE__ */ jsxs("button", {
									className: "bg-surface border-border flex items-center justify-center gap-2 rounded-lg border px-4 py-2",
									children: ["Rating ", /* @__PURE__ */ jsx(LuChevronDown, { className: "text-muted-foreground h-4 w-4" })]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "ml-auto hidden lg:flex lg:items-center lg:gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-sm font-medium",
								children: "Sort by"
							}), /* @__PURE__ */ jsxs("button", {
								className: "bg-surface border-border flex items-center justify-center gap-2 rounded-lg border px-4 py-2",
								children: [
									/* @__PURE__ */ jsx(LuArrowDownUp, { className: "h-4 w-4" }),
									" Default",
									" ",
									/* @__PURE__ */ jsx(LuChevronDown, { className: "text-muted-foreground h-4 w-4" })
								]
							})]
						})
					]
				})
			]
		})
	});
};
//#endregion
//#region resources/js/Pages/Browse/Index.tsx
var Browse = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ jsx(SearchSection, {}), /* @__PURE__ */ jsx(AnimeList, {})]
	});
};
Browse.layout = (page) => /* @__PURE__ */ jsx(FrontLayout, { children: page });
//#endregion
export { Browse as default };

//# sourceMappingURL=Index-DhQi6Tfy.js.map