import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import React, { useState } from "react";
import Btn from "../components/Btn";
import { router } from "@inertiajs/react";
import ErrorBoundary from "../ErrorBoundary";
import Limpieza from "./Limpieza";
import TextArea from "../components/TextArea";

export default function Stars({ limpieza }) {
    // Hacer algo con los datos de limpieza, por ejemplo, mostrarlos en la consola
    // Estado local para rastrear la puntuación actual

    console.log(limpieza);

    const [currentScore, setCurrentScore] = useState(0);
    const [pregunta, setPregunta] = useState(1);
    const [message, setMessage] = useState("siguiente");
    const [btn, setBtn] = useState(false);

    // Manejador de clic para cambiar la puntuación
    const handleStarClick = (index) => {
        // Incrementa o disminuye la puntuación según la estrella clicada
        const newScore = index + 1 === currentScore ? index : index + 1;
        setCurrentScore(newScore);

        const number = newScore;
        console.log("PUNTUACION :", number);

        if (newScore > 0) {
            setBtn(true);
        } else {
            setBtn(false);
        }

        router.post("show", { score: newScore, pregunta: pregunta });
    };

    //funcion de onclick

    const onclick = () => {
        setPregunta(pregunta + 1);
        setCurrentScore(0);
        limpieza.length = 0;
        setBtn(false);
        console.log("pregunta:" + pregunta);
        if (pregunta === 5) {
            setMessage("terminar encuesta");
            setBtn(false);
            //metodo para guardar
        }
    };

    return (
        <ErrorBoundary>
            <div className="flex flex-col text-center  h-screen items-center">
                <h1>APLICACION DE LARAVEL.</h1>
                <div className="flex mt-10 gap-x-6 animate-pulse">
                    {[...Array(5)].map((_, index) => (
                        <button
                            onClick={() => handleStarClick(index)}
                            key={index}
                        >
                            {index < currentScore ? (
                                <AiFillStar />
                            ) : (
                                <AiOutlineStar />
                            )}
                        </button>
                    ))}
                </div>
                <div className="mt-5 mb-5 p-3 animate-shake">
                    {limpieza && limpieza.length > 0 ? ( // Verificación de limpieza no es undefined y tiene elementos
                        <ul className="gap-y-5 ">
                            {limpieza.map((respuesta) => (
                                <li
                                    className=""
                                    key={respuesta.id_posiblesRespuestas}
                                >
                                    <strong>
                                        {respuesta.titulo_respuesta}
                                    </strong>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>

                {pregunta === 6 && <TextArea></TextArea>}
                {btn && <Btn text={message} onClick={onclick}></Btn>}
            </div>
        </ErrorBoundary>
    );
}
