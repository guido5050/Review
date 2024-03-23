import React, { Children } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Btn = ({ text, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className=" text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-[18px] px-8 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            value={"value"}
        >
            {text}
        </button>
    );
};

export default Btn;
