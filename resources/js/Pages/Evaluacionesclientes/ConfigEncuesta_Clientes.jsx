import { React, useState } from "react";
import Menu_Item from "../panel/Menu_Item";
import ModalCrearPreguntas_ev_clientes from "./components/ModalCrearPreguntas_ev_clientes";
import { Accordion, Alert, Button } from "flowbite-react";
import { FaQuestionCircle, FaStar } from "react-icons/fa";

const ConfigEncuesta_Clientes = ({
    auth,
    logo,
    razon_social,
    AppName,
    preguntas,
}) => {
    const [openModal, setOpenModal] = useState(false);

    const handleCheckboxChange = (checkboxKey) => {
        // Implementar la lógica para manejar el cambio de estado del checkbox aquí
        console.log("ok");
    };

    const ModalF = (preguntaIndex, index) => {
        setOpenModal(true);
        // Implementar la lógica para manejar el clic en el botón "Agregar posible respuesta" aquí
    };
    
    const handleCreateQuestion = () => {
        console.log("Crear pregunta");
    };

    return (
        <Menu_Item
            user={auth.user}
            logo={logo}
            razon_social={razon_social}
            AppName={AppName}
        >
            <div className="p-6 animate-fade-down animate-ease-out ">
                <div className="mb-2">
                    <ModalCrearPreguntas_ev_clientes />
                </div>
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
                                                                const checkboxKey = `${preguntaIndex}-${respuesta.id_posiblesRespuestas}`;

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
                                                                        <p className="ml-2 font-semibold text-blue-500 ">
                                                                            {
                                                                                respuesta.titulo_respuesta
                                                                            }
                                                                        </p>
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
        </Menu_Item>
    );
};

export default ConfigEncuesta_Clientes;
