import React from "react";
import ReactDOM from "react-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Btn = ({ text, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-[18px] px-8 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            value={"value"}
        >
            {text}
        </button>
    );
};

// Encuentra el contenedor por su ID
const container = document.getElementById("react-component-container");

// Renderiza el componente en el contenedor
ReactDOM.render(
    <Btn
        text="RESEÑAS"
        onClick={() => console.log("Hiciste clic en el botón")}
    />,
    container
);
