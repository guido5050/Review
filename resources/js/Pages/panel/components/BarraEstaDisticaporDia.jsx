import React from 'react'
import { IoMdCalendar } from "react-icons/io";
import { format, setYear } from 'date-fns';
import { es } from 'date-fns/locale'
import { CiCalendarDate } from "react-icons/ci";
import { BsCalendar2Date } from "react-icons/bs";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const date = new Date();
const month = monthNames[date.getMonth()];
const BarraEstaDisticaporDia = ({promedioMes, month,year}) => {




    return (
        <div className='mt-[50px]'>
             <div
                    id="titulo"
                    className="flex items-center justify-center gap-x-2"
                >
   <div className="font-extrabold text-[50px] flex">
    Estadísticas de {format(new Date(month), 'MMMM', { locale: es } )}

</div>
                    <div className="bg-[#3cd1f6] p-3  rounded-full">
                    <BsCalendar2Date size={'25px'} />
                    </div>
                </div>
              <ResponsiveContainer width="70%" aspect={5} className={'m-auto'}>
            <LineChart
                width={5}
                height={3}
                data={promedioMes}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Dia" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monoton" dataKey={'promedio'} stroke="#3cd1f6" activeDot={{ r: 8 }}  />
                {/* <Line type="monotone" dataKey="puntuacion_esperada" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
        <div className="bg-slate-200 flex text-center    m-auto w-[230px]   p-1 ">
                    <div className='bg-[#3cd1f6] w-[50px] mr-1'></div>
                    <p>Estadistica por Mes</p>
                </div>
        </div>


    );
}
export default BarraEstaDisticaporDia
