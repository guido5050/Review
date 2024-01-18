import React, { useState } from "react";
import Panel from "./Panel";
import Usuarios from "./Usuarios";
import Resenas from "./Resenas";
const MainLayout = ({ users }) => {
    console.log(users);
    const [resena, setResena] = useState(false);
    const [usuario, setUsuario] = useState(false);
    return (
        <>
            <div className="">
                <Panel setResena={setResena} setUsuario={setUsuario}></Panel>
                {resena && <Resenas></Resenas>}
                {usuario && <Usuarios users={users}></Usuarios>}
            </div>
        </>
    );
};

export default MainLayout;
