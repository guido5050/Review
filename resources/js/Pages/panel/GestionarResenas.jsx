import React from "react";
import Menu_Item from "./Menu_Item";
import BtnPrimary from "./ui/BtnPrimary";
import { Table, Card, Badge } from "flowbite-react";
import { FaStar } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";
import { IoIosCheckmark } from "react-icons/io";
import { Button } from "flowbite-react";
import { router } from "@inertiajs/react";

import ModalResenasComentarios from "./ui/ModalResenasComentarios";
import Resenas from "./Resenas";

const GestionarResenas = ({
    auth,
    logo,
    razon_social,
    nombre,
    comentario,
    puntuacion,
    respuestas,
    idresena,
    userid,
    comentarios,
    reserva,
    fecha,
    moderador,
}) => {
    // Transforma respuestas en un objeto donde cada clave es un título de pregunta
    // y cada valor es un objeto que contiene un array de respuestas y la puntuación total para esa pregunta
    console.log(userid);
    console.log(idresena);
    console.log(comentarios);

    const respuestasAgrupadas = Object.values(respuestas)
        .flat()
        .reduce((acc, respuesta) => {
            if (!acc[respuesta.pregunta.titulo]) {
                acc[respuesta.pregunta.titulo] = {
                    respuestas: [],
                    puntuacionTotal: 0,
                    idPregunta: respuesta.pregunta.id_preguntas, // Aquí se guarda el id de la pregunta
                };
            }
            acc[respuesta.pregunta.titulo].respuestas.push(respuesta);
            acc[respuesta.pregunta.titulo].puntuacionTotal =
                respuesta.puntuacion; //Saco la puntuacion individual por cada pregunta;
            return acc;
        }, {});
    const AprobarResena = () => {
        router.post(
            "/panela/resenas/publicar",
            { idresena: idresena, estado: 1 },
            {
                onSuccess: () => {
                    router.refresh();
                },
            }
        );
    };

    return (
        <>
            <Menu_Item user={auth.user} logo={logo} razon_social={razon_social}>
                <div className="p-8 flex gap-y-2 justify-center mt-2 animate-fade-up animate-ease-in-out flex-col">
                    <Card>
                        <div className=" flex  gap-x-4 justify-between   ">
                            <div className="flex flex-col gap-y-4 ">
                                {" "}
                                {/* por si toca poner un elemento a abjo lo deje flex-col */}
                                <div className="flex gap-x-3 items-center ">
                                    <div className="bg-blue-600 rounded-lg w-[100px]">
                                        <p
                                            className="font-extrabold text-[50px] p-3 text-center  rounded-lg cursor-pointer"
                                            title="puntuacion del cliente al finalizar la reseña"
                                        >
                                            <strong className="text-white font-extrabold ">
                                                {puntuacion}
                                            </strong>
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-y-1 ">
                                        <p className="text-black font-semibold">
                                            {nombre}
                                        </p>
                                        <p>
                                            {"Numero de referencia:"}{" "}
                                            <span className="text-blue-800 font-extrabold">
                                                {reserva}
                                            </span>
                                        </p>
                                        <p>
                                            {"Numero de reseña:"}{" "}
                                            <span className="text-blue-800 font-extrabold">
                                                {idresena}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2 self-start font-extrabold underline ">
                                <BsCalendar2Date />
                                <span>
                                    {new Date(fecha).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between ">
                            <p className="font-extrabold text-blue-800 md:text-xl">
                                {moderador === "Reseña no aprobada"
                                    ? `${moderador}`
                                    : `Aprobada por:  ${moderador} 📌`}
                            </p>
                            <Button
                                color="success"
                                onClick={AprobarResena}
                                disabled={moderador != "Reseña no aprobada"}
                            >
                                Aprobar
                            </Button>
                        </div>
                        <hr className="border-t border-gray-200 my-4" />{" "}
                        {/* Aquí está la línea */}
                        <div className="flex items-center justify-between gap-x-1 text-xl">
                            <p
                                className="font-extrabold cursor-pointer"
                                title="comentario dejado por el cliente al finalizar la encuesta"
                            >
                                {`Comentario:`}
                                <strong className="text-gray-500">
                                    {comentario
                                        ? comentario
                                        : "Reseña no terminada"}
                                </strong>
                            </p>
                        </div>
                    </Card>

                    <div>
                        <Table className="text-lg">
                            <Table.Head>
                                <Table.HeadCell>Pregunta</Table.HeadCell>
                                <Table.HeadCell>puntuacion</Table.HeadCell>
                                <Table.HeadCell>
                                    Respuestas Seleccionadas
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Dejar comentario
                                </Table.HeadCell>
                                <Table.HeadCell className="flex gap-x-4 items-center">
                                    {" "}
                                    Comentarios de Admin
                                    <FaUserFriends size={"28px"} />
                                    <FaRegCommentDots size={"28px"} />
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y text-lg">
                                {Object.entries(respuestasAgrupadas).map(
                                    (
                                        [
                                            titulo,
                                            {
                                                respuestas,
                                                puntuacionTotal,
                                                idPregunta,
                                            },
                                        ],
                                        index
                                    ) => (
                                        <Table.Row
                                            key={index}
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white ">
                                                {titulo}
                                                <div className="flex items-center">
                                                    {[
                                                        ...Array(
                                                            puntuacionTotal
                                                        ),
                                                    ].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            size={"20px"}
                                                        />
                                                    ))}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {puntuacionTotal}
                                            </Table.Cell>

                                            <Table.Cell className="whitespace-nowrap">
                                                {respuestas.map(
                                                    (respuesta, index) => (
                                                        <p key={index}>
                                                            {respuesta.NombreRespuesta
                                                                ? respuesta.NombreRespuesta
                                                                : "Sin respuestas"}
                                                        </p>
                                                    )
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <ModalResenasComentarios
                                                    idPregunta={idPregunta}
                                                    idresena={idresena}
                                                    user={auth.user}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="overflow-auto max-h-[200px]">
                                                    <Badge className="">
                                                        <div className="flex items-center gap-x-1">
                                                            <h1>
                                                                {" "}
                                                                {comentarios[
                                                                    idPregunta
                                                                ] &&
                                                                    comentarios[
                                                                        idPregunta
                                                                    ]
                                                                        .length}{" "}
                                                            </h1>
                                                            <FaRegCommentDots
                                                                size={""}
                                                            />
                                                        </div>
                                                    </Badge>
                                                    {comentarios[idPregunta] &&
                                                        comentarios[
                                                            idPregunta
                                                        ].map(
                                                            (
                                                                comentario,
                                                                index
                                                            ) => (
                                                                <Card
                                                                    className="sm mb-4  flex flex-col text-[12px]"
                                                                    key={index}
                                                                >
                                                                    <div className="flex flex-col ">
                                                                        <div className="flex justify-between items-cente mb-3 ">
                                                                            <div className="flex items-center gap-x-2 mb-2 sm:mb-0">
                                                                                <FaRegUser
                                                                                    size={
                                                                                        "12px"
                                                                                    }
                                                                                />
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
                                    )
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </Menu_Item>
        </>
    );
};

export default GestionarResenas;
