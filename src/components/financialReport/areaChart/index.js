import React from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
} from "recharts";

const AreaChartComponent = ({ data, option }) => {
    return (
        <div>
            <ResponsiveContainer width="100%" height={550}>
                <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {
                    option === "revenue" ? <Area type="monotone" dataKey="user_spent" stroke="#82ca9d" fill="#82ca9d" /> : <></>
                }
                <Area 
                    type="monotone" 
                    dataKey={option === "item" ? "amount" : "profit"}
                    stroke="#3f50b5" 
                    fill="#3f50b5" 
                />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AreaChartComponent
