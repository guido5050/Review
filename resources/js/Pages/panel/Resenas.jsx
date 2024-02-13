import React from "react";
import Menu_Item from "./Menu_Item";
const Resenas = ({ auth, resenas, logo,  razon_social, AppName }) => {
    console.log(resenas);
    return (
        <>
            <Menu_Item
            user={auth.user}
            razon_social={razon_social}
            logo={logo}
            AppName={AppName}>
                <div className="">
                    <h1>Reseñas</h1>
                </div>
            </Menu_Item>
        </>
    );
};

export default Resenas;
