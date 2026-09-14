import React from "react";
import ReactDOM from "react-dom";
import * as jsxRuntime from "react/jsx-runtime";

function getMDXComponent(code: string, globals: Record<string, unknown> = {}) {
	const scope = {
		React,
		ReactDOM,
		_jsx_runtime: jsxRuntime,
		...globals,
	};
	const fn = new Function(...Object.keys(scope), code);

	return fn(...Object.values(scope)).default;
}

export function useMDXComponent(code: string) {
	const [Component, setComponent] = React.useState<React.FC | null>(null);

	React.useEffect(() => {
		setComponent(() => getMDXComponent(code));
	}, [code]);

	return Component;
}
