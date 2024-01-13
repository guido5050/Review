import React, { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import TextArea from "../components/TextArea";
import Btn from "../components/Btn";
import Strellas from "../components/Strellas";
import Titulo from "../components/Titulo";

export default function Stars({ limpieza, preguntas, id_resena2, idresena }) {
    //console.log("resena" + idresena);
    console.log(limpieza);
     
    const [id, setId] = useState(idresena);
    const [currentScore, setCurrentScore] = useState(0);
    const [pregunta, setPregunta] = useState(1); //Pregunta que incia 1 este estado es importante maneja varias consultas
    const [message, setMessage] = useState("siguiente"); //Texto del boton
    const [btn, setBtn] = useState(false);
    const [titulo, setTitulo] = useState(""); //Titulo de las preguntas
    const [respuestaSelec, setRespuestaSelec] = useState([]); //Almacenar las respuestas seleccionadas este es un arreglo en donde estaran las respuestas seleccionadas
    const textos = ["Mala", "Aceptable", "Buena", "Excelente", "Perfecta"]; //
    const [texto, setTexto] = useState("Selecciona una calificación. 📌"); //Este estado maneja el texto que se despliega indivudual de puntuaciones de estrellas
    const [arreglo, setArreglo] = useState(preguntas);
    const [malacalificacion, setMalacalificacion] = useState("");
    const [btnActive, setBtnActive] = useState(null); //prueba de UseRef
    const inputRef = useRef(0); //prueba de UseRef

    const handleStarClick = (index, idresena) => {
        // Incrementa o disminuye la puntuación según la estrella clicada

        console.log(id);
        const newScore = index + 1 === currentScore ? index : index + 1;
        setCurrentScore(newScore);
        if (newScore > 0) {
            setBtn(true);
        } else {
            6;
            setBtn(false);
        }
        // newScore === 1
        //     ? setMalacalificacion("Cuentanos que paso?🙁")
        //     : setMalacalificacion("");
        router.post("show", {
            score: newScore,
            pregunta: pregunta,
            idresena: id,
        });
        if (newScore === 1) {
            setMalacalificacion("Cuentanos que paso?🙁");
        } else {
            setMalacalificacion("");
        }
        //titulo de arriba : Mala, Aceptable, Buena
        newScore === 0
            ? setTexto("Selecciona una calificación.📌")
            : setTexto(textos[newScore - 1]);
    };

    //funcion de onclick este es el metodo que ejecuta el boton siguiente...
    //Este metodo guarda la pregunta seleccionada y reinicia los estados genralmente
    const onclick = () => {
        setPregunta(pregunta + 1); //2
        setCurrentScore(0); //0
        limpieza.length = 0;
        setBtn(false);
        setMalacalificacion(""); //reinicio
        setTexto("Selecciona una calificación. 📌");
        setId(idresena);
        if (respuestaSelec === null) {
            console.log("nul");
        }
        router.post("StorePreguntas", respuestaSelec);
        respuestaSelec.splice(0, respuestaSelec.length);
    };

    console.log(respuestaSelec);

    const manejarClick = (respuesta) => {
        // Verifica si el botón actual es el botón activo
        //console.log(respuesta);
        if (inputRef.current === btnActive) {
            // Si ya está activo, desactívalo
            setBtnActive(null);
        } else {
            // Si no está activo, actívalo
            setBtnActive(inputRef.current);
        }

        setRespuestaSelec((respuestaSelec) => [...respuestaSelec, respuesta]);
    };

    //Funcion para al almanecenar las preguntas
    return (
        <div className="flex flex-col gap-y-2 text-center  h-screen items-center animate-fade-down animate-ease-in">
            <h1>{id}</h1>
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
            <div className=" w-full p-2 text-[25px]">
                <h1 className="font-extrabold mt-5">{malacalificacion}</h1>
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
                                    ref={inputRef}
                                    key={respuesta.id_posiblesRespuestas}
                                    type="button"
                                    className={`" ${
                                        inputRef.current ===
                                        respuesta.id_posiblesRespuestas
                                            ? "text-yellow-50"
                                            : "text-gray-900"
                                    }  :text-white py-3 px-5 me-2 mb-2 text-[20.5px] font-medium text-gray-900 focus:outline-none bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"`}
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
