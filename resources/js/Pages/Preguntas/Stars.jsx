import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import React, { useState } from "react";
import { Link } from "@inertiajs/react";

import Btn from "../components/Btn";
import { router } from "@inertiajs/react";
import ErrorBoundary from "../ErrorBoundary";
import Limpieza from "./Limpieza";
import TextArea from "../components/TextArea";

export default function Stars({ limpieza }) {
    console.log(limpieza);
    // Hacer algo con los datos de limpieza, por ejemplo, mostrarlos en la consola
    // Estado local para rastrear la puntuación actual
    const [currentScore, setCurrentScore] = useState(0);
    const [pregunta, setPregunta] = useState(1);
    const [message, setMessage] = useState("siguiente");
    const [btn, setBtn] = useState(false);
    const [respuestaSelec, setRespuestaSelec] = useState({
        id_preguntas: "",
        pregunta: "",
        id_posiblesRespuestas: "",
        NombrePregunta: "",
    }); //Almacenar las respuestas seleccionadas

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

        if (pregunta === 5) {
            //metodo para guardar
        }

        //console.log(respuestaSelec);

        router.post("store", respuestaSelec);
    };

    const manejarClick = (respuesta) => {
        //console.log(respuesta);
        //respuesta.pregunta.titulo
        // if (!respuestaSelec) {
        // }
        setRespuestaSelec((respuestaSelec) => ({
            id_preguntas: respuesta.id_preguntas,
            pregunta: respuesta.pregunta.titulo,
            id_posiblesRespuestas: respuesta.id_posiblesRespuestas,
            NombrePregunta: respuesta.titulo_respuesta,
        }));
    };
    //Funcion para al almanecenar las preguntas

    return (
        <div className="flex flex-col text-center  h-screen items-center">
            <h1>APLICACION DE LARAVEL.</h1>
            <div className="flex mt-10 gap-x-6 animate-pulse">
                {[...Array(5)].map((_, index) => (
                    <button onClick={() => handleStarClick(index)} key={index}>
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
                                <button
                                    type="button"
                                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={
                                        () => manejarClick(respuesta) //aqui se pasa el argumento
                                    }
                                >
                                    {respuesta.titulo_respuesta}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>

            {pregunta === 6 && <TextArea></TextArea>}
            {btn && <Btn text={message} onClick={onclick}></Btn>}
            {/* <Link href="store" method="post" type="button" onClick={onclick}>
                siguiente
            </Link> */}
        </div>
    );
}
