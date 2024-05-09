import { router, Link } from "@inertiajs/react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FcBusinessman } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { Head } from "@inertiajs/react";
import Footer2 from "./components/Footer2";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Menu_Item({
    user,
    children,
    logo,
    razon_social,
    AppName,
}) {
    const navigation = [
        {
            name: `Evaluaciones a: ${razon_social} `,
            href: "/panela/resenas",
            current: true,
            method: "get",
        },
        {
            name: "Evaluaciones a clientes",
            href: "/panela/evaluaciones_clientes/show",
            current: false,
        },
        {
            name: "Lista de Clientes",
            href: "/panela/clientes",
            current: false,
            method: "get",
        },
    ];

    // console.log(logo);

    //const [ModalEmail, setModalEmail] = useState(false);
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState(
        localStorage.getItem("activeItem") || null
    );
    const [agregarusuario, setAgregarusuario] = useState(false);

    useEffect(() => {
        localStorage.setItem("activeItem", activeItem);
    }, [activeItem]);

    console.log(agregarusuario);

    return (
        <div className="flex flex-col min-h-screen">
            <>
                <Head>
                    <title>{` ${razon_social}. ${AppName}`}</title>
                    <link rel="icon" href={`${logo}`} />
                </Head>

                <Disclosure as="nav" className=" py-2 shadow-lg ">
                    {({ open }) => (
                        <>
                            {/* {btnconfig && <Modal setBtnconfig={setBtnconfig}></Modal>} */}
                            {modal && (
                                <ModalCrearUsuarios
                                    setModal={setModal}
                                    modal={modal}
                                ></ModalCrearUsuarios>
                            )}

                            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                                <div className="relative flex h-16 items-center justify-between">
                                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                        {/* Mobile menu button*/}

                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center  sm:items-stretch sm:justify-start">
                                        {/* <div className="flex flex-shrink-0 items-center text-white flex gap-x-2">
                                            <img
                                                src={logo}
                                                alt="Mi Imagen"
                                                //TODO: aqui estaba la imagen
                                                className="w-[30px] h-auto px-0.1 rounded-xl"
                                            />
                                        </div> */}
                                        <div className="sm:ml-6 hidden md:block ">
                                            <div className="flex space-x-3 items-center">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        method={item.method}
                                                        preserveState
                                                        onMouseDown={() =>
                                                            setActiveItem(
                                                                item.name
                                                            )
                                                        } // Use onMouseDown instead of onClick
                                                        className={classNames(
                                                            activeItem ===
                                                                item.name
                                                                ? " text-black bg-slate-200 border-b-2 border-black  hover:bg-slate-200 hover:text-black"
                                                                : "text-gray-500 hover:text-black",
                                                            "rounded-md px-3 py-2 text-sm font-medium flex items-center justify-center"
                                                        )}
                                                        aria-current={
                                                            activeItem ===
                                                            item.name
                                                                ? "page"
                                                                : undefined
                                                        }
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                                        <h1 className="text-black font-extrabold flex items-center justify-center px-4 rounded-lg gap-1">
                                            {user.nombre_completo}
                                            <FcBusinessman size={"20px"} />
                                        </h1>
                                        {/* Profile dropdown */}
                                        {/* <div className="flex gap-x-3 p-2">
                                            <h1 className="text-black  py-1 font-extrabold flex items-center justify-center rounded-lg px-4 gap-1">
                                                {razon_social}{" "}
                                                <img
                                                    src={logo}
                                                    alt=""
                                                    className="w-[20px] rounded-xl"
                                                />
                                            </h1>
                                            <h1 className="text-black font-extrabold flex items-center justify-center px-4 rounded-lg gap-1">
                                                {user.nombre_completo}
                                                <FcBusinessman size={"20px"} />
                                            </h1>
                                            <a
                                                href="/logout"
                                                className="text-blue-700  font-extrabold flex gap-1 items-center justify-center rounded-lg px-4"
                                            >
                                                cerrar sesion
                                                <FiLogOut />
                                            </a>
                                        </div> */}

                                        <Menu
                                            as="div"
                                            className="relative ml-3 "
                                        >
                                            <div>
                                                <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <IoSettingsOutline
                                                        size={"30px"}
                                                        color={"black"}
                                                        className="animate-pulse"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute  right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/panela/empresa"
                                                                preserveState
                                                                only={[
                                                                    "config",
                                                                ]}
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100 flex items-center space-x-2 gap-x-1 "
                                                                        : "flex items-center space-x-2 gap-x-1",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                <IoSettingsOutline
                                                                    size={
                                                                        "20px"
                                                                    }
                                                                    className="align-middle"
                                                                />
                                                                Configuracion de
                                                                Empresa{" "}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/panela/encuesta"
                                                                preserveState
                                                                only={[
                                                                    "config",
                                                                ]}
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100 flex items-center space-x-2 gap-x-1 "
                                                                        : "flex items-center space-x-2 gap-x-1",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                <IoSettingsOutline
                                                                    size={
                                                                        "16px"
                                                                    }
                                                                    className="align-middle"
                                                                />
                                                                Configurar
                                                                Evaluacion a
                                                                Empresa{" "}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/panela/encuestaclientes/"
                                                                preserveState
                                                                only={[
                                                                    "config",
                                                                ]}
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100 flex items-center space-x-2 gap-x-1 "
                                                                        : "flex items-center space-x-2 gap-x-1",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                <IoSettingsOutline
                                                                    size={
                                                                        "16px"
                                                                    }
                                                                    className="align-middle"
                                                                />
                                                                Configurar
                                                                Evaluacion a
                                                                Clientes{" "}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/panela/usuarios"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100 flex items-center space-x-2 gap-x-1 "
                                                                        : "flex items-center space-x-2 gap-x-1",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                <RiUserSettingsLine
                                                                    size={
                                                                        "16px"
                                                                    }
                                                                />
                                                                Configurar de
                                                                Usuarios{" "}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/panela/config.mail"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100 flex items-center space-x-2 gap-x-1 "
                                                                        : "flex items-center space-x-2 gap-x-1",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                <MdOutlineMailOutline
                                                                    size={
                                                                        "16px"
                                                                    }
                                                                />
                                                                Configurar
                                                                Plantilla de
                                                                Email
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/logout"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100 flex items-center space-x-2 gap-x-1 "
                                                                        : "flex items-center space-x-2 gap-x-1 mt-5",
                                                                    "block px-4 py-2 text-sm text-gray-700 mt-5"
                                                                )}
                                                            >
                                                                <FiLogOut
                                                                    size={
                                                                        "16px"
                                                                    }
                                                                />
                                                                Cerrar Sesion
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "block rounded-md px-3 py-2 text-base font-medium"
                                            )}
                                            aria-current={
                                                item.current
                                                    ? "page"
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </>
            {/* <div>
                <div className="flex gap-x-3 p-2 justify-end ">
                   <h1 className="text-black  py-1 font-extrabold flex items-center justify-center rounded-lg px-4 gap-1">
                        {razon_social}{" "}
                        <img
                            src={logo}
                            alt=""
                            className="w-[20px] rounded-xl"
                        />
                    </h1>
                    <h1 className="text-black font-extrabold flex items-center justify-center px-4 rounded-lg gap-1">
                        {user.nombre_completo}
                        <FcBusinessman size={"20px"} />
                    </h1>
                </div>
            </div> */}
            <main className="mb-auto">{children}</main>
            <footer>
                <Footer2 />
            </footer>
        </div>
    );
}
