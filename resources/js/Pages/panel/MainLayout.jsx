import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Menu_Item from "./Menu_Item";
import Usuarios from "./Usuarios";
import Resenas from "./Resenas";
import Clientes from "./Clientes";

const MainLayout = ({ users, user, children, userAuth, client }) => {
    console.log(userAuth);
    const [resena, setResena] = useState(true);
    const [usuario, setUsuario] = useState(false);
    const [clientes, setClientes] = useState(false);
    const [nameAuth, setNameAuth] = useState(() => {
        const saved = localStorage.getItem("nameAuth");
        return saved || userAuth.nombre_completo;
    });

    // Actualizar localStorage cuando cambie el estado
    useEffect(() => {
        localStorage.setItem("nameAuth", nameAuth);
    }, [nameAuth]);
    return (
        <>
            <div className="">
                <Menu_Item
                    setResena={setResena}
                    setUsuario={setUsuario}
                    nameAuth={nameAuth}
                    setClientes={setClientes}
                ></Menu_Item>
                {resena && <Resenas></Resenas>}
                {usuario && <Usuarios users={users}></Usuarios>}
                {clientes && (
                    <Clientes
                        client={client}
                        setClientes={setClientes}
                    ></Clientes>
                )}
            </div>
        </>
    );
};

export default MainLayout;
