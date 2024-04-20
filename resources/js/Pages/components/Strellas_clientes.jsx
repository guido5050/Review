import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { GiRoundStar } from "react-icons/gi";
import { TiStarburst } from "react-icons/ti";
import { TiStarburstOutline } from "react-icons/ti";


const Strellas_clientes = ({ texto, textos, handleStarClick, currentScore }) => {
    // console.log(currentScore);

    return (
        <>
            {" "}
            <div className="flex mt-1 flex-col ">

                <div className="flex justify-start">
                {[...Array(5)].map((_, index) => (
                    <button onClick={() => handleStarClick(index)} key={index} >
                        {index < currentScore ? (
                            <GiRoundStar size={"50px"}  />

                            ) : (
                                <CiStar  size={"50px"}   />
                                )}
                        {/* <p className="font-extrabold">{textos[index]}</p> */}
                    </button>
                ))}
                </div>
                


                <div className="flex justify-start ">

                <h1 className={`font-extrabold mt-2 px-1 text-gray-500     ${currentScore==0?'animate-pulse animate-ease-linear': ''}   `}>{texto}</h1>
                </div>

            </div>
        </>
    );
};

export default Strellas_clientes;
