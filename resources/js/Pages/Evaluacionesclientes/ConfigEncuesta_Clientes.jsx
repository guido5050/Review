import { React, useState } from "react";
import Menu_Item from "../panel/Menu_Item";
import ModalCrearPreguntas_ev_clientes from "./components/ModalCrearPreguntas_ev_clientes";
import ModalCrearPosibleRazonClientes from "./components/ModalCrearPosibleRazonClientes";
import ModalUpdateRazonEvClienntes from "./components/ModalUpdateRazonEvClienntes";
import { Accordion, Alert, Button } from "flowbite-react";
import { FaQuestionCircle, FaStar } from "react-icons/fa";
import { LuPenSquare } from "react-icons/lu";
import { router } from "@inertiajs/react";
import AccesoDenegado from "../panel/ui/AccesoDenegado";
const ConfigEncuesta_Clientes = ({
    auth,
    logo,
    razon_social,
    AppName,
    preguntas,
    empresas,
   Accesos,
}) => {
    const [modal, setModal] = useState(false);
    const [puntuacion, setPuntuacion] = useState();
    const [preguntaId, setPreguntaId] = useState();
    const [titulopregunta, setTitulopregunta] = useState();

    const [checkedState, setCheckedState] = useState(
        preguntas.reduce((acc, pregunta, preguntaIndex) => {
            pregunta.posibles_respuestas_evaluaciones_clientes.forEach(
                (respuesta) => {
                    const checkboxKey = `${preguntaIndex}-${respuesta.id}`;
                    acc[checkboxKey] = Boolean(respuesta.estado);
                }
            );
            return acc;
        }, {})
    );

    const handleCheckboxChange = (checkboxKey) => {
        if (!checkboxKey.includes("-")) {
            console.error("checkboxKey no contiene un guión");
            return;
        }

        const [preguntaIndex, respuestaId] = checkboxKey.split("-");
        const estadoActual = checkedState[checkboxKey];

        // Invertir el estado actual del checkbox
        const nuevoEstado = !estadoActual;

        // Actualizar el estado del checkbox en el estado de React
        setCheckedState((prevState) => ({
            ...prevState,
            [checkboxKey]: nuevoEstado,
        }));

        // Hacer una solicitud POST al servidor para actualizar el estado del checkbox en la base de datos
        router.post(
            `/panela/encuestaclientes/${respuestaId}/${nuevoEstado ? 0 : 1}`,
            {
                onSuccess: () => {
                    router.refresh();
                },
            }
        );
    };

    const ModalF = (preguntaIndex, index) => {
        setModal(true);
        setPuntuacion(index);
        let pregunta = preguntas[preguntaIndex];
        setTitulopregunta(pregunta.titulo);
        setPreguntaId(pregunta.id);
    };

    console.log(preguntaId, puntuacion, titulopregunta);

    const handleCreateQuestion = () => {
        console.log("Crear pregunta");
    };

    return (
        <Menu_Item
            user={auth.user}
            logo={logo}
            razon_social={razon_social}
            AppName={AppName}
            empresas={empresas}
        >
            {Accesos.find((acceso) => acceso.id === 6) ?(
                <>
                 <div className="p-6 animate-fade-down animate-ease-out ">
                <div className="mb-2">
                    <ModalCrearPreguntas_ev_clientes />
                </div>

                <div>
                    {preguntas &&
                        preguntas.some(
                            (pregunta) =>
                                !pregunta.posibles_respuestas_evaluaciones_clientes ||
                                [0, 1, 2, 3, 4].some(
                                    (puntuacion) =>
                                        !pregunta.posibles_respuestas_evaluaciones_clientes.some(
                                            (respuesta) =>
                                                respuesta.puntuacion ===
                                                puntuacion
                                        )
                                )
                        ) && (
                            <Alert color="red">
                                <span className="font-medium">Info alert!</span>{" "}
                                Cada pregunta tiene cinco opciones de
                                puntuación, del 1 al 5 ★, presentadas en
                                acordeones separados cada pregunta despliega las
                                puntuaciones. Puedes editar y crear razones
                                específicas para cada calificación{" "}
                            </Alert>
                        )}
                </div>
                {modal && (
                    <ModalCrearPosibleRazonClientes
                        modal={modal}
                        setModal={setModal}
                        ModalF={ModalF}
                        preguntaId={preguntaId}
                        puntuacion={puntuacion}
                        titulopregunta={titulopregunta}
                    />
                )}

                <Accordion collapseAll>
                    {preguntas.map((pregunta, preguntaIndex) => (
                        <Accordion.Panel key={preguntaIndex}>
                            <Accordion.Title>
                                <div
                                    className={`flex items-center gap-x-2 ${
                                        ![2, 3, 4, 5].every((puntuacion) =>
                                            pregunta.posibles_respuestas_evaluaciones_clientes.some(
                                                (respuesta) =>
                                                    respuesta.puntuacion ===
                                                    puntuacion
                                            )
                                        )
                                            ? "text-yellow-500"
                                            : ""
                                    }`}
                                >
                                    {pregunta.titulo} <FaQuestionCircle />
                                </div>
                            </Accordion.Title>
                            <Accordion.Content>
                                <Accordion collapseAll>
                                    {[1, 2, 3, 4, 5].map(
                                        (puntuacion, index) => {
                                            const respuestas =
                                                pregunta.posibles_respuestas_evaluaciones_clientes.filter(
                                                    (respuesta) =>
                                                        respuesta.puntuacion ===
                                                        puntuacion
                                                );

                                            return (
                                                <Accordion.Panel key={index}>
                                                    <Accordion.Title>
                                                        <div className="flex items-center gap-x-2">
                                                            {[
                                                                ...Array(
                                                                    index + 1
                                                                ),
                                                            ].map(
                                                                (
                                                                    _,
                                                                    starIndex
                                                                ) => (
                                                                    <FaStar
                                                                        key={
                                                                            starIndex
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </Accordion.Title>
                                                    <Accordion.Content>
                                                        {respuestas.map(
                                                            (respuesta) => {
                                                                const checkboxKey = `${preguntaIndex}-${respuesta.id}`;

                                                                return (
                                                                    <div
                                                                        key={
                                                                            respuesta.id
                                                                        }
                                                                        className="flex items-center mb-2 text-gray-500 dark:text-gray-400"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                respuesta.estado ===
                                                                                1
                                                                            }
                                                                            onChange={() =>
                                                                                handleCheckboxChange(
                                                                                    checkboxKey
                                                                                )
                                                                            }
                                                                        />
                                                                        <p className="ml-2 font-semibold text-blue-500 mx-2 ">
                                                                            {
                                                                                respuesta.titulo_respuesta
                                                                            }
                                                                        </p>
                                                                        <ModalUpdateRazonEvClienntes
                                                                        preguntaTitulo={pregunta.titulo}
                                                                        puntuacion={respuesta.puntuacion}
                                                                        respuestaId ={respuesta.id}
                                                                        respuesta_titulo={respuesta.titulo_respuesta}/>
                                                                        </div>
                                                                );
                                                            }
                                                        )}

                                                        <button
                                                            className="text-blue-800 font-extrabold underline"
                                                            onClick={() =>
                                                                ModalF(
                                                                    `${preguntaIndex}`,
                                                                    `${
                                                                        index +
                                                                        1
                                                                    }`
                                                                )
                                                            }
                                                        >
                                                            Agregar posible
                                                            respuesta
                                                        </button>
                                                    </Accordion.Content>
                                                </Accordion.Panel>
                                            );
                                        }
                                    )}
                                </Accordion>
                            </Accordion.Content>
                        </Accordion.Panel>
                    ))}
                </Accordion>
            </div>
                </>
            ): (
                <AccesoDenegado />
            )

            }

        </Menu_Item>
    );
};

export default ConfigEncuesta_Clientes;
