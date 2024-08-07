import React from 'react';
import { useState } from 'react';
import { IoCalendarNumberSharp } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { GiRoundStar } from "react-icons/gi";
import { Rating } from "flowbite-react";




import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarraEstaDisticaporMes = ({promediopormes,year,promeYear}) => {

    const promedioaño = promeYear && promeYear.promedio ? promeYear.promedio : '';    const [promedio, setPromedio] = useState(promediopormes);


    //const year = new Date().getFullYear();

        return (
            <div className=' '>
                     <div
                    id="titulo"
                    className="flex items-center justify-center gap-x-2"
                >
                    <h1 className="font-extrabold text-[50px] flex items-center">
                        <Rating size={'40px'}>
                        Estadistica de {new Date(year).getFullYear()} / Promedio Anual: { promedioaño}       <Rating.Star />/
                        </Rating>
                    </h1>
                    <div className="bg-[#3cd1f6] p-3 rounded-full  ">
                        <BsCalendar2Date color='black' size={"25px"}  />
                    </div>
                </div>
                  <ResponsiveContainer width="70%" aspect={5} className={'m-auto'}>
                    <LineChart
                        width={5}
                        height={3}
                        data={promediopormes}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Mes" />
                        <YAxis domain={[1, 5]} />
                        <Tooltip />

                        <Line type="monotone" dataKey={'promedio'} stroke="#3cd1f6" activeDot={{ r: 8 }}  />
                        {/* <Line type="monotone" dataKey="puntuacion_esperada" stroke="#82ca9d" /> */}
                    </LineChart>
                </ResponsiveContainer>
                <div className="bg-slate-200 flex text-center    m-auto w-[230px]   p-1 ">
                    <div className='bg-[#3cd1f6] w-[50px] mr-1'></div>
                    <p>Estadistica por Año</p>
                </div>
            </div>

            );
}

export default BarraEstaDisticaporMes;
