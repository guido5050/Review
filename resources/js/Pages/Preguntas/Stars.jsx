import React, { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import TextArea from "../components/TextArea";
import Btn from "../components/Btn";
import Strellas from "../components/Strellas";
import Titulo from "../components/Titulo";
import Strellas_clientes from "../components/Strellas_clientes";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Progress } from "flowbite-react";

export default function Stars({ limpieza, preguntas, idresena, logo }) {
    const [posiblesrespuestas, setPosiblesrespuestas] = useState(preguntas);
    const [idResena, setIdResena] = useState(idresena);
    const [currentScore, setCurrentScore] = useState(0);
    const [pregunta, setPregunta] = useState(1);
    const [message, setMessage] = useState("siguiente");
    const [btn, setBtn] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState([]);
    const [historialRespuestas, setHistorialRespuestas] = useState([]);
    const textos = ["Mala", "Aceptable", "Buena", "Excelente", "Perfecta"];
    const [texto, setTexto] = useState("Selecciona una calificación. 📌");
    const [estadocalificacion, setEstadocalificacion] = useState(""); //maneja el estado actual de la calificacion
    const [btnActive, setBtnActive] = useState([]);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [tituloPreguntaActual, setTituloPreguntaActual] = useState("");
    const [idPreguntaActual, setIdPreguntaActual] = useState("");
    const [comentario, setComentario] = useState("");

    const [historialPuntajes, setHistorialPuntajes] = useState(
        posiblesrespuestas
            ? posiblesrespuestas.reduce((acc, pregunta) => {
                  acc[pregunta.id_preguntas] = currentScore;
                  return acc;
              }, {})
            : {}
    ); //Asi construi el objeto historialPuntajes

    console.log(historialPuntajes);
    console.log(historialRespuestas);
    console.log(currentScore);

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
        });
        setRespuestaSeleccionada([]);
        setBtnActive([]);
        setTexto(textos[newScore - 1]);
    };

    // useEffect(() => {
    //     setRespuestaSelec([]);
    // }, [currentScore]);

    const onClick = () => {
        //boton siguiente
        if (limpieza !== undefined) {
            limpieza.length = 0;
        }
        // Guarda el estado de btnActive en el historial antes de pasar a la siguiente pregunta
        //  setHistorialBtnActive([...historialBtnActive, btnActive]);
        setBtnActive([]); // Reinicia el estado de btnActive
        // Extrae el objeto de respuestaSeleccionada si es un array
        const respuesta = Array.isArray(respuestaSeleccionada)
            ? respuestaSeleccionada
            : respuestaSeleccionada;

        // Guarda la respuesta y el puntaje actual en el historial antes de pasar a la siguiente pregunta

        setHistorialRespuestas([...historialRespuestas, respuesta]);
        setHistorialPuntajes({
            ...historialPuntajes,
            [idPreguntaActual]: currentScore,
        });

        setCurrentScore(0);
        setBtn(false);
        setTexto("Selecciona una calificación. 📌");
        setIndicePregunta(indicePregunta + 1);
    };
    const onClickVolver = () => {
        //recuperar estado del boton siguiennte
        setBtn(true);
        setCurrentScore(0);
        setBtn(false);

        if (limpieza !== undefined) {
            limpieza.length = 0;
        }
        setTexto("Selecciona una calificación. 📌");

        // Elimina la última entrada en el historial de respuestas
        setHistorialRespuestas((historialRespuestas) => {
            // historialRespuestas es el estado anterior de historialRespuestas
            // .slice(0, -1) devuelve un nuevo array que contiene todos los elementos del array original
            // excepto el último
            return historialRespuestas.slice(0, -1);
        }); // Crea una copia de historialPuntajes y elimina la última entrada

        const historialPuntajesCopia = { ...historialPuntajes };

        const idUltimaPregunta = Object.keys(historialPuntajesCopia).pop();
        delete historialPuntajesCopia[idUltimaPregunta];

        setHistorialPuntajes(historialPuntajesCopia);

        setIndicePregunta(indicePregunta - 1);
    };
    const manejarClick = (respuesta) => {
        if (
            respuestaSeleccionada.some(
                (res) =>
                    res.id_posiblesRespuestas ===
                    respuesta.id_posiblesRespuestas
            )
        ) {
            setRespuestaSeleccionada(
                respuestaSeleccionada.filter(
                    (res) =>
                        res.id_posiblesRespuestas !==
                        respuesta.id_posiblesRespuestas
                )
            );
            setBtnActive(
                btnActive.filter((id) => id !== respuesta.id_posiblesRespuestas)
            );
        } else {
            setRespuestaSeleccionada([...respuestaSeleccionada, respuesta]);
            setBtnActive([...btnActive, respuesta.id_posiblesRespuestas]);
        }
    };

    const SaveEncuesta = () => {
        console.log("Guardando encuesta");
        router.post("StorePreguntas", {
            historialRespuestas,
            historialPuntajes,
            idResena,
            comentario,
        });
    };
    console.log(comentario);
    //TODO: Calculando la Progress Bar


    const progress = ((indicePregunta + 1) / posiblesrespuestas.length) * 100;

    return (
        <>
            <header className="w-full p-2 justify-start border">
                <img src={logo} alt="" className="w-[45px] rounded-full" />
            </header>
            <div className="flex flex-col h-[calc(100vh-70px)] justify-between px-1 md:px-4 ">
                <div className="flex flex-col gap-y-4  mt-20 text-center items-center animate-fade-down animate-ease-in">
                    {indicePregunta < posiblesrespuestas.length && (
                        <>
                            <h1 className="text-black  text-[30px] mt-3 md:text-2xl md:text-black font-extrabold">
                                {tituloPreguntaActual}
                            </h1>
                            <Strellas_clientes
                                texto={texto}
                                textos={textos}
                                handleStarClick={handleStarClick}
                                currentScore={currentScore}
                            />
                        </>
                    )}
                    <div className=" w-full p-2 text-[25px]">
                        <h1 className="font-extrabold mt-5 "></h1>
                        {/* <hr className="border-t border-gray-200 my-4" />{" "} */}
                        {/* Aquí está la línea */}
                    </div>
                    <div className="w-full p-2 text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px]">
                        {indicePregunta >= posiblesrespuestas.length && (
                            <TextAre a setComentario={setComentario} />
                        )}
                        <div className="mt-5 mb-5 p-3 animate-shake flex justify-center  ">
                            {limpieza && limpieza.length > 0 ? (
                                <ul
                                    className="flex flex-wrap gap-x-2 gap-y-2  md:gap-3
                                md:justify-center   md:flex  md:w-1/3   "
                                >
                                    {limpieza.map((respuesta) => (
                                        <li
                                            className="  "
                                            key={
                                                respuesta.id_posiblesRespuestas
                                            }
                                        >
                                            <button
                                                key={
                                                    respuesta.id_posiblesRespuestas
                                                }
                                                type="button"
                                                className={`${
                                                    btnActive.includes(
                                                        respuesta.id_posiblesRespuestas
                                                    )
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-100 text-gray-900"
                                                } rounded-lg p-2 font-bold text-sm md:text-lg`}
                                                onClick={() =>
                                                    manejarClick(respuesta)
                                                }
                                            >
                                                {respuesta.titulo_respuesta}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="  ">
                    <Progress progress={progress} size="sm" color="dark" />

                    <div className="w-full flex justify-between items-center p-5   md:px-[250px]">
                        <div className="flex items-center gap-x-1 ">
                            <button
                                className={`underline flex items-center ${
                                    indicePregunta === 0
                                        ? "opacity-50 cursor-not-allowed"
                                        : "opacity-100 cursor-pointer"
                                }`}
                                onClick={
                                    indicePregunta > 0 ? onClickVolver : null
                                }
                                disabled={indicePregunta === 0}
                            >
                                <MdKeyboardArrowLeft size={"20px"} />
                                Atras
                            </button>
                        </div>
                        {indicePregunta === posiblesrespuestas.length ? (
                            <p className="text-gray-500">{`${posiblesrespuestas.length }/${
                                posiblesrespuestas.length
                            }`}</p>

                        ):(
                            <p className="text-gray-500">{`${indicePregunta + 1}/${
                                posiblesrespuestas.length
                            }`}</p>
                        )
                        }


                        <Btn
                            text={
                                indicePregunta >= posiblesrespuestas.length
                                    ? "Finalizar"
                                    : "Siguiente"
                            }
                            onClick={
                                indicePregunta >= posiblesrespuestas.length
                                    ? SaveEncuesta
                                    : onClick
                            }
                            disabled={
                                currentScore === 0 &&
                                indicePregunta < posiblesrespuestas.length
                            }
                            className={`mt-auto ${
                                currentScore === 0 &&
                                indicePregunta < posiblesrespuestas.length
                                    ? "opacity-50 cursor-not-allowed"
                                    : "opacity-100 cursor-pointer"
                            }`}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
