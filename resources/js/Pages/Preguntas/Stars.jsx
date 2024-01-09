import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import TextArea from "../components/TextArea";
import Btn from "../components/Btn";
import Strellas from "../components/Strellas";
import Titulo from "../components/Titulo";
export default function Stars({ limpieza, preguntas }) {
    const [currentScore, setCurrentScore] = useState(0);
    const [pregunta, setPregunta] = useState(1); //Pregunta que incia 1 este estado es importante maneja varias consultas
    const [message, setMessage] = useState("siguiente"); //Texto del boton
    const [btn, setBtn] = useState(false);
    const [titulo, setTitulo] = useState(""); //Titulo de las preguntas
    const [respuestaSelec, setRespuestaSelec] = useState({
        id_preguntas: null,
        pregunta: null,
        id_posiblesRespuestas: null,
        NombrePregunta: null,
    }); //Almacenar las respuestas seleccionadas
    const textos = ["Mala", "Aceptable", "Buena", "Excelente", "Perfecta"]; //
    const [texto, setTexto] = useState("Seleccione una calificacion "); //Este estado maneja el texto que se despliega indivudual de puntuaciones de estrellas
    const [arreglo, setArreglo] = useState(preguntas);
    //console.log(arreglo);
    // Manejador de clic para cambiar la puntuación
    const handleStarClick = (index) => {
        // Incrementa o disminuye la puntuación según la estrella clicada

        const newScore = index + 1 === currentScore ? index : index + 1;
        setCurrentScore(newScore);
        if (newScore > 0) {
            setBtn(true);
        } else {
            setBtn(false);
        }
        console.log(newScore - 1);
        //titulo de arriba : Mala, Aceptable, Buena
        newScore === 0
            ? setTexto("seleccione una opcion")
            : setTexto(textos[newScore - 1]);

        const preguntaInt = parseInt(pregunta);
        router.post("show", { score: newScore, pregunta: preguntaInt });
    };

    //funcion de onclick este es el metodo que ejecuta el boton siguiente...
    const onclick = () => {
        setPregunta(pregunta + 1);
        setCurrentScore(0);
        limpieza.length = 0;
        setBtn(false);
        //console.log(respuestaSelec);
        router.post("StorePreguntas", respuestaSelec);
    };

    const manejarClick = (respuesta) => {
        setRespuestaSelec((...respuestaSelec) => ({
            id_preguntas: respuesta.id_preguntas,
            pregunta: respuesta.pregunta.titulo,
            id_posiblesRespuestas: respuesta.id_posiblesRespuestas,
            NombrePregunta: respuesta.titulo_respuesta,
        }));
    };

    //Funcion para al almanecenar las preguntas
    console.log(currentScore);
    console.log(respuestaSelec);
    return (
        <div className="flex flex-col text-center  h-screen items-center animate-fade-down animate-ease-in">
            <Titulo
                arreglo={arreglo}
                pregunta={pregunta} //indice del arreglo
                titulo={titulo} //titulo texto correspondiente a cada opcion(primero es Limpieza)
                setTitulo={setTitulo} // funcion que lo modifica
            ></Titulo>
            {pregunta && pregunta < 6 ? (
                <Strellas
                    texto={texto} //Pasamos por props el titulo de la pregunta Mala, buena... ect
                    textos={textos}
                    handleStarClick={handleStarClick}
                    currentScore={currentScore}
                ></Strellas>
            ) : null}

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
        </div>
    );
}
