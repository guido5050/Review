import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Strellas = ({ handleStarClick, currentScore }) => {
    return (
        <div className="flex mt-10 gap-x-6 animate-pulse">
            {[...Array(5)].map((_, index) => (
                <button onClick={() => handleStarClick(index)} key={index}>
                    {index < currentScore ? <AiFillStar /> : <AiOutlineStar />}
                </button>
            ))}
        </div>
    );
};

export default Strellas;
