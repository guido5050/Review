import { router, Link } from "@inertiajs/react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FcBusinessman } from "react-icons/fc";
import BtnPanel from "./ui/BtnPanel";
import ModalCrearUsuarios from "./ui/ModalCrearUsuarios";
import { FcDepartment } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { Head } from "@inertiajs/react";
import ModalCrearEmpresa from "./ui/ModalCrearEmpresa";



const navigation = [
    { name: "Resenas", href: "/panela/resenas", current: true, method: "get" },
    {
        name: "Clientes",
        href: "/panela/clientes",
        current: false,
        method: "get",
    },
];

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
    // console.log(logo);

    //const [ModalEmail, setModalEmail] = useState(false);
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState(
        localStorage.getItem("activeItem") || null
    );

    useEffect(() => {
        localStorage.setItem("activeItem", activeItem);
    }, [activeItem]);

    return (
        <div>
            <>
                <Head>
                    <title>{` ${razon_social}. ${AppName}`}</title>
                    <link rel="icon" href={`${logo}`} />
                </Head>

                <Disclosure as="nav" className="bg-gray-800 py-2 shadow-lg ">
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
                                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                        {/* <div className="flex flex-shrink-0 items-center text-white flex gap-x-2">
                                            <img
                                                src={logo}
                                                alt="Mi Imagen"
                                                //TODO: aqui estaba la imagen
                                                className="w-[30px] h-auto px-0.1 rounded-xl"
                                            />
                                        </div> */}
                                        <div className="hidden sm:ml-6 sm:block">
                                            <div className="flex space-x-4">
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
                                                                ? "bg-gray-900 text-white"
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                            "rounded-md px-3 py-2 text-sm font-medium"
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
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                        {/* Profile dropdown */}
                                        <div className="flex gap-x-3 p-2">
                                            <h1 className="text-white   py-1 bg-slate-700 font-extrabold flex items-center justify-center rounded-lg px-4 gap-1">
                                                {razon_social}{" "}
                                                <img
                                                    src={logo}
                                                    alt=""
                                                    className="w-[20px] rounded-xl"
                                                />
                                            </h1>
                                            <h1 className="text-white bg-slate-700 font-extrabold flex items-center justify-center px-4 rounded-lg gap-1">
                                                {user.nombre_completo}
                                                <FcBusinessman size={"20px"} />
                                            </h1>
                                            <a
                                                href="/logout"
                                                className="text-blue-400 bg-slate-700 font-extrabold flex gap-1 items-center justify-center rounded-lg px-4"
                                            >
                                                cerar sesion
                                                <FiLogOut />
                                            </a>
                                        </div>

                                        <Menu
                                            as="div"
                                            className="relative ml-3"
                                        >
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <IoSettingsOutline
                                                        size={"30px"}
                                                        color={"white"}
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
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Config Empresa
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
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Gestionar
                                                                Encuesta
                                                            </Link>
                                                        )}
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/panela/usuarios"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700 w-full text-start"
                                                                )}
                                                            >
                                                                Config Usuarios
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/panela/config.mail"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700 w-full text-start"
                                                                )}
                                                            >
                                                                Config Plantilla
                                                                Email
                                                            </Link>
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
            <main>{children}</main>
        </div>
    );
}
