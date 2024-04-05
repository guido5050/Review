import { useState } from "react";
import { router } from "@inertiajs/react";
import { Accordion, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Menu_Item from "./Menu_Item";
import { FaQuestionCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import BtnPrimary from "./ui/BtnPrimary";
import ModalCrear_PosibleRazon from "./ui/ModalCrear_PosibleRazon";
import ModalCrearPregunta from "./ui/ModalCrearPregunta";

const ConfigEncuesta = ({
    auth,
    logo,
    razon_social,
    AppName,
    preguntas,
    estadoEncuesta,
}) => {
    console.log(preguntas);
    const [checkedState, setCheckedState] = useState(
        preguntas.reduce((acc, pregunta, preguntaIndex) => {
            pregunta.posibles_respuestas.forEach((respuesta) => {
                const checkboxKey = `${preguntaIndex}-${respuesta.id_posiblesRespuestas}`;
                acc[checkboxKey] = Boolean(respuesta.estado);
            });
            return acc;
        }, {})
    );

    console.log(checkedState);

    function handleCheckboxChange(checkboxKey) {
        const [preguntaIndex, respuestaId] = checkboxKey.split("-");
        //const respuesta = preguntas[preguntaIndex].posibles_respuestas.find(r => r.id_posiblesRespuestas === Number(respuestaId));
        const estadoActual = checkedState[checkboxKey];

        router.post(`/panela/encuesta/${respuestaId}/${estadoActual ? 0 : 1}`, {
            onSuccess: () => {
                router.visit(
                    "/panela/encuesta",
                    { method: "get" },
                    { preserveState: true }
                );
            },
        });

        setCheckedState((prevState) => ({
            ...prevState,
            [checkboxKey]: !prevState[checkboxKey],
        }));
    }
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
                    {preguntas && preguntas.length > 0 && (
                        <ModalCrear_PosibleRazon
                            preguntas={preguntas}
                            estadoEncuesta={estadoEncuesta}
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
                    <Alert color="info" icon={HiInformationCircle}>
                        <span className="font-medium">Informacion!</span>{" "}
                        Completa el cuestionario debe existir al menos una
                        posible razon en cada puntuacion, por
                        cada una es deicir que por cada
                        puntuacion del 1 al 5 debe existir al menos una posible
                        razon que el cliente pueda seleccionar importante! asegurar que todas las posibles respuestas esten en check al menos una
                    </Alert>
                )}

                <Accordion collapseAll>
                    {preguntas.map((pregunta, preguntaIndex) => (
                        <Accordion.Panel key={preguntaIndex}>
                            <Accordion.Title>
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
                            </Accordion.Title>
                            <Accordion.Content>
                                <Accordion collapseAll>
                                    {Object.entries(
                                        pregunta.posibles_respuestas.reduce(
                                            (acc, respuesta) => {
                                                if (
                                                    !acc[respuesta.puntuacion]
                                                ) {
                                                    acc[respuesta.puntuacion] =
                                                        [];
                                                }
                                                acc[respuesta.puntuacion].push({
                                                    titulo: respuesta.titulo_respuesta,
                                                    estado: respuesta.estado,
                                                    id: respuesta.id_posiblesRespuestas,
                                                });
                                                return acc;
                                            },
                                            {}
                                        )
                                    ).map(([puntuacion, respuestas], index) => (
                                        <Accordion.Panel key={index}>
                                            <Accordion.Title>
                                                <div className="flex items-center gap-x-2">
                                                    {puntuacion}{" "}
                                                    {[
                                                        ...Array(
                                                            Number(puntuacion)
                                                        ),
                                                    ].map((_, index) => (
                                                        <FaStar key={index} />
                                                    ))}
                                                </div>
                                            </Accordion.Title>
                                            <Accordion.Content>
                                                {respuestas.map((respuesta) => {
                                                    const checkboxKey = `${preguntaIndex}-${respuesta.id}`;

                                                    return (
                                                        <div
                                                            key={respuesta.id}
                                                            className="flex items-center mb-2 text-gray-500 dark:text-gray-400"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    checkedState[
                                                                        checkboxKey
                                                                    ] || false
                                                                }
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        checkboxKey
                                                                    )
                                                                }
                                                            />
                                                            <p className="ml-2">
                                                                {
                                                                    respuesta.titulo
                                                                }
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                    ))}
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
