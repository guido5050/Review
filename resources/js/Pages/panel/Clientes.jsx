import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {
    Table,
    Badge,
    TextInput,
    Select,
    Label,
    Breadcrumb,
    Tooltip,
} from "flowbite-react";
import { BiX } from "react-icons/bi";
import Menu_Item from "./Menu_Item";
import BtnPrimary from "./ui/BtnPrimary";
import ModalResenas from "./ui/ModalResenas";
import { TbMailUp } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import ModalCrearClientes from "./ui/ModalCrearClientes";
import { Pagination } from "flowbite-react";
import AccesoDenegado from "./ui/AccesoDenegado";
const Clientes = ({
    client,
    encuesta,
    estadoPreguntas,
    auth,
    logo,
    razon_social,
    plantillas,
    empresaId,
    empresas,
    Accesos,
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
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => {
        setCurrentPage(page);
        router.visit(
            `/panela/clientes?page=${page}&busqueda=${busqueda}&busquedaPor=${busquedaPor}`,
            { preserveState: true }
        );
    };
    console.log(client);
    if (!client) return "Cargando...";

    return (
        <>
            <Menu_Item user={auth.user} logo={logo} razon_social={razon_social} empresas={empresas}>
                {Accesos.some((acceso) => acceso.id === 3) ? (
                     <div className=" overflow-x-auto  flex font-extrabold gap-x-3 flex-col md:p-10 ">
                     {" "}
                     {/**Div principal */}
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
                     {/* <div className="flex overflow-x-auto sm:justify-center mb-7  ">
                         {client.prev_page_url && (
                             <Link
                                 href={`${client.prev_page_url}${
                                     client.prev_page_url.includes("?")
                                         ? "&"
                                         : "?"
                                 }busqueda=${busqueda}&busquedaPor=${busquedaPor}`}
                                 method="get"
                                 preserveState
                                 className="px-4 py-2 flex gap-x-2 items-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                             >
                                 <MdKeyboardDoubleArrowLeft /> Página anterior
                             </Link>
                         )}
                         {client.next_page_url && (
                             <Link
                                 href={`${client.next_page_url}${
                                     client.next_page_url.includes("?")
                                         ? "&"
                                         : "?"
                                 }busqueda=${busqueda}&busquedaPor=${busquedaPor}`}
                                 className="ml-3 px-4 flex gap-x-2  items-center py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                 method="get"
                                 preserveState
                             >
                                 Página siguiente
                                 <MdKeyboardDoubleArrowRight />
                             </Link>
                         )}
                     </div> */}
                     <div className=" flex flex-col md:flex-row    justify-between items-center p-1  ">
                         <div className=" flex p-2  md:gap-x-10">
                             <div>
                                 {modalCrearClientes && <ModalCrearClientes />}
                             </div>

                             <Tooltip content="Buscar Clientes Por: Todos, Con correo, Sin correo">
                                 <div className="flex items-center gap-x-1">
                                     <Label>Buscar por:</Label>
                                     <Select
                                         value={busquedaPor}
                                         onChange={handleSelectChange}
                                         className="cursor-pointer"
                                         cursor="pointer"
                                     >
                                         <option value="">Todos</option>
                                         <option value="correo">
                                             Con correo
                                         </option>
                                         <option value="sinCorreo">
                                             Sin correo
                                         </option>
                                     </Select>
                                 </div>
                             </Tooltip>
                         </div>

                         <div className="relative m-4">
                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                             <input
                                 type="text"
                                 className="pl-10 pr-4 py-1 border rounded-md"
                                 placeholder="Buscar Cliente"
                                 value={busqueda}
                                 onChange={handleSearchChange}
                             />
                         </div>
                         <div className="flex  sm:flex-row gap-3">
                             <Badge
                                 color="info"
                                 size="sm"
                                 className="text-xs sm:text-sm"
                             >
                                 <p>Página actual: {client.current_page}</p>
                             </Badge>
                             <Badge
                                 color="success"
                                 size="sm"
                                 className="text-xs sm:text-sm"
                             >
                                 <p>Total de páginas: {client.last_page}</p>
                             </Badge>
                             <Badge
                                 color="indigo"
                                 size="sm"
                                 className="text-xs sm:text-sm"
                             >
                                 <p>Total de clientes: {client.total}</p>
                             </Badge>
                         </div>
                     </div>
                     <div className="flex  md:justify-end justify-center">
                         <div className="flex overflow-x-auto sm:justify-start my-2">
                             <Pagination
                                 size="sm"
                                 currentPage={client.current_page}
                                 totalPages={client.last_page}
                                 onPageChange={onPageChange}
                                 showIcons
                             />
                         </div>
                     </div>
                     <div className=" animate-fade-down animate-ease-out overflow-x-auto">
                         <Table>
                             <Table.Head>
                                 <Table.HeadCell>Nombre completo</Table.HeadCell>
                                 <Table.HeadCell>Email</Table.HeadCell>
                                 <Table.HeadCell>Nacionalidad</Table.HeadCell>
                                 <Table.HeadCell>
                                     Enviar Evaluaciones
                                 </Table.HeadCell>
                                 <Table.HeadCell>Evaluar cliente</Table.HeadCell>
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
                                         <Table.Cell
                                             className={
                                                 cliente.email
                                                     ? ""
                                                     : "text-red-500 flex items-center"
                                             }
                                         >
                                             {cliente.email ? (
                                                 cliente.email
                                             ) : (
                                                 <>
                                                     <span className="whitespace-nowrap">
                                                         No email
                                                     </span>
                                                     <BiX size="20px" />
                                                 </>
                                             )}
                                         </Table.Cell>

                                         <Table.Cell>
                                             {cliente.nacionalidad
                                                 ? cliente.nacionalidad
                                                 : "No nacionalidad"}
                                         </Table.Cell>
                                         <Table.Cell>
                                             {encuesta === true &&
                                             estadoPreguntas === true ? (
                                                 <Tooltip content="Enviar Evaluacion al Cliente por medio de Correo Electronico!">
                                                     <BtnPrimary
                                                         className="bg-blue-600 hover:bg-blue-500 flex items-center justify-center sm:text-sm "
                                                         onClick={() => {
                                                             setModalOpen(true);
                                                             setClienteId(
                                                                 cliente.id_cliente
                                                             );
                                                             setEmail(
                                                                 cliente.email
                                                             );
                                                             setNombreCliente(
                                                                 cliente.nombre_completo
                                                             );
                                                         }}
                                                         span={
                                                             <TbMailUp
                                                                 size={"20px"}
                                                                 className="mr-1" // Añade un margen a la derecha del icono
                                                             />
                                                         }
                                                     >
                                                         <span className="whitespace-nowrap">
                                                             Enviar Evaluacion
                                                         </span>
                                                     </BtnPrimary>
                                                 </Tooltip>
                                             ) : (
                                                 <Link
                                                     title="Si ve este boton es por que no ha configurado la encuesta"
                                                     href="/panela/encuesta"
                                                     className="text-white inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                 >
                                                     Editar Encuesta
                                                 </Link>
                                             )}
                                         </Table.Cell>
                                         <Table.Cell>
                                             <Link
                                                 href={`/panela/evaluaciones_clientes/${cliente.id_cliente}`}
                                                 className="text-white inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                             >
                                                 <span className="whitespace-nowrap">
                                                     Evaluar cliente
                                                 </span>
                                             </Link>
                                         </Table.Cell>
                                     </Table.Row>
                                 ))}
                             </Table.Body>
                         </Table>
                     </div>
                 </div>
                ) : <AccesoDenegado />}

            </Menu_Item>
        </>
    );
};

export default Clientes;
