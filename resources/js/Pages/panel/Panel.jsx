import { router } from "@inertiajs/react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FcBusinessman } from "react-icons/fc";
import BtnPanel from "./ui/BtnPanel";
import Modal from "./Modal";

const navigation = [
    { name: "Usuarios", href: "", current: false },
    { name: "Resenas", href: "#", current: true },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Panel({ setResena, setUsuario, userAuth }) {
    const [btnconfig, setBtnconfig] = useState(false); //Estado del modal
    const [cargo, setCargo] = useState(userAuth.cargo); // para el usuario Walter este valor es 5
    const [btnCrearUsuario, setBtnCrearUsuario] = useState(true); //Estado que se encargara de manejar si se muestra el boton

    // if (cargo === 5 || cargo == 4) {
    //     setBtnCrearUsuario(true);
    // } else {
    //     setBtnCrearUsuario(false);
    // }

    const handleCrearUsuarioClick = () => {
        //Abre modal
        setBtnconfig(true);
    };
    const handleResenasClick = () => {
        //Resena
        setUsuario(false);
        setResena(true);
    };
    const handleusuariosClick = () => {
        //Usuarios

        setResena(false);
        setUsuario(true);
    };

    const handleItemClick = (itemName) => {
        switch (itemName) {
            case "Crear usuarios +":
                handleCrearUsuarioClick();

                break;
            case "Resenas":
                handleResenasClick();

                break;
            case "Usuarios":
                handleusuariosClick();
                //Aqui ejecuta la ruta
                break;
            // Puedes agregar más casos según sea necesario
            default:
                // Acciones por defecto o en caso de que no haya coincidencia
                break;
        }
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    {btnconfig && <Modal setBtnconfig={setBtnconfig}></Modal>}
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
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.name
                                                        ? "bg-gray-900 text-white"
                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "rounded-md px-3 py-2 text-sm font-medium "
                                                )}
                                                aria-current={
                                                    item.name
                                                        ? "page"
                                                        : undefined
                                                }
                                                onClick={() =>
                                                    handleItemClick(item.name)
                                                }
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                        {btnCrearUsuario && (
                                            <BtnPanel
                                                span={"+"}
                                                className={"animate-pulse"}
                                                onClick={
                                                    handleCrearUsuarioClick
                                                }
                                            >
                                                Crear usuarios
                                            </BtnPanel>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <div>
                                    <h1 className="text-white">
                                        {userAuth.nombre_completo}
                                    </h1>
                                </div>

                                <FcBusinessman size={"20px"} />
                                <Menu as="div" className="relative ml-3">
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
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Empresa
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/logout"
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Logout
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
                                        item.current ? "page" : undefined
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
    );
}
