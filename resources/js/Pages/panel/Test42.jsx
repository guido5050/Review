import React from "react";

const Test42 = ({ test2 }) => {
    const entries = Object.entries(test2);

    console.log(test2);
    return (
        <>
            <ul>
                {entries.map(([clave, valor]) => (
                    <li key={clave}>
                        <strong>{clave}:</strong> {valor}
                    </li>
                ))}
            </ul>
            
        </>
    );
};

export default Test42;
