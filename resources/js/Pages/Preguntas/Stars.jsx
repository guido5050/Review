import React, { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import TextArea from "../components/TextArea";
import Btn from "../components/Btn";
import Strellas from "../components/Strellas";
import Titulo from "../components/Titulo";

export default function Stars({ limpieza, preguntas, idresena }) {
  // console.log(limpieza); //TODO: limpieza es el objeto que lista las posibles respuestas

    const [id, setId] = useState(idresena); //id de la resena que viene del metodo panelcontroll
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
    const [btnActive, setBtnActive] = useState([]); //prueba de UseRef
    const inputRef = useRef(0); //prueba de UseRef
    const [selectedId, setSelectedId] = useState(null); //prueba de UseRef


    const handleStarClick = (index, idresena) => {
        // Incrementa o disminuye la puntuación según la estrella clicada
        //console.log(id);
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

    useEffect(() => { //TODO: este es un hook que se
        //TODO: ejecuta cuando el componente se monta al menos una vez y que limpia el estado de las
        //TODO: respuestas seleccionadas cuando el valor de las estrellas cambia
        setRespuestaSelec([]);
    }, [currentScore]);


    //funcion de onclick este es el metodo que ejecuta el boton siguiente...
    //Este metodo guarda la pregunta seleccionada y reinicia los estados genralmente
    const onclick = () => {
        setPregunta(pregunta + 1); //2
        setCurrentScore(0); //0
        limpieza.length = 0;
        setBtn(false);
        setMalacalificacion(""); //reinicio
        setTexto("Selecciona una calificación. 📌");
        //setId(idresena);
        if (Array.isArray(respuestaSelec) && respuestaSelec.length === 0) {
            router.post("StorePreguntas", {
                id_preguntas: pregunta, //Pregunta actual id
                id_Resenita: id, //id de la resena
                puntuacion: currentScore, //puntuacion de las estrllass
            });
        } else {
            router.post("StorePreguntas", respuestaSelec); //Envia el arreglo de objetos con las posibles respuestas
        }

        respuestaSelec.splice(0, respuestaSelec.length);
    };

    console.log(respuestaSelec);

    /**
     * Maneja el evento de clic en una respuesta.
     * Si la respuesta ya está activa, la desactiva.
     * Si la respuesta no está activa, la activa.
     * @param {Object} respuesta - La respuesta seleccionada.
     */
    const manejarClick = (respuesta) => {
        if (btnActive.includes(respuesta.id_posiblesRespuestas)) {
            // Si ya está activo, desactívalo
            setBtnActive(
                btnActive.filter((id) => id !== respuesta.id_posiblesRespuestas)
            );
            // Elimina la respuesta de respuestaSelec
            setRespuestaSelec(
                respuestaSelec.filter(
                    (res) =>
                        res.id_posiblesRespuestas !==
                        respuesta.id_posiblesRespuestas
                )
            );
        } else {
            // Si no está activo, actívalo
            setBtnActive([...btnActive, respuesta.id_posiblesRespuestas]);
            setRespuestaSelec((respuestaSelec) => [
                ...respuestaSelec,
                respuesta,
            ]);
        }
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
                                            ? "bg-blue-500 text-white" // Estilo cuando está seleccionado
                                            : "bg-gray-100 text-gray-900" // Estilo por defecto
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

            {pregunta === 6 && <TextArea id={id}></TextArea>}
            {btn && <Btn text={message} onClick={onclick}></Btn>}
        </div>
    );
}
