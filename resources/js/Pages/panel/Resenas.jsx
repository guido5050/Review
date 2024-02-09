import React from "react";
import Menu_Item from "./Menu_Item";
const Resenas = ({ auth, resenas }) => {
    console.log(resenas);
    return (
        <>
            <Menu_Item user={auth.user}>
                <div className="">
                    <h1>Reseñas</h1>
                </div>
            </Menu_Item>
        </>
    );
};

export default Resenas;
