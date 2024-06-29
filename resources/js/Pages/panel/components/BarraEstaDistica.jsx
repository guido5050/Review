import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: "Enero", puntuacion_esperada: 5, puntuacion_obtenida: 2.8 },
    { name: "Febrero", puntuacion_esperada: 5, puntuacion_obtenida: 4.5 },
    { name: "Marzo", puntuacion_esperada: 5, puntuacion_obtenida: 2.5 },
    { name: "Abril", puntuacion_esperada: 5, puntuacion_obtenida: 3 },
    { name: "Mayo", puntuacion_esperada: 5, puntuacion_obtenida: 4 },
    { name: "Junio", puntuacion_esperada: 5, puntuacion_obtenida: 3.5 },
    { name: "Julio", puntuacion_esperada: 5, puntuacion_obtenida: 4 },
    { name: "Agosto", puntuacion_esperada: 5, puntuacion_obtenida: 4.5 },
    { name: "Septiembre", puntuacion_esperada: 5, puntuacion_obtenida: 4.2 },
    { name: "Octubre", puntuacion_esperada: 5, puntuacion_obtenida: 3.8 },
    { name: "Noviembre", puntuacion_esperada: 5, puntuacion_obtenida: 3.9 },
    { name: "Diciembre", puntuacion_esperada: 5, puntuacion_obtenida: 4 },
];

const BarraEstaDistica = () => {
        return (
                <ResponsiveContainer width="90%" aspect={4}>
                    <LineChart
                        width={5}
                        height={3}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[1, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="puntuacion_obtenida" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="puntuacion_esperada" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            );
}

export default BarraEstaDistica;
