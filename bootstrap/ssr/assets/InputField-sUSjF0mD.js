import { usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { Field, Input, Label } from "@headlessui/react";
//#region resources/js/Layouts/AuthLayout.tsx
var AuthLayout = ({ children }) => {
	const { flash } = usePage();
	useEffect(() => {
		if (flash.success) toast.success(flash.success);
		if (flash.error) toast.error(flash.error);
		if (flash.warning) toast.warning(flash.warning);
		if (flash.info) toast.info(flash.info);
	}, [flash]);
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-background",
		children: [/* @__PURE__ */ jsx(Toaster, {
			position: "top-right",
			richColors: true
		}), /* @__PURE__ */ jsx("div", {
			className: "mx-auto min-h-dvh max-w-xl p-4 md:flex md:flex-col md:items-center md:justify-center",
			children
		})]
	});
};
//#endregion
//#region resources/js/Components/UI/InputField.tsx
var InputField = ({ label, name, type, placeholder, handleChange }) => {
	return /* @__PURE__ */ jsxs(Field, {
		className: "space-y-1",
		children: [/* @__PURE__ */ jsx(Label, {
			className: "text-text text-sm font-medium",
			children: label
		}), /* @__PURE__ */ jsx(Input, {
			id: name,
			name,
			type,
			autoComplete: name,
			placeholder,
			onChange: handleChange,
			className: "border-border text-text placeholder:text-text-muted/70 focus:border-primary focus:ring-primary/15 w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm transition outline-none focus:ring-2"
		})]
	});
};
//#endregion
export { AuthLayout as n, InputField as t };

//# sourceMappingURL=InputField-sUSjF0mD.js.map