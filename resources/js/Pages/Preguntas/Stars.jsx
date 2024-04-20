import React, { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import TextArea from "../components/TextArea";
import Btn from "../components/Btn";
import Strellas from "../components/Strellas";
import Titulo from "../components/Titulo";

export default function Stars({ limpieza, preguntas, idresena }) {
    console.log(limpieza);
    const [posiblesrespuestas, setPosiblesrespuestas] = useState(preguntas);
    const [id, setId] = useState(idresena);
    const [currentScore, setCurrentScore] = useState(0);
    const [pregunta, setPregunta] = useState(1);
    const [message, setMessage] = useState("siguiente");
    const [btn, setBtn] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [respuestaSelec, setRespuestaSelec] = useState([]);
    const textos = ["Mala", "Aceptable", "Buena", "Excelente", "Perfecta"];
    const [texto, setTexto] = useState("Selecciona una calificación. 📌");
    const [estadocalificacion, setEstadocalificacion] = useState(""); //maneja el estado actual de la calificacion
    const [btnActive, setBtnActive] = useState([]);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [tituloPreguntaActual, setTituloPreguntaActual] = useState("");
    const [idPreguntaActual, setIdPreguntaActual] = useState("");

    useEffect(() => {
        if (
            Array.isArray(posiblesrespuestas) &&
            posiblesrespuestas.length > 0 &&
            posiblesrespuestas[indicePregunta]
        ) {
            setTituloPreguntaActual(posiblesrespuestas[indicePregunta].titulo);
            setIdPreguntaActual(
                posiblesrespuestas[indicePregunta].id_preguntas
            );
        }
    }, [indicePregunta]);

    const handleStarClick = (index, idresena) => {
        const newScore = index + 1 === currentScore ? index : index + 1;

        setCurrentScore(newScore);
        if (newScore > 0) {
            setBtn(true);
        } else {
            setBtn(false);
        }
        router.post("show", {
            score: newScore,
            pregunta: idPreguntaActual,
            idresena: id,
        });
        switch (newScore) {
            case 1:
                setEstadocalificacion("Cuentanos que paso?😔");
                setTexto(textos[newScore - 1]);
                break;
            case 2:
                setEstadocalificacion("😕");
                break;
            case 3:
                setEstadocalificacion("😉");
                break;
            case 4:
                setEstadocalificacion("😊");
                break;
            case 5:
                setEstadocalificacion("😁");
                break;
            case 0:
                setEstadocalificacion("");
                setTexto("Selecciona una calificación.📌");
                break;
            default:
                setEstadocalificacion("");
                setTexto(textos[newScore - 1]);
                break;
        }
    };

    useEffect(() => {
        setRespuestaSelec([]);
    }, [currentScore]);

    const onclick = () => {
        setCurrentScore(0);
        setBtn(false);
        setEstadocalificacion("");
        setTexto("Selecciona una calificación. 📌");
        if (Array.isArray(respuestaSelec) && respuestaSelec.length === 0) {
            //si no se selecciona ninguna respuesta
            router.post("StorePreguntas", {
                id_preguntas: idPreguntaActual,
                id_Resenita: id,
                puntuacion: currentScore,
            });
        } else {
            router.post("StorePreguntas", respuestaSelec); //si se selecciona alguna respuesta
        }
        limpieza.length = 0;
        respuestaSelec.splice(0, respuestaSelec.length);
        setIndicePregunta(indicePregunta + 1);
    };
    console.log(respuestaSelec);

    const manejarClick = (respuesta) => {
        if (btnActive.includes(respuesta.id_posiblesRespuestas)) {
            setBtnActive(
                btnActive.filter((id) => id !== respuesta.id_posiblesRespuestas)
            );
            setRespuestaSelec(
                respuestaSelec.filter(
                    (res) =>
                        res.id_posiblesRespuestas !==
                        respuesta.id_posiblesRespuestas
                )
            );
        } else {
            setBtnActive([...btnActive, respuesta.id_posiblesRespuestas]);
            setRespuestaSelec((respuestaSelec) => [
                ...respuestaSelec,
                respuesta,
            ]);
        }
    };



    return (
        <div className="flex flex-col gap-y-2 text-center  h-screen items-center animate-fade-down animate-ease-in">
            {indicePregunta < posiblesrespuestas.length && (
                <>
                    <h1 className="text-gray-500 text-[50px]">
                        {tituloPreguntaActual}
                    </h1>
                    <Strellas
                        texto={texto}
                        textos={textos}
                        handleStarClick={handleStarClick}
                        currentScore={currentScore}
                    ></Strellas>
                </>
            )}
            <div className=" w-full p-2 text-[25px]">
                <h1 className="font-extrabold mt-5">{estadocalificacion}</h1>
                <hr className="border-t border-gray-200 my-4" />{" "}
                {/* Aquí está la línea */}
            </div>
            <div className="mt-5 mb-5 p-3 animate-shake">
                {limpieza && limpieza.length > 0 ? (
                    <ul className="gap-y-5 ">
                        {limpieza.map((respuesta) => (
                            <li
                                className=""
                                key={respuesta.id_posiblesRespuestas}
                            >
                                <button
                                    key={respuesta.id_posiblesRespuestas}
                                    type="button"
                                    className={`${
                                        btnActive.includes(
                                            respuesta.id_posiblesRespuestas
                                        )
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-900"
                                    } py-3 px-5 me-2 mb-2 text-[20.5px] font-medium focus:outline-none rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                                    onClick={() => manejarClick(respuesta)}
                                >
                                    {respuesta.titulo_respuesta}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
            {indicePregunta >= posiblesrespuestas.length && (
                <TextArea id={id}></TextArea>
            )} 
            {btn && <Btn text={message} onClick={onclick}></Btn>}
        </div>
    );
}
