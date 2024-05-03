import React from "react";
import Menu_Item from "../panel/Menu_Item";
import ModalComentarioEncuesta from "./components/ModalComentarioEncuesta";
import { Card, Table, Button } from "flowbite-react";
import { BsCalendar2Date } from "react-icons/bs";

const GestionarEv_Clientes = ({
    auth,
    logo,
    razon_social,
    AppName,
    evaluacion,
    preguntas,
    respuestas,
    comentarios,
}) => {
    // console.log(preguntas);
    //  console.log(respuestas);
    // console.log(comentarios);
    return (
        <>
            <Menu_Item
                user={auth.user}
                razon_social={razon_social}
                logo={logo}
                AppName={AppName}
            >
                <div className="p-8 flex gap-y-2 justify-center mt-2 animate-fade-up animate-ease-in-out flex-col">
                    <Card>
                        <div className="flex  gap-x-4 justify-between">
                            <div className="flex flex-col gap-y-7  ">
                                {" "}
                                {/* por si toca poner un elemento a abjo lo deje flex-col */}
                                <div className="flex gap-x-3   ">
                                    {evaluacion.puntuacion_global && (
                                        <div className="bg-blue-600 rounded-lg w-[100px]">
                                            <p
                                                className="font-extrabold text-[50px] p-3 text-center  rounded-lg cursor-pointer"
                                                title="puntuacion del cliente al finalizar la reseña"
                                            >
                                                <strong className="text-white font-extrabold ">
                                                    {
                                                        evaluacion.puntuacion_global
                                                    }
                                                </strong>
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-y-1   ">
                                        <p className="text-black font-semibold">
                                            {
                                                evaluacion.usuarios_clientes
                                                    .nombre_completo
                                            }
                                        </p>

                                        <p>
                                            {"Numero de Evaluacion:"}{" "}
                                            <span className="text-blue-800 font-extrabold">
                                                {evaluacion.id}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-4  ">
                                    <p>
                                        <span className="font-extrabold">
                                            Adimin:{" "}
                                        </span>
                                        {
                                            evaluacion.usuarios_empleado
                                                .nombre_completo
                                        }
                                    </p>
                                    <p>
                                        <span className="font-extrabold">
                                            Comentario:
                                        </span>{" "}
                                        {evaluacion.comentario}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2 self-start font-extrabold underline ">
                                <BsCalendar2Date />
                                <span>
                                    {new Date(
                                        evaluacion.fecha
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-4" />{" "}
                    </Card>
                    <div>
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>preguntas</Table.HeadCell>
                                <Table.HeadCell>Respuestas</Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell>comentarios</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {preguntas.map((pregunta, index) => (
                                    <Table.Row
                                        key={index}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell>
                                            {pregunta.titulo}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {respuestas.filter(
                                                (respuesta) =>
                                                    respuesta
                                                        .preguntas_evaluaciones_clientes
                                                        .id === pregunta.id
                                            ).length > 0 ? (
                                                respuestas.map(
                                                    (respuesta, index) =>
                                                        respuesta
                                                            .preguntas_evaluaciones_clientes
                                                            .id ===
                                                        pregunta.id ? (
                                                            <div key={index}>
                                                                <p>
                                                                    {
                                                                        respuesta.nombre_respuesta
                                                                    }
                                                                </p>
                                                            </div>
                                                        ) : null
                                                )
                                            ) : (
                                                <p>
                                                    No hay respuestas para esta
                                                    pregunta.
                                                </p>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <ModalComentarioEncuesta
                                                preguntaTitulo={pregunta.titulo}
                                                id_evaluacion={evaluacion.id}
                                                id_preguntas={pregunta.id}
                                                user={auth.user}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="border-b-yellow-300 overflow-auto max-h-[150px]">
                                            {comentarios.map(
                                                (comentario, index) =>
                                                    comentario.id_preguntas ===
                                                        pregunta.id && (
                                                            <Card
                                                            className="sm mb-4  flex flex-col text-[12px] "
                                                            key={index}
                                                        >
                                                            <div className="flex flex-col ">
                                                                <div className="flex justify-between items-cente mb-3 ">
                                                                    <div className="flex items-center gap-x-2 mb-2 sm:mb-0">

                                                                        <p className="overflow-ellipsis overflow-hidden text-[12px]">
                                                                            {
                                                                                comentario.Nombre_Admin
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-x-2">
                                                                        <BsCalendar2Date
                                                                            size={
                                                                                "12px"
                                                                            }
                                                                        />
                                                                        <p className="text-sm">
                                                                            {new Date(
                                                                                comentario.fecha
                                                                            ).toLocaleDateString()}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-col items-center justify-between">
                                                                    <p className="font-extrabold overflow-ellipsis overflow-hidden leading-tight">
                                                                        {
                                                                            comentario.comentario
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    )
                                            )}
                                            </div>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </Menu_Item>
        </>
    );
};

export default GestionarEv_Clientes;
