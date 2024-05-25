import React from "react";
import Menu_Item from "./Menu_Item";
import { Table, Rating, Button, Tooltip } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { FaStar } from "react-icons/fa";
import { TbEyeStar } from "react-icons/tb";
import { router } from "@inertiajs/react";
import { Pagination } from "flowbite-react";
import { useState } from "react";

const Resenas = ({ auth, resenas, logo, razon_social, AppName, estados, empresas }) => {
    console.log(resenas);
    const [currentPage, setCurrentPage] = useState(resenas.current_page);
    const onPageChange = (page) => {
        console.log(page);
        router.visit(`http://127.0.0.1:8000/panela/resenas?page=${page}`, {
            preserveState: true,
        });
        setCurrentPage(page);
    };

    return (
        <>
            <Menu_Item
                user={auth.user}
                razon_social={razon_social}
                logo={logo}
                AppName={AppName}
                empresas={empresas}
            >
                <div className=" animate-fade-down animate-ease-out p-8">
                    <div>
                        <div className="flex overflow-x-auto sm:justify-end justify-center ">
                            <Pagination
                                currentPage={resenas.current_page}
                                totalPages={resenas.last_page}
                                onPageChange={onPageChange}
                                showIcons
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                    <Table >
                        <Table.Head>
                            <Table.HeadCell>ID#</Table.HeadCell>
                            <Table.HeadCell>Ref</Table.HeadCell>
                            <Table.HeadCell>Nombre Usuario</Table.HeadCell>
                            {/* <Table.HeadCell></Table.HeadCell> */}
                            <Table.HeadCell>Puntuación</Table.HeadCell>
                            <Table.HeadCell>Comentario Final</Table.HeadCell>
                            <Table.HeadCell>Estado</Table.HeadCell>
                            <Table.HeadCell> </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {resenas.data.map((resena, index) => (
                                <Table.Row
                                    key={index}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {resena.id_resena}
                                    </Table.Cell>
                                    <Table.Cell>{resena.id_reserva}</Table.Cell>
                                    <Table.Cell>
                                        {resena.usuarios_clientes ? (
                                            <p className="whitespace-nowrap">
                                                {
                                                    resena.usuarios_clientes
                                                        .nombre_completo
                                                }
                                            </p>
                                        ) : (
                                            "No definido"
                                        )}
                                    </Table.Cell>
                                    {/* <Table.Cell className="font-extrabold flex items-center gap-x-2">
                                        <FaStar size={"25px"} />
                                    </Table.Cell> */}
                                    <Table.Cell className="font-extrabold text-black">
                                        <Rating>
                                            <Rating.Star />
                                            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                {resena.Puntuacion_global ? (
                                                    resena.Puntuacion_global
                                                ) : (
                                                    <span className="whitespace-nowrap">
                                                        no puntuacion
                                                    </span>
                                                )}
                                            </p>
                                        </Rating>
                                    </Table.Cell>
                                    <Table.Cell className="font-extrabold text-black whitespace-nowrap">
                                        <p>
                                            {resena.comentario
                                                ? resena.comentario
                                                : "no-comentario"}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell className="font-extrabold text-black">
                                        {estados[resena.estado] &&
                                        estados[resena.estado][0] ? (
                                            <Tooltip
                                                content={
                                                    estados[resena.estado][0]
                                                        .descripcion
                                                }
                                            >
                                                <strong
                                                    className="whitespace-nowrap"
                                                    // title={
                                                    //     estados[resena.estado][0]
                                                    //         .descripcion
                                                    // }
                                                    cursor="pointer"
                                                >
                                                    {
                                                        estados[
                                                            resena.estado
                                                        ][0].estado
                                                    }
                                                </strong>
                                            </Tooltip>
                                        ) : (
                                            "Estado no definido"
                                        )}
                                    </Table.Cell>

                                    <Table.Cell className="font-extrabold text-white ">
                                        <Tooltip content="Ver los Detalles de la evaluacion">
                                            <Button
                                                color="blue"
                                                onClick={() => {
                                                    router.visit(
                                                        `/panela/resenas/${resena.id_usuario}/${resena.id_resena}`
                                                    );
                                                }}
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

                </div>
                {/* <div className="flex overflow-x-auto sm:justify-center mb-7">
                    {resenas.prev_page_url && (
                        <Link
                            href={resenas.prev_page_url}
                            className="px-4 py-2 flex gap-x-2 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Página anterior
                        </Link>
                    )}
                    {resenas.next_page_url && (
                        <Link
                            href={resenas.next_page_url}
                            className="ml-3 px-4 flex gap-x-2 items-center py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Página siguiente
                        </Link>
                    )}
                </div> */}
            </Menu_Item>
        </>
    );
};

export default Resenas;
