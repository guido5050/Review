import { StrictMode } from "react";
import { createInertiaApp } from "@inertiajs/react";
import "./index.css";
import { createRoot } from "react-dom/client";
import Navigation from "./components/Navigation.jsx";

createInertiaApp({
    resolve(name) {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <App {...props}>
                    {({ Component, key, props }) => {
                        return (
                            <div className="bg-gray-100 min-h-screen flex">
                                <div className="flex-1 bg-white mt-2 rounded-tl-lg shadow-md py-4 px-32">
                                    <Component key={key} {...props}></Component>
                                </div>
                            </div>
                        );
                    }}
                </App>
            </StrictMode>
        );
    },
});
