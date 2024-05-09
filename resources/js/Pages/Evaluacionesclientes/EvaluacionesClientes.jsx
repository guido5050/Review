import React from "react";
import Menu_Item from "../panel/Menu_Item";
import { Table, Button, Tooltip } from "flowbite-react";
import { Link, router } from "@inertiajs/react";
import { Rating } from "flowbite-react";
const EvaluacionesClientes = ({
    auth,
    razon_social,
    logo,
    AppName,
    evaluaciones,
}) => {
    const gestionar = (idUsuario, IdEvaluacion) => {
        console.log(idUsuario, IdEvaluacion);
        router.get(
            `/panela/evaluaciones_clientes/${idUsuario}/${IdEvaluacion}`
        );
    };

    return (
        <>
            <Menu_Item
                user={auth.user}
                razon_social={razon_social}
                logo={logo}
                AppName={AppName}
            >
                <div className="overflow-x-auto animate-fade-down animate-ease-out p-8">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>ID#</Table.HeadCell>
                            <Table.HeadCell>Nombre Cliente</Table.HeadCell>
                            <Table.HeadCell>Puntuación</Table.HeadCell>
                            <Table.HeadCell>Moderador</Table.HeadCell>
                            <Table.HeadCell>Comentario</Table.HeadCell>
                            <Table.HeadCell>Fecha</Table.HeadCell>
                            <Table.HeadCell>

                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {evaluaciones.data.map((evaluacion, index) => (
                                <Table.Row
                                    key={index}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {evaluacion.id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            evaluacion.usuarios_clientes
                                                .nombre_completo
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Rating>
                                            <Rating.Star />
                                            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                {evaluacion.puntuacion_global
                                                    ? evaluacion.puntuacion_global
                                                    : "no puntuacion"}
                                            </p>
                                        </Rating>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            evaluacion.usuarios_empleado
                                                .nombre_completo
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        {evaluacion.comentario}
                                    </Table.Cell>
                                    <Table.Cell>{evaluacion.fecha}</Table.Cell>
                                    <Table.Cell>
                                        <Tooltip content="Ver los Detatalles de la Evaluacion">
                                        <Button
                                            onClick={() => {
                                                gestionar(
                                                    evaluacion.id_cliente,
                                                    evaluacion.id
                                                );
                                            }}
                                            color="blue"
                                        >
                                            Gestionar
                                        </Button>
                                        </Tooltip>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <div className="flex overflow-x-auto sm:justify-center mb-7">
                    {evaluaciones.prev_page_url && (
                        <Link
                            href={evaluaciones.prev_page_url}
                            className="px-4 py-2 flex gap-x-2 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Página anterior
                        </Link>
                    )}
                    {evaluaciones.next_page_url && (
                        <Link
                            href={evaluaciones.next_page_url}
                            className="ml-3 px-4 flex gap-x-2 items-center py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Página siguiente
                        </Link>
                    )}
                </div>
            </Menu_Item>
        </>
    );
};

export default EvaluacionesClientes;
