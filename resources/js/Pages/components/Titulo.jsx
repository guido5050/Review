import { router } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";

const Titulo = ({ pregunta, data }) => {
    useEffect(() => {
        console.log(data);
        console.log("Holaa");
        console.log(pregunta);
        //router.get("/", { id: pregunta });
    }, [pregunta]);

    return <h1>{data}</h1>;
};

export default Titulo;
