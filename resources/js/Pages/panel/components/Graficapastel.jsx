import React from "react";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend , ResponsiveContainer} from "recharts";


export default function Graficapastel({ data,getRandomColor }) {


    // Generar un color aleatorio para cada elemento en los datos
    const COLORS = useMemo(() => data.map(() => getRandomColor()), [data]);

    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <ul className="border max-w-[30%] p-2 rounded-lg">
                {payload.map((entry, index) => (
                    <li key={`item-${index}`}>
                        <span   className={`rounded-full h-4 w-4 inline-block mr-2 bg-[] `} style={{ backgroundColor: entry.color }}/>
                        <span style={{ color: 'black' }}>
                            {entry.value}: {entry.payload.value}
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <PieChart
            width={1000}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <Pie
                data={data}
                cx={500}
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            {/* <Tooltip /> */}
            <Legend content={renderLegend} />
        </PieChart>
    );
}
