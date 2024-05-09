import React, { useEffect, useState } from "react";
import Menu_Item from "./Menu_Item";
import Resenas from "./Resenas";
import Footer2 from "./components/Footer2";
const MainLayout = ({ auth }) => {
    return (
        <>
            <div className="">
                <Menu_Item user={auth.user}>
                    <Resenas />
                </Menu_Item>
                
            </div>
        </>
    );
};

export default MainLayout;
