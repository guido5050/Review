import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { MdOutlinePriceChange } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { HiIdentification } from "react-icons/hi2";

const Titulo = ({ arreglo, pregunta, titulo, setTitulo }) => {
   // console.log(pregunta);
    useEffect(() => {
        setTitulo(arreglo[pregunta]);
        //console.log(titulo);
    }, [pregunta]);
    //Menu opc<MdOutlineCleaningServices />
    //iconos
    return (
        <>
            <div className="flex items-center justify-center gap-x-3">
                <h1 className="mt-6 font-bold text-[45px] pb-6">
                    {arreglo[pregunta]}
                </h1>
                <div>
                    {pregunta === 1 && (
                        <MdOutlineCleaningServices size={"45px"} />
                    )}
                    {pregunta === 2 && <ImLocation2 size={"45px"} />}
                    {pregunta === 3 && <MdOutlinePriceChange size={"45px"} />}
                    {pregunta === 4 && <LuUsers size={"45px"} />}
                    {pregunta === 5 && <HiIdentification size={"45px"} />}
                </div>
            </div>
        </>
    );
};

export default Titulo;
