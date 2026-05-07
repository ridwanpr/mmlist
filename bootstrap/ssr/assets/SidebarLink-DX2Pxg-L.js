import { Link, usePage } from "@inertiajs/react";
import { jsx } from "react/jsx-runtime";
//#region resources/js/Components/UI/SidebarLink.tsx
var SidebarLink = ({ href, routeName, children }) => {
	const { props } = usePage();
	return /* @__PURE__ */ jsx(Link, {
		href,
		className: `text-text hover:bg-primary-soft mb-1 flex items-center gap-3 rounded px-3 py-3 text-sm transition-colors duration-200 ${props.currentRoute === routeName ? "bg-primary-soft" : ""}`,
		children
	});
};
//#endregion
export { SidebarLink as t };

//# sourceMappingURL=SidebarLink-DX2Pxg-L.js.map