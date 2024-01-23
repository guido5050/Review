import React from "react";

const BtnPanel = ({ span, children, onClick, className, type }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex items-center px-5 py-2.5 text-sm
            font-medium text-center text-white bg-blue-700 rounded-lg
            hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
            dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
        >
            {children}{" "}
             <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                {span}
            </span>
        </button>
    );
};

export default BtnPanel;
