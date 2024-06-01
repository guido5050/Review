import React from "react";

const AccesoDenegado = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen  text-black">
            <img
                alt="Access Denied"
                src="/images/AccesoDenegado/6325-[Convertido].png"
                className="mb-8"
            />
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg text-center">
                You do not have permission to access this page.
            </p>
        </div>
    );
};

export default AccesoDenegado;
