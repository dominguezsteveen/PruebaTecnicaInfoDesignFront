import PropTypes from 'prop-types';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartComponent({ data }) {
    return (
        <BarChart
            width={300}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontWeight={"bold"} fontSize={20} />
            <YAxis fontSize={13} fontWeight={"bold"} />
            <Tooltip />
            <Legend />
            {Object.keys(data[0]).map((element, index) => {
                if (index != 0) {
                    return <Bar key={index} dataKey={"Tramo " + index} fill={`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`} />
                }
            })}
        </BarChart>
    )
}


BarChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
}

export default BarChartComponent