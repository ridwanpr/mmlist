import { n as AuthLayout, t as InputField } from "./InputField-sUSjF0mD.js";
import { Link, router, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
//#region resources/js/Pages/Auth/Login.tsx
var Login = () => {
	const { routes, errors } = usePage().props;
	const [values, setValues] = useState({
		username: "",
		password: ""
	});
	function handleChange(e) {
		setValues((values) => ({
			...values,
			[e.target.name]: e.target.value
		}));
	}
	function handleSubmit(e) {
		e.preventDefault();
		router.post("/login", values, { preserveState: true });
	}
	return /* @__PURE__ */ jsx("div", {
		className: "bg-background flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-5",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-text font-serif text-2xl font-bold",
					children: "Welcome back"
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-text-muted mt-2 text-sm leading-6",
					children: [
						"Log in to continue to",
						" ",
						/* @__PURE__ */ jsx(Link, {
							href: routes["home.index"],
							className: "text-primary hover:text-primary-dark font-serif font-semibold transition-colors",
							children: "mamorulist"
						})
					]
				})]
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(InputField, {
						label: "Username",
						name: "username",
						type: "text",
						placeholder: "Your username",
						handleChange
					}), errors.username && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs text-red-500",
						children: errors.username
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(InputField, {
							label: "Password",
							name: "password",
							type: "password",
							placeholder: "Your password",
							handleChange
						}),
						errors.password && /* @__PURE__ */ jsx("span", {
							className: "mt-1 block text-xs text-red-500",
							children: errors.password
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-1 text-right",
							children: /* @__PURE__ */ jsx(Link, {
								href: "#",
								className: "text-primary hover:text-primary-dark text-xs font-medium transition-colors hover:cursor-pointer",
								children: "Forgot password?"
							})
						})
					] }),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						className: "bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none",
						children: "Log in"
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "border-border bg-surface hover:bg-surface-alt text-text flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:cursor-pointer",
						children: [/* @__PURE__ */ jsx(FaGoogle, {}), " Continue with Google"]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-text-muted pt-1 text-center text-sm",
						children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ jsx(Link, {
								href: routes["auth.register"],
								className: "text-primary hover:text-primary-dark font-semibold transition-colors",
								children: "Create one"
							})
						]
					})
				]
			})]
		})
	});
};
Login.layout = (page) => /* @__PURE__ */ jsx(AuthLayout, { children: page });
//#endregion
export { Login as default };

//# sourceMappingURL=Login-DxeS1cjo.js.map