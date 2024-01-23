import React, { useState } from "react";
import Panel from "./Panel";
import Usuarios from "./Usuarios";
import Resenas from "./Resenas";

const MainLayout = ({ users, userAuth }) => {
    const [resena, setResena] = useState(false);
    const [usuario, setUsuario] = useState(true);
    return (
        <>
            <div className="">
                <Panel
                    setResena={setResena}
                    setUsuario={setUsuario}
                    userAuth={userAuth}
                ></Panel>
                {resena && <Resenas></Resenas>}
                {usuario && <Usuarios users={users}></Usuarios>}
            </div>
        </>
    );
};

export default MainLayout;
