import React, { useState, useEffect } from "react";
import Strellas_clientes from "../components/Strellas_clientes";
import Btn from "../components/Btn";
import TextArea_Encuesta from "./components/TextArea_Encuesta";
import { router, Link } from "@inertiajs/react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Progress, Alert } from "flowbite-react";

const StrellasClientes = ({
    idmoderador,
    preguntas,
    idEvaluaciones,
    posiblesRespuestas_,
    logo,
    estadoPreguntas,
}) => {
    const [posiblesrespuestas, setPosiblesrespuestas] = useState(preguntas);
    const [idEvaluaciones_, setIdEvaluaciones] = useState(idEvaluaciones);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const textos = ["Mala", "Aceptable", "Buena", "Excelente", "Perfecta"];
    const [texto, setTexto] = useState("Selecciona una calificación. 📌");
    const [currentScore, setCurrentScore] = useState(0);
    const [btn, setBtn] = useState(false);
    const [tituloPreguntaActual, setTituloPreguntaActual] = useState("");
    const [idPreguntaActual, setIdPreguntaActual] = useState("");
    const [btnActive, setBtnActive] = useState([]);
    const [historialRespuestas, setHistorialRespuestas] = useState([]);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState([]);
    const [comentario, setComentario] = useState("");

    const [historialPuntajes, setHistorialPuntajes] = useState(
        posiblesrespuestas
            ? posiblesrespuestas.reduce((acc, pregunta) => {
                  acc[pregunta.id] = currentScore;
                  return acc;
              }, {})
            : {}
    );
    console.log(preguntas);
    // console.log(respuestaSeleccionada);
    // console.log(historialRespuestas);
    // ... Resto del código ...
    useEffect(() => {
        if (
            Array.isArray(posiblesrespuestas) &&
            posiblesrespuestas.length > 0 &&
            posiblesrespuestas[indicePregunta]
        ) {
            setTituloPreguntaActual(posiblesrespuestas[indicePregunta].titulo);
            setIdPreguntaActual(posiblesrespuestas[indicePregunta].id);
        }
    }, [indicePregunta]);
    useEffect(() => {
        if (currentScore === 0) {
            setTexto("Selecciona una calificación. 📌");
        }
    }, [currentScore]);

    /**
     * Maneja el evento de clic en una respuesta.
     * @param {Object} respuesta - La respuesta seleccionada.
     */
    const manejarClick = (respuesta) => {
        if (respuestaSeleccionada.some((res) => res.id === respuesta.id)) {
            setRespuestaSeleccionada(
                respuestaSeleccionada.filter((res) => res.id !== respuesta.id)
            );
            setBtnActive(btnActive.filter((id) => id !== respuesta.id));
        } else {
            setRespuestaSeleccionada([...respuestaSeleccionada, respuesta]);
            setBtnActive([...btnActive, respuesta.id]);
        }
    };

    const handleStarClick = (index) => {
        const newScore = index + 1 === currentScore ? index : index + 1;

        setCurrentScore(newScore);
        if (newScore > 0) {
            setBtn(true);
        } else {
            setBtn(false);
        }
        router.get(
            "/panela/estrellasCliente/",
            {
                score: newScore,
                idEvaluacion: idEvaluaciones,
                idmoderador: idmoderador,
                pregunta: idPreguntaActual,
            },
            {
                preserveState: true,
            }
        );

        setRespuestaSeleccionada([]);
        setBtnActive([]);
        setTexto(textos[newScore - 1]);
    };

    const onClick = () => {
        //boton siguiente

        // Guarda el estado de btnActive en el historial antes de pasar a la siguiente pregunta
        //  setHistorialBtnActive([...historialBtnActive, btnActive]);
        // Resto del código...
        posiblesRespuestas_.length = 0;
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
        posiblesRespuestas_.length = 0;
        setTexto("Selecciona una calificación. 📌");
        // Elimina el estado de btnActive de la pregunta anterior del historial
        setHistorialRespuestas(historialRespuestas => historialRespuestas.slice(0, -1));
        // Crea una copia de historialPuntajes y elimina la última entrada
        const historialPuntajesCopia = { ...historialPuntajes };

        const idUltimaPregunta = Object.keys(historialPuntajesCopia).pop();
        delete historialPuntajesCopia[idUltimaPregunta];

        setHistorialPuntajes(historialPuntajesCopia);

        setIndicePregunta(indicePregunta - 1);
    };

    console.log(historialRespuestas);

    const SaveEncuesta = () => {
        router.post("/panela/estrellasCliente/save", {
            historialRespuestas,
            historialPuntajes,
            idEvaluaciones_,
            comentario,
        });
    };


    // Calcula el porcentaje de progreso
    const progress = ((indicePregunta + 1) / posiblesrespuestas.length) * 100;

    return (
        <>
            <header className=" w-full  p-2 justify-start border">
                <img
                    src={logo}
                    alt=""
                    className="w-[45px] ps-px-[50px] rounded-xl"
                />
            </header>

            {posiblesrespuestas.length === 0 || estadoPreguntas === false ? (
                <>
                    <Alert color="failure">
                        <span className="font-medium">Info alert!</span>
                        completa el cuestionario para evaluar al cliente 📌
                    </Alert>
                    <div className="flex items-center justify-center h-screen">
                        <Link
                            className=" bg-blue-700 hover:bg-blue-800 rounded-lg py-1 px-2 text-white"
                            href="/panela/encuestaclientes/"
                        >
                            ir a encuesta
                        </Link>
                    </div>
                </>
            ) : (
                <div className="flex flex-col h-[calc(100vh-70px)] justify-between px-4 ">
                    <div>
                        <div className="flex flex-col gap-y-4  mt-24 text-center items-center animate-fade-down animate-ease-in">
                            {indicePregunta < posiblesrespuestas.length && (
                                <>
                                    <h1 className="text-black  text-[16px] mt-3 md:text-2xl md:text-black font-extrabold">
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
                            <div className="w-full p-2 text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px]">
                                {indicePregunta < posiblesrespuestas.length ? (
                                    <hr className="border-t border-gray-200 my-4" />
                                ) : (
                                    <div className="md:m-auto md:w-[50%]  ">
                                        <TextArea_Encuesta
                                            setComentario={setComentario}
                                        />
                                    </div>
                                )}

                                <div className="mt-5 mb-5 p-3 animate-shake ]">
                                    {posiblesRespuestas_ &&
                                    posiblesRespuestas_.length > 0 ? (
                                        <ul className="gap-y-5 ">
                                            {posiblesRespuestas_.map(
                                                (respuesta) => (
                                                    <li
                                                        className=""
                                                        key={respuesta.id}
                                                    >
                                                        <button
                                                            key={respuesta.id}
                                                            type="button"
                                                            className={`${
                                                                btnActive.includes(
                                                                    respuesta.id
                                                                )
                                                                    ? "bg-blue-500 text-white"
                                                                    : "bg-gray-100 text-gray-900"
                                                            } rounded-lg p-2 font-bold text-lg `}
                                                            onClick={() =>
                                                                manejarClick(
                                                                    respuesta
                                                                )
                                                            }
                                                        >
                                                            {
                                                                respuesta.titulo_respuesta
                                                            }
                                                        </button>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="  ">
                        <Progress progress={progress} size="sm" color="dark" />
                        <div className="w-full flex justify-between items-center p-5   md:px-[250px]">
                            <div className="flex items-center gap-x-1">
                                <button
                                    className={`underline flex items-center ${
                                        indicePregunta === 0
                                            ? "opacity-50 cursor-not-allowed"
                                            : "opacity-100 cursor-pointer"
                                    }`}
                                    onClick={
                                        indicePregunta > 0
                                            ? onClickVolver
                                            : null
                                    }
                                    disabled={indicePregunta === 0}
                                >
                                    <MdKeyboardArrowLeft size={"20px"} />
                                    Atras
                                </button>
                            </div>
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
            )}
        </>
    );
};

export default StrellasClientes;
