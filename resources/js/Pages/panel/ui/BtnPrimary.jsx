import React from "react";

const BtnPrimary = ({ span, children, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className="text-white flex gap-x-2  bg-gradient-to-r bg-red-500  font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
        >
            {children}
            <span className="text-center">{span}</span>
        </button>
    );
};

export default BtnPrimary;
