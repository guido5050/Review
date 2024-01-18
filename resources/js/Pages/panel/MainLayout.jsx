import React, { useState } from "react";
import Panel from "./Panel";
import Test41 from "./Test41";
import Usuarios from "./Usuarios";
import Test42 from "./Test42";
const MainLayout = () => {
    const [resena, setResena] = useState(false);
    const [usuario, setUsuario] = useState(false);
    return (
        <>
            <div className="">
                <Panel setResena={setResena} setUsuario={setUsuario}></Panel>
                {resena && <Test41></Test41>}
                {usuario && <Usuarios></Usuarios>}
            </div>
        </>
    );
};

export default MainLayout;
