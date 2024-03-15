import React from "react";
import Menu_Item from "./Menu_Item";
import { Table, Badge } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { FaStar } from "react-icons/fa";
import { TbEyeStar } from "react-icons/tb";

const Resenas = ({ auth, resenas, logo, razon_social, AppName, estados }) => {
    return (
        <>
            <Menu_Item
                user={auth.user}
                razon_social={razon_social}
                logo={logo}
                AppName={AppName}
            >
                <div className="overflow-x-auto animate-shake p-8">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>ID#</Table.HeadCell>
                            <Table.HeadCell>Ref</Table.HeadCell>
                            <Table.HeadCell>Nombre Usuario</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
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
                                        {resena.usuarios_clientes
                                            ? resena.usuarios_clientes.nombre_completo
                                            : "No definido"}
                                    </Table.Cell>
                                    <Table.Cell className="font-extrabold flex items-center gap-x-2">
                                        <FaStar size={"25px"} />
                                    </Table.Cell>
                                    <Table.Cell className="font-extrabold text-black whitespace-nowrap ">
                                        {resena.Puntuacion_global
                                            ? resena.Puntuacion_global
                                            : "no puntuacion"}
                                    </Table.Cell>
                                    <Table.Cell className="font-extrabold text-black whitespace-normal">
                                        <p className="w-64 overflow-hidden line-clamp-2">
                                            {resena.comentario ? resena.comentario : "no-comentario"}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell className="font-extrabold text-black">
                                        {estados[resena.estado] &&
                                        estados[resena.estado][0] ? (
                                            <strong
                                                className="whitespace-nowrap"
                                                title={estados[resena.estado][0].descripcion}
                                            >
                                                {estados[resena.estado][0].estado}
                                            </strong>
                                        ) : (
                                            "Estado no definido"
                                        )}
                                    </Table.Cell>

                                    <Table.Cell className="font-extrabold text-white text-center">
                                        <Link
                                            href={`/panela/resenas/${resena.id_usuario}/${resena.id_resena}`}
                                            className="flex items-center justify-center gap-x-1 bg-blue-700 hover:bg-blue-800 rounded-lg py-1 px-2"
                                        >
                                            GESTIONAR
                                            <TbEyeStar
                                                size={"20"}
                                                className="animate-pulse animate-ease-linear"
                                            />
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <div className="flex overflow-x-auto sm:justify-center mb-7">
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
                </div>
            </Menu_Item>
        </>
    );
};

export default Resenas;
