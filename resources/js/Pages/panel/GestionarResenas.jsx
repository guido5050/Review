import React from "react";
import Menu_Item from "./Menu_Item";
import BtnPrimary from "./ui/BtnPrimary";
import { Table, Card } from "flowbite-react";

import { BiMessageRoundedDots } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { TbMessageStar } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaEnvelopeOpenText } from "react-icons/fa";

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
}) => {
    // Transforma respuestas en un objeto donde cada clave es un título de pregunta
    // y cada valor es un objeto que contiene un array de respuestas y la puntuación total para esa pregunta
     console.log(respuestas);

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
        console.log(respuestasAgrupadas);

    return (
        <>
            <Menu_Item user={auth.user} logo={logo} razon_social={razon_social}>
                <div className="p-8 flex gap-y-2 justify-center mt-2 animate-fade-up animate-ease-in-out flex-col">
                    <Card>
                        <div className="flex items-center gap-1 text-xl">
                            <h1 className="text-xl font-extrabold">{nombre}</h1>
                            <BiUser size={"25px"} />
                        </div>
                        <div className="flex items-center gap-x-1 text-xl">
                            <p className="font-extrabold">
                                {`Comentario:`}
                                <strong className="text-gray-500">
                                    {comentario
                                        ? comentario
                                        : "Reseña no terminada"}
                                </strong>
                            </p>
                            <TbMessageStar size={"20px"} />
                        </div>
                        <div className=" flex items-center gap-x-1">
                            <p className="font-extrabold text-xl">
                                {`Puntuacion Global:`}
                                <strong className="text-gray-500">
                                    {puntuacion}
                                </strong>
                            </p>
                            <FaStar size={"18px"} />
                        </div>
                        <div className=" flex items-center gap-x-1">
                            <p className="font-extrabold text-xl">
                                {`Reseña:`}
                                <strong className="text-gray-500">
                                    {idresena}
                                </strong>
                            </p>
                            <FaEnvelopeOpenText size={"18px"} />
                        </div>
                    </Card>

                    <div>
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Pregunta y Puntuacion</Table.HeadCell>
                                <Table.HeadCell>Respuestas Seleccionadas por el cliente</Table.HeadCell>
                                <Table.HeadCell>
                                    Dejar comentario
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    {" "}
                                    <FaRegCommentDots size={"28px"} />
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y text-lg">
                                {Object.entries(respuestasAgrupadas).map(
                                    (
                                        [
                                            titulo,
                                            { respuestas, puntuacionTotal, idPregunta },
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
                                                        <CiStar
                                                            key={i}
                                                            size={"40px"}
                                                        />
                                                    ))}
                                                    <p className="text-2xl">
                                                        {puntuacionTotal}
                                                    </p>
                                                </div>
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
                                            <Table></Table>
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
