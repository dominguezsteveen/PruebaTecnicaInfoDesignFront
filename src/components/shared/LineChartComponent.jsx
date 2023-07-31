import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Dot } from 'recharts';
import { parseISO, format } from 'date-fns';

function LineChartComponent({ data, objetivo }) {

    const customTooltip = (data) => {
        if (data.active && data.payload && data.payload.length) {
            const { Fecha, Perdidas, Consumo, Costos } = data.payload[0].payload;

            return (
                <div className="custom-tooltip">
                    <p className="label">{`Fecha: ${Fecha}`}</p>
                    <p className="label">{`Perdida: ${objetivo == "Consumo" ? Consumo : objetivo == "Costos" ? Costos : Perdidas}`}</p>
                </div>
            );
        }
        return null;
    };

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'MM-dd');
    };


    const maxLoss = Math.max(...data.map((entry) => objetivo == "Consumo" ? entry.Consumo : objetivo == "Costos" ? entry.Costos : entry.Perdidas));
    const minLoss = Math.min(...data.map((entry) => objetivo == "Consumo" ? entry.Consumo : objetivo == "Costos" ? entry.Costos : entry.Perdidas));

    const getDotStyle = ({ cx, cy, index, stroke, payload }) => {
        let valorComparar = objetivo == "Consumo" ? payload.Consumo : objetivo == "Costos" ? payload.Costos : payload.Perdidas;
        if (valorComparar == maxLoss || valorComparar == minLoss) {
            return (
                <g key={index}>
                    <Dot cx={cx} cy={cy} r={8} fill={stroke} />
                    <Dot cx={cx} cy={cy} r={4} fill="#fff" stroke={stroke} strokeWidth={2} />
                </g>
            );
        } else {
            return null;
        }
    };
    return (
        <LineChart width={1500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Fecha" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip content={customTooltip} />
            <Legend />
            <Line type="monotone" dataKey={objetivo} stroke="#8884d8" dot={getDotStyle} />
        </LineChart>
    )
}


LineChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
    objetivo: PropTypes.string.isRequired,
}

export default LineChartComponent