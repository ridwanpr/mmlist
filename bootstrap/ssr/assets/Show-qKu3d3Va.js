import { t as FrontLayout } from "./FrontLayout-BrNsE2Qd.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { LuBookmark, LuChevronRight, LuInfo, LuShare2 } from "react-icons/lu";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
//#region resources/js/Components/Anime/TriggerWarning.tsx
var TriggerWarning = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-8 flex flex-col gap-4",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
			className: "text-text text-xl font-semibold",
			children: "Trigger Warnings"
		}), /* @__PURE__ */ jsxs("p", {
			className: "text-text-muted flex flex-wrap items-center gap-1 text-sm",
			children: ["The community helps identify and rate the presence of potentially distressing content in this anime.", /* @__PURE__ */ jsx("span", {
				className: "font-bold italic",
				children: "Click each trigger for more details."
			})]
		})] }), /* @__PURE__ */ jsx("div", {
			className: "flex w-full flex-col gap-2",
			children: /* @__PURE__ */ jsxs(Disclosure, {
				as: "div",
				className: "border-border w-full rounded-lg border",
				children: [/* @__PURE__ */ jsxs(DisclosureButton, {
					className: "border-border hover:bg-surface-alt bg-surface flex w-full flex-col items-start justify-between gap-4 rounded-lg border p-3 text-left hover:cursor-pointer md:flex-row md:items-center md:gap-2",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-start gap-3 md:items-center",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-semibold",
							children: "Violence and Gore"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-text/90 mt-1 text-sm md:mt-0",
							children: "Physical harm, bloodshed, torture, war violence, executions and more."
						})] })
					}), /* @__PURE__ */ jsxs("div", {
						className: "border-border mt-1 flex w-full items-center justify-between gap-3 border-t pt-3 md:mt-0 md:w-auto md:justify-end md:border-none md:pt-0",
						children: [/* @__PURE__ */ jsx("div", {
							className: "rounded bg-red-100 px-2 py-1 text-sm font-bold text-red-400",
							children: "Severe"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold whitespace-nowrap",
							children: "1,829 Votes"
						})]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-hidden",
					children: /* @__PURE__ */ jsxs(DisclosurePanel, {
						transition: true,
						className: "origin-top p-3 transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0 md:p-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mb-4 flex flex-col gap-2",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold",
									children: "Specific Triggers"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-text-muted mb-2 hidden grid-cols-12 gap-4 px-3 text-xs font-semibold md:grid",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "col-span-3",
										children: "Trigger"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "col-span-6",
										children: "Explanation"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "col-span-2",
										children: "Severity"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "col-span-1 text-right",
										children: "Votes"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3",
								children: [/* @__PURE__ */ jsxs(Disclosure, {
									as: "div",
									className: "border-border w-full rounded-lg border",
									children: [/* @__PURE__ */ jsxs(DisclosureButton, {
										className: "border-border hover:bg-surface-alt bg-surface grid w-full grid-cols-1 items-start gap-2 rounded-lg border p-3 text-left hover:cursor-pointer md:grid-cols-12 md:items-center md:gap-4",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex w-full items-center justify-between md:col-span-3 md:block",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-bold md:font-medium",
													children: "Character Death"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs font-bold text-yellow-500 md:hidden",
													children: "Very Severe"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-text/80 text-sm md:col-span-6 md:text-current",
												children: "Main or Side Character die in battle and other violent situations."
											}),
											/* @__PURE__ */ jsx("p", {
												className: "col-span-2 hidden text-sm font-medium text-yellow-500 md:block",
												children: "Very Severe"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "border-border/50 mt-2 flex w-full items-center justify-between border-t pt-2 md:col-span-1 md:mt-0 md:block md:border-none md:pt-0",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-text-muted text-xs md:hidden",
													children: "Votes"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-sm font-medium md:text-right",
													children: "1,756"
												})]
											})
										]
									}), /* @__PURE__ */ jsxs(DisclosurePanel, {
										className: "bg-surface-alt/30 border-border rounded-b-lg border-t p-4",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "mb-6 flex flex-col gap-1 text-sm md:flex-row md:items-center md:gap-2",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-text font-bold",
												children: "What do you think?"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-text-muted",
												children: "Your vote helps keep warnings accurate."
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex flex-col gap-3",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-medium",
													children: "Did this trigger appear?"
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ jsx("button", {
														className: "border-accent-red text-accent-red hover:bg-accent-red/10 flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:py-1.5",
														children: "Yes"
													}), /* @__PURE__ */ jsx("button", {
														className: "border-primary text-primary hover:bg-primary/10 flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:py-1.5",
														children: "No"
													})]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col gap-3 md:col-span-2",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-medium",
													children: "How severe was it?"
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ jsx("button", {
															className: "min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-mild) px-2 py-2 text-sm font-semibold text-(--color-severity-mild) transition-colors hover:cursor-pointer hover:bg-(--color-severity-mild)/10 md:flex-none md:py-1.5",
															children: "Mild"
														}),
														/* @__PURE__ */ jsx("button", {
															className: "min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-moderate) px-2 py-2 text-sm font-semibold text-(--color-severity-moderate) transition-colors hover:cursor-pointer hover:bg-(--color-severity-moderate)/10 md:flex-none md:py-1.5",
															children: "Moderate"
														}),
														/* @__PURE__ */ jsx("button", {
															className: "min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-high) px-2 py-2 text-sm font-semibold text-(--color-severity-high) transition-colors hover:cursor-pointer hover:bg-(--color-severity-high)/10 md:flex-none md:py-1.5",
															children: "Severe"
														}),
														/* @__PURE__ */ jsx("button", {
															className: "border-severity-severe text-severity-severe hover:bg-severity-severe/10 min-w-25 flex-1 rounded-lg border-2 px-2 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:flex-none md:py-1.5",
															children: "Very Severe"
														})
													]
												})]
											})]
										})]
									})]
								}), /* @__PURE__ */ jsxs(Disclosure, {
									as: "div",
									className: "border-border w-full rounded-lg border",
									children: [/* @__PURE__ */ jsxs(DisclosureButton, {
										className: "border-border hover:bg-surface-alt bg-surface grid w-full grid-cols-1 items-start gap-2 rounded-lg border p-3 text-left hover:cursor-pointer md:grid-cols-12 md:items-center md:gap-4",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex w-full items-center justify-between md:col-span-3 md:block",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-bold md:font-medium",
													children: "Graphic Gore"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs font-bold text-red-500 md:hidden",
													children: "Severe"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-text/80 text-sm md:col-span-6 md:text-current",
												children: "Detailed depictions of blood, organs, and severe bodily injuries."
											}),
											/* @__PURE__ */ jsx("p", {
												className: "col-span-2 hidden text-sm font-medium text-red-500 md:block",
												children: "Severe"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "border-border/50 mt-2 flex w-full items-center justify-between border-t pt-2 md:col-span-1 md:mt-0 md:block md:border-none md:pt-0",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-text-muted text-xs md:hidden",
													children: "Votes"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-sm font-medium md:text-right",
													children: "1,756"
												})]
											})
										]
									}), /* @__PURE__ */ jsxs(DisclosurePanel, {
										className: "bg-surface-alt/30 border-border rounded-b-lg border-t p-4",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "mb-6 flex flex-col gap-1 text-sm md:flex-row md:items-center md:gap-2",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-text font-bold",
												children: "What do you think?"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-text-muted",
												children: "Your vote helps keep warnings accurate."
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex flex-col gap-3",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-medium",
													children: "Did this trigger appear?"
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ jsx("button", {
														className: "border-accent-red text-accent-red hover:bg-accent-red/10 flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:py-1.5",
														children: "Yes"
													}), /* @__PURE__ */ jsx("button", {
														className: "border-primary text-primary hover:bg-primary/10 flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:py-1.5",
														children: "No"
													})]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col gap-3 md:col-span-2",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-medium",
													children: "How severe was it?"
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ jsx("button", {
															className: "min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-mild) px-2 py-2 text-sm font-semibold text-(--color-severity-mild) transition-colors hover:cursor-pointer hover:bg-(--color-severity-mild)/10 md:flex-none md:py-1.5",
															children: "Mild"
														}),
														/* @__PURE__ */ jsx("button", {
															className: "min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-moderate) px-2 py-2 text-sm font-semibold text-(--color-severity-moderate) transition-colors hover:cursor-pointer hover:bg-(--color-severity-moderate)/10 md:flex-none md:py-1.5",
															children: "Moderate"
														}),
														/* @__PURE__ */ jsx("button", {
															className: "min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-high) px-2 py-2 text-sm font-semibold text-(--color-severity-high) transition-colors hover:cursor-pointer hover:bg-(--color-severity-high)/10 md:flex-none md:py-1.5",
															children: "Severe"
														}),
														/* @__PURE__ */ jsx("button", {
															className: "border-severity-severe text-severity-severe hover:bg-severity-severe/10 min-w-25 flex-1 rounded-lg border-2 px-2 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:flex-none md:py-1.5",
															children: "Very Severe"
														})
													]
												})]
											})]
										})]
									})]
								})]
							})
						]
					})
				})]
			})
		})]
	});
};
//#endregion
//#region resources/js/Pages/Anime/Show.tsx
var ShowAnime = () => {
	const triggerData = [
		{
			name: "Violence & Gore",
			level: 5,
			label: "Very Severe"
		},
		{
			name: "Sexual Violence",
			level: 5,
			label: "Severe"
		},
		{
			name: "Suicide & Self-Harm",
			level: 4,
			label: "Moderate"
		},
		{
			name: "Body Horror",
			level: 4,
			label: "Mild"
		},
		{
			name: "Bullying & Abuse",
			level: 3,
			label: "None"
		}
	];
	const getColorTheme = (level) => {
		switch (level) {
			case 1: return {
				bg: "bg-emerald-500",
				text: "text-emerald-500"
			};
			case 2: return {
				bg: "bg-yellow-500",
				text: "text-yellow-500"
			};
			case 3: return {
				bg: "bg-amber-500",
				text: "text-amber-500"
			};
			case 4: return {
				bg: "bg-orange-500",
				text: "text-orange-500"
			};
			case 5: return {
				bg: "bg-red-600",
				text: "text-red-600"
			};
			default: return {
				bg: "bg-text-muted",
				text: "text-text-muted"
			};
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl p-4 lg:pt-6 lg:pb-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "text-text-muted mb-4 flex items-center gap-2 text-sm font-semibold",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "hover:text-primary cursor-pointer transition-colors",
					children: "Home"
				}),
				/* @__PURE__ */ jsx(LuChevronRight, { size: 16 }),
				/* @__PURE__ */ jsx("span", {
					className: "hover:text-primary cursor-pointer transition-colors",
					children: "Anime"
				}),
				/* @__PURE__ */ jsx(LuChevronRight, { size: 16 }),
				/* @__PURE__ */ jsx("span", {
					className: "text-text",
					children: "Attack on Titan"
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 lg:col-span-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-5 md:flex-row",
					children: [/* @__PURE__ */ jsx("div", {
						className: "shrink-0",
						children: /* @__PURE__ */ jsx("img", {
							src: "/assets/img/dummy-cover.jpg",
							alt: "cover anime image",
							className: "mx-auto w-40 rounded-lg object-cover shadow-sm md:w-56"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col",
						children: [
							/* @__PURE__ */ jsx("h1", {
								className: "text-text text-2xl leading-tight font-bold lg:text-3xl",
								children: "Attack on Titan"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-primary mb-1.5 text-sm font-semibold lg:text-base",
								children: "Shingeki no Kyojin"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-4 flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "border-border bg-primary text-primary-soft rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase",
										children: "Movie"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium",
										children: "2021"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium",
										children: "Action, Drama, Fantasy"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium",
										children: "4 Seasons"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium",
										children: "94 Episodes"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-5 flex gap-2.5",
								children: [/* @__PURE__ */ jsxs("button", {
									className: "bg-primary text-surface flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90 active:scale-95",
									children: [/* @__PURE__ */ jsx(LuBookmark, { size: 18 }), "Add to Watchlist"]
								}), /* @__PURE__ */ jsxs("button", {
									className: "text-primary border-primary-soft hover:bg-surface-alt flex items-center gap-1.5 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition active:scale-95",
									children: [/* @__PURE__ */ jsx(LuShare2, { size: 18 }), "Share"]
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-text/90 mb-5 text-sm leading-relaxed text-pretty md:text-[15px]",
								children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur odit ullam possimus culpa? Quam aliquam, officiis sit quo facere deserunt asperiores totam ad, eius ducimus, quae obcaecati voluptate velit impedit laborum voluptas omnis qui repellat! Perspiciatis voluptatibus dolor officia architecto ipsa dolorem perferendis, excepturi pariatur, temporibus quam ullam voluptas quis."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "border-border grid grid-cols-2 gap-y-4 border-y py-4 sm:grid-cols-4 sm:gap-x-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-text-muted text-[11px] font-bold tracking-wider uppercase",
											children: "Studio"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-text/90 text-sm font-semibold",
											children: "WIT Studio"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-text-muted text-[11px] font-bold tracking-wider uppercase",
											children: "Status"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-text/90 text-sm font-semibold",
											children: "Completed"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-text-muted text-[11px] font-bold tracking-wider uppercase",
											children: "Source"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-text/90 text-sm font-semibold",
											children: "Manga"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-text-muted text-[11px] font-bold tracking-wider uppercase",
											children: "Aired At"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-text/90 text-sm font-semibold",
											children: "Spring 2026"
										})]
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ jsx(TriggerWarning, {})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0 lg:col-span-1",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "border-border bg-surface mb-4 rounded-lg border p-4",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "mb-2 font-semibold",
								children: "Community Rating"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mb-1 flex items-center gap-2",
								children: /* @__PURE__ */ jsx("p", {
									className: "mb-2 text-2xl font-semibold text-red-500 md:text-3xl",
									children: "Severe"
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-2 text-sm",
								children: "based on 2,842 votes"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-text/90 text-sm font-bold",
								children: "What is this?"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-text/90 mb-2 text-sm",
								children: "Our community reviews how frequent or intense a trigger appears. See trigger list for individual ratings."
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-border bg-surface mb-4 rounded-lg border p-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "mb-4",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-text font-semibold",
								children: "At a Glance"
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-col gap-3",
							children: triggerData.map((trigger, idx) => {
								const theme = getColorTheme(trigger.level);
								return /* @__PURE__ */ jsxs("div", {
									className: "border-border/50 flex items-center justify-between border-b pb-2 last:border-0 last:pb-0",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-text/90 text-sm font-medium",
										children: trigger.name
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx("span", { className: `h-2 w-2 rounded-full ${theme.bg}` }), /* @__PURE__ */ jsx("span", {
											className: `text-[11px] font-bold tracking-wider uppercase ${theme.text}`,
											children: trigger.label
										})]
									})]
								}, idx);
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-border bg-surface mb-4 rounded-lg border p-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mb-4",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-text font-semibold",
									children: "Content Advisory"
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-text/90 text-sm text-pretty",
								children: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ratione eveniet excepturi sint, sit, inventore necessitatibus tempore dolorum delectus aliquam earum dolor nam culpa tenetur laborum! Porro non eius nisi!"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-text-muted mt-1 flex items-center gap-1 text-xs",
								children: [/* @__PURE__ */ jsx(LuInfo, {}), " AI Generated"]
							})
						]
					})
				]
			})]
		})]
	});
};
ShowAnime.layout = (page) => /* @__PURE__ */ jsx(FrontLayout, { children: page });
//#endregion
export { ShowAnime as default };

//# sourceMappingURL=Show-qKu3d3Va.js.map