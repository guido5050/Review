import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Table, Badge } from "flowbite-react";
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { HiMiniDocumentArrowUp } from "react-icons/hi2";

import Menu_Item from "./Menu_Item";
import BtnPrimary from "./ui/BtnPrimary";
import ModalResenas from "./ui/ModalResenas";
import { TbMailUp } from "react-icons/tb";


const Clientes = ({ client, auth,logo,razon_social, plantillas, empresaId }) => {
    console.log(empresaId);
    /**
     * TODO: Client es la respuesta paginada del controlador PanelController ´clientes()´
     */
    const [modalOpen, setModalOpen] = useState(false);
    const [clienteId, setClienteId] = useState(null);
    const [email, setEmail] = useState(null);
    const [empresa, setEmpresa]= useState(empresaId);

    if (!client) return "Cargando...";

    return (
        <>
            <Menu_Item user={auth.user} logo={logo} razon_social={razon_social}>
                <div className="flex font-extrabold gap-x-3 flex-col p-10">
                    {modalOpen && (
                        <ModalResenas
                            email={email}
                            onClose={() => {
                                setModalOpen(false);
                                setClienteId(null);
                            }}
                            modalOpen={modalOpen}
                            clienteId={clienteId}
                            plantillas={plantillas}
                            empresa={empresa}
                        />
                    )}

                    <div className="flex overflow-x-auto sm:justify-center mb-7">
                        {client.prev_page_url && (
                            <Link
                                href={client.prev_page_url}
                                method="get"
                                preserveState
                                className="px-4 py-2 flex gap-x-2 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <MdKeyboardDoubleArrowLeft /> Página anterior
                            </Link>
                        )}
                        {client.next_page_url && (
                            <Link
                                href={client.next_page_url}
                                className="ml-3 px-4 flex gap-x-2  items-center py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                method="get"
                                preserveState
                            >
                                Página siguiente
                                <MdKeyboardDoubleArrowRight />
                            </Link>
                        )}
                    </div>
                    <div className=" flex gap-6 mb-6">
                        <Badge color="info" size="sm">
                            <p>Página actual: {client.current_page}</p>
                        </Badge>
                        <Badge color="success" size="sm">
                            <p>Total de páginas: {client.last_page}</p>
                        </Badge>

                        <Badge color="indigo" size="sm">
                            <p>Total de clientes: {client.total}</p>
                        </Badge>
                    </div>
                    <div className="overflow-x-auto animate-shake">
                        <Table >
                            <Table.Head>
                                <Table.HeadCell>Nombre completo</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Nacionalidad</Table.HeadCell>
                                <Table.HeadCell>Acciones</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {client.data.map((cliente, index) => (
                                    <Table.Row
                                        key={index}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {cliente.nombre_completo}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {cliente.email ? cliente.email : "No email"}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {cliente.nacionalidad ? cliente.nacionalidad : "No nacionalidad"}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <BtnPrimary
                                                className="bg-blue-600 hover:bg-blue-500 flex items-center"
                                                onClick={() => {
                                                    setModalOpen(true);
                                                    setClienteId(cliente.id_cliente);
                                                    setEmail(cliente.email);
                                                }}
                                                span={<TbMailUp size={"20px"}/>}
                                            >
                                                Enviar reseña
                                            </BtnPrimary>
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

export default Clientes;
