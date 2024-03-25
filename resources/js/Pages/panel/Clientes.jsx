import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Table, Badge, TextInput, Select,Label } from "flowbite-react";
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { HiMiniDocumentArrowUp } from "react-icons/hi2";

import Menu_Item from "./Menu_Item";
import BtnPrimary from "./ui/BtnPrimary";
import ModalResenas from "./ui/ModalResenas";
import { TbMailUp } from "react-icons/tb";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import ModalCrearClientes from "./ui/ModalCrearClientes";

const Clientes = ({
    client,
    encuesta,
    auth,
    logo,
    razon_social,
    plantillas,
    empresaId,
}) => {
    /**
     * TODO: Client es la respuesta paginada del controlador PanelController ´clientes()´
     */
    const [modalOpen, setModalOpen] = useState(false);
    const [clienteId, setClienteId] = useState(null);
    const [nombreCliente, setNombreCliente] = useState(null);
    const [email, setEmail] = useState(null);
    const [empresa, setEmpresa] = useState(empresaId);
    const [modalCrearClientes, setModalCrearClientes] = useState(true);
    const [busquedaPor, setBusquedaPor] = useState("Todos");

    const [busqueda, setBusqueda] = useState("");
    const handleSelectChange = (event) => {
        setBusquedaPor(event.target.value);
        router.get(
            "/panela/clientes",
            { busqueda: busqueda, busquedaPor: event.target.value },
            { preserveState: true }
        );
    };
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setBusqueda(value);

        router.get(
            "/panela/clientes",
            { busqueda: value, busquedaPor: event.target.value },
            { preserveState: true }
        );
    };

    console.log(client);
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
                            nombreCliente={nombreCliente}
                        />
                    )}
                    <div className="flex overflow-x-auto sm:justify-center mb-7 ">
                        {client.prev_page_url && (
                            <Link
                                href={`${client.prev_page_url}${client.prev_page_url.includes('?') ? '&' : '?'}busqueda=${busqueda}&busquedaPor=${busquedaPor}`}
                                method="get"
                                preserveState
                                className="px-4 py-2 flex gap-x-2 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <MdKeyboardDoubleArrowLeft /> Página anterior
                            </Link>
                        )}
                        {client.next_page_url && (
                            <Link
                                href={`${client.next_page_url}${client.next_page_url.includes('?') ? '&' : '?'}busqueda=${busqueda}&busquedaPor=${busquedaPor}`}
                                className="ml-3 px-4 flex gap-x-2  items-center py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                method="get"
                                preserveState
                            >
                                Página siguiente
                                <MdKeyboardDoubleArrowRight />
                            </Link>
                        )}
                    </div>

                    <div className=" flex  justify-between items-center p-5  ">
                        <div>
                            {modalCrearClientes && <ModalCrearClientes />}
                        </div>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="pl-10 pr-4 py-1 border rounded-md"
                                placeholder="Buscar Cliente"
                                value={busqueda}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="flex items-center gap-x-1">
                            <Label>
                                Buscar por:
                            </Label>
                            <Select
                                value={busquedaPor}
                                onChange={handleSelectChange}
                            >
                                <option value="">Todos</option>
                                <option value="correo">Con correo</option>
                                <option value="sinCorreo">Sin correo</option>
                            </Select>
                        </div>

                        <div className="flex gap-3 ">
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
                    </div>
                    <div className="overflow-x-auto animate-fade-down animate-ease-out">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Nombre completo</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Nacionalidad</Table.HeadCell>
                                <Table.HeadCell>
                                    Enviar Evaluaciones
                                </Table.HeadCell>
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
                                            {cliente.email
                                                ? cliente.email
                                                : "No email"}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {cliente.nacionalidad
                                                ? cliente.nacionalidad
                                                : "No nacionalidad"}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {encuesta ? (
                                                <BtnPrimary
                                                    className="bg-blue-600 hover:bg-blue-500 flex items-center"
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                        setClienteId(
                                                            cliente.id_cliente
                                                        );
                                                        setEmail(cliente.email);
                                                        setNombreCliente(
                                                            cliente.nombre_completo
                                                        );
                                                    }}
                                                    span={
                                                        <TbMailUp
                                                            size={"20px"}
                                                        />
                                                    }
                                                >
                                                    Enviar Evaluacion
                                                </BtnPrimary>
                                            ) : (
                                                <Link
                                                    title="Si ve este boton es por que no ha configurado la encuesta"
                                                    href="/panela/encuesta"
                                                    className="text-white inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                >
                                                    Gestionar Encuesta
                                                </Link>
                                            )}
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
