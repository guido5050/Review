import React, { Children } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Btn = ({ text, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className=" text-[12px] flex items-center gap-x-1 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
            value={"value"}
        >
            {text}
            <MdOutlineKeyboardArrowRight />
        </button>
    );
};

export default Btn;
