import { n as AuthLayout, t as InputField } from "./InputField-sUSjF0mD.js";
import { Link, router, usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
//#region resources/js/Pages/Auth/Register.tsx
var Register = () => {
	const { routes, errors } = usePage().props;
	const [values, setValues] = useState({
		username: null,
		email: null,
		name: null,
		password: null,
		password_confirmation: null
	});
	function handleChange(e) {
		setValues((values) => ({
			...values,
			[e.target.id]: e.target.value
		}));
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		router.post("/register", values, { preserveState: true });
	};
	return /* @__PURE__ */ jsx("div", {
		className: "bg-background flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-surface border-border w-full max-w-md rounded-xl border p-5 shadow-sm",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-5",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-text font-serif text-2xl font-bold",
					children: "Create your account"
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-text-muted mt-2 text-sm leading-6",
					children: [
						"Join",
						" ",
						/* @__PURE__ */ jsx(Link, {
							href: routes["home.index"],
							className: "text-primary hover:text-primary-dark font-serif font-semibold transition-colors",
							children: "mamorulist"
						}),
						" ",
						"and be part of a safer anime community."
					]
				})]
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-1",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(InputField, {
						label: "Name",
						name: "name",
						type: "text",
						placeholder: "Public display name",
						handleChange
					}), errors.name && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs text-red-500",
						children: errors.name
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(InputField, {
						label: "Username",
						name: "username",
						type: "text",
						placeholder: "Account username (used for login)",
						handleChange
					}), errors.username && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs text-red-500",
						children: errors.username
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(InputField, {
						label: "Email",
						name: "email",
						type: "text",
						placeholder: "Optional, but required for recovery",
						handleChange
					}), errors.email && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs text-red-500",
						children: errors.email
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(InputField, {
						label: "Password",
						name: "password",
						type: "password",
						placeholder: "Create a password",
						handleChange
					}), errors.password && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs text-red-500",
						children: errors.password
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(InputField, {
							label: "Confirm password",
							name: "password_confirmation",
							type: "password",
							placeholder: "Repeat your password",
							handleChange
						}),
						errors.password_confirmation && /* @__PURE__ */ jsx("span", {
							className: "mt-1 block text-xs text-red-500",
							children: errors.password_confirmation
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-1 text-right",
							children: /* @__PURE__ */ jsx(Link, {
								href: "#",
								className: "text-primary hover:text-primary-dark text-xs font-medium transition-colors",
								children: "Forgot password?"
							})
						})
					] }),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						className: "bg-primary text-surface hover:bg-primary-dark focus:ring-primary/25 my-3 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:cursor-pointer focus:ring-4 focus:outline-none",
						children: "Create account"
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "border-border bg-surface hover:bg-surface-alt text-text flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:cursor-pointer",
						children: [/* @__PURE__ */ jsx(FaGoogle, {}), " Continue with Google"]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-text-muted pt-1 text-center text-sm",
						children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ jsx(Link, {
								href: routes["login"],
								className: "text-primary hover:text-primary-dark font-semibold transition-colors",
								children: "Log in"
							})
						]
					})
				]
			})]
		})
	});
};
Register.layout = (page) => /* @__PURE__ */ jsx(AuthLayout, { children: page });
//#endregion
export { Register as default };

//# sourceMappingURL=Register-Dts8-Azv.js.map