import React from "react";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { router } from "@inertiajs/react";

const Dropdownx = ({ empresas}) => {
    const selectEmpresa = (id) => {

       const empresa = empresas.find((empresa) => empresa.id === id);

       router.post(
            "/panela/resenas/Session",
            { empresa: empresa},{preserveState: false}

        );

    };

    return (
        <Dropdown label={`Empresas`} dismissOnClick={false} color="none">
            {empresas.map((empresa) => {
                return (
                    <Dropdown.Item
                        onClick={() => selectEmpresa(empresa.id)}
                        key={empresa.id}
                    >
                        {empresa.razon_social}
                    </Dropdown.Item>
                );
            })}
        </Dropdown>
    );
};

export default Dropdownx;
