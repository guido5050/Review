import React from "react";
import Menu_Item from "./Menu_Item";
const Accesos = ({
    auth,
    logo,
    razon_social,
    AppName,
    empresas,
    empleado,
    accesos,
}) => {
    console.log(auth);
    return (
        <Menu_Item
            user={auth.user}
            logo={logo}
            razon_social={razon_social}
            AppName={AppName}
            empresas={empresas}
        >
            <>
            <div>{empleado.nombre_completo}</div>
                {accesos.map((acceso) => (
                    <li key={acceso.id}>{acceso.nombre_vista}</li>
                ))}
            </>
        </Menu_Item>
    );
};
export default Accesos;
