import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function LineChartComponent({ data }) {
    return (
        <LineChart width={1500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Perdidas" stroke="#8884d8" />
        </LineChart>
    )
}


LineChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
}

export default LineChartComponent