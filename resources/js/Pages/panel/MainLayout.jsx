import React, { useState } from "react";
import Menu_Item from "./Menu_Item";
import Usuarios from "./Usuarios";
import Resenas from "./Resenas";

const MainLayout = ({ users, userAuth }) => {
    const [resena, setResena] = useState(true);
    const [usuario, setUsuario] = useState(false);
    return (
        <>
            <div className="">
                <Menu_Item
                    setResena={setResena}
                    setUsuario={setUsuario}
                    userAuth={userAuth}
                ></Menu_Item>
                {resena && <Resenas></Resenas>}
                {usuario && <Usuarios users={users}></Usuarios>}
            </div>
        </>
    );
};

export default MainLayout;
