import { useState } from "react";
import { router } from "@inertiajs/react";
import { Accordion, Alert } from "flowbite-react";
import { HiEye, HiInformationCircle } from "react-icons/hi";

import Menu_Item from "./Menu_Item";
import { FaQuestionCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import ModalCrear_PosibleRazon from "./ui/ModalCrear_PosibleRazon";
import ModalCrearPregunta from "./ui/ModalCrearPregunta";
import ModalCrear_PosibleRazon_de_Estrellas from "./ui/ModalCrear_PosibleRazon_de_Estrellas";
import ModalUpdateRazon from "./ui/ModalUpdateRazon";

const ConfigEncuesta = ({
    auth,
    logo,
    razon_social,
    AppName,
    preguntas,
    estadoEncuesta,
}) => {
    console.log(preguntas);
    const [openModal, setOpenModal] = useState(false);
    const [puntuacion, setPuntuacion] = useState();
    const [preguntaId, setPreguntaId] = useState();
    const [tituloPregunta, setTituloPregunta] = useState("");

    const [checkedState, setCheckedState] = useState(
        preguntas.reduce((acc, pregunta, preguntaIndex) => {
            pregunta.posibles_respuestas.forEach((respuesta) => {
                const checkboxKey = `${preguntaIndex}-${respuesta.id_posiblesRespuestas}`;
                acc[checkboxKey] = Boolean(respuesta.estado);
            });
            return acc;
        }, {})
    );

    function handleCheckboxChange(checkboxKey) {
        if (!checkboxKey.includes("-")) {
            console.error("checkboxKey no contiene un guión");
            return;
        }

        const [preguntaIndex, respuestaId] = checkboxKey.split("-");
        const estadoActual = checkedState[checkboxKey];

        router.post(`/panela/encuesta/${respuestaId}/${estadoActual ? 0 : 1}`, {
            onSuccess: () => {
                router.refresh();
            },
        });

        setCheckedState((prevState) => ({
            ...prevState,
            [checkboxKey]: !prevState[checkboxKey],
        }));
    }

    const ModalF = (preguntaIndex, puntuacion) => {
        setPuntuacion(puntuacion);

        // Buscar la pregunta correspondiente
        let pregunta = preguntas[preguntaIndex];
        setPreguntaId(pregunta.id_preguntas);
        setTituloPregunta(pregunta.titulo);

        console.log(preguntaIndex, puntuacion - 1);
        console.log(preguntaId);
        setOpenModal(true);
    };

    return (
        <Menu_Item
            user={auth.user}
            razon_social={razon_social}
            logo={logo}
            AppName={AppName}
        >
            <div className="p-6 animate-fade-down animate-ease-out ">
                <div className="flex items-center justify-start gap-x-2 ">
                    <ModalCrearPregunta />
                    {/* {preguntas && preguntas.length > 0 && (
                        <ModalCrear_PosibleRazon
                            preguntas={preguntas}
                            estadoEncuesta={estadoEncuesta}
                        />
                    )} */}
                    {openModal && (
                        <ModalCrear_PosibleRazon_de_Estrellas
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            preguntaId={preguntaId}
                            tituloPregunta={tituloPregunta}
                            puntuacion={puntuacion}
                        />
                    )}
                </div>
                {estadoEncuesta === false && (
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Informacion!</span>{" "}
                        Completa el cuestionario debe existir al menos una
                        posible razon en cada puntuacion completa las preguntas
                        que estan en color amarillo
                    </Alert>
                )}
                {estadoEncuesta === true && (
                    <Alert
                        color="success"
                        icon={HiInformationCircle}
                        rounded
                    >
                        <span className="font-medium">Informacion!</span>
                        Cada pregunta tiene cinco opciones de puntuación, del 1
                        al 5 ★, presentadas en acordeones
                        separados cada pregunta despliega las puntuaciones.
                        Puedes
                        editar y crear razones específicas para cada
                        calificación{" "}
                    </Alert>
                )}

                <Accordion collapseAll>
                    {preguntas.map((pregunta, preguntaIndex) => (
                        <Accordion.Panel key={preguntaIndex}>
                            <Accordion.Title>
                                <div
                                    className={`flex items-center gap-x-2 ${
                                        ![2, 3, 4, 5].every((puntuacion) =>
                                            pregunta.posibles_respuestas.some(
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
                                                pregunta.posibles_respuestas.filter(
                                                    (respuesta) =>
                                                        respuesta.puntuacion ===
                                                        puntuacion
                                                );

                                            return (
                                                <Accordion.Panel
                                                    key={`${preguntaIndex}-${index}`}
                                                >
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
                                                                            respuesta.id_posiblesRespuestas
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
                                                                        <ModalUpdateRazon
                                                                            id_posiblesRespuestas={
                                                                                respuesta.id_posiblesRespuestas
                                                                            }
                                                                            titulo_respuesta={
                                                                                respuesta.titulo_respuesta
                                                                            }
                                                                            puntuacion={
                                                                                respuesta.puntuacion
                                                                            }
                                                                        />
                                                                    </div>
                                                                );
                                                            }
                                                        )}

                                                        <button
                                                            className="text-blue-800 font-extrabold underline"
                                                            onClick={(e) => {
                                                                e.nativeEvent.stopImmediatePropagation();
                                                                ModalF(
                                                                    `${preguntaIndex}`,
                                                                    `${
                                                                        index +
                                                                        1
                                                                    }`
                                                                );
                                                            }}
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

export default ConfigEncuesta;
