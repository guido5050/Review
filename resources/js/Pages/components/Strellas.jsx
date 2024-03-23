import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { GiRoundStar } from "react-icons/gi";


const Strellas = ({ texto, textos, handleStarClick, currentScore }) => {
    // console.log(currentScore);

    return (
        <>
            {" "}
            <h1 className="font-extrabold text-xl">{texto}</h1>
            <div className="flex mt-10 gap-x-10 ">

                {[...Array(5)].map((_, index) => (
                    <button onClick={() => handleStarClick(index)} key={index}>
                        {index < currentScore ? (
                            <GiRoundStar size={"70px"}   />
                        ) : (
                            <CiStar size={"60px"}   />
                        )}
                        <p className="font-extrabold">{textos[index]}</p>
                    </button>
                ))}
            </div>
        </>
    );
};

export default Strellas;
