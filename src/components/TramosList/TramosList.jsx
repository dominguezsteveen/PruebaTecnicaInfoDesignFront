import { useEffect, useState } from "react";
import TableTramos from "./TableTramos";
import BarChartComponent from "../shared/BarChartComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'

function TramosList() {
    const [tramos, setTramos] = useState([]);
    const [startDate, setStartDate] = useState(new Date("2010-01-02"));
    const [endDate, setEndDate] = useState(new Date("2010-01-31"));

    const getTramos = async (starDate, endDate) => {
        const endpoint = "http://127.0.0.1:4000/tramos";
        const requestData = {
            fechainicial: format(starDate, 'yyyy-MM-dd'),
            fechafinal: format(endDate, 'yyyy-MM-dd')
        };
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Response was not ok');
            }

            const responseData = await response.json();
            setTramos(responseData);
            return responseData;
        } catch (error) {
            console.error('Error fetching data:', error);
            setTramos(null);
            return null;
        }
    };

    useEffect(() => {
        getTramos(startDate, endDate);
    }, [startDate, endDate]);

    const dataConsumo = tramos.reduce(
        (acc, tramo) => {
            acc[0][tramo.Linea] = tramo.consumo;
            return acc;
        },
        [{ name: "Consumo" }]
    );
    const dataPerdidas = tramos.reduce(
        (acc, tramo) => {
            acc[0][tramo.Linea] = tramo.perdidas;
            return acc;
        },
        [{ name: "Perdidas" }]
    );
    const dataCosto = tramos.reduce(
        (acc, tramo) => {
            acc[0][tramo.Linea] = tramo.costo;
            return acc;
        },
        [{ name: "Costo" }]
    );

    return (
        <div className="mx-6 my-10 rounded border">
            <div className="flex flex-row flex-wrap justify-between my-4">
                <h2 className="text-xl font-bold ml-8">Data Tramos</h2>
                <div className="flex flex-wrap items-center">
                    <div className="w-auto">
                        <DatePicker className="bg-transparent text-center border border-gray-800 rounded mx-3"
                            selected={startDate}
                            onSelect={(date) => setStartDate(date)}
                            dateFormat={"yyyy-MM-dd"} />
                    </div>
                    <div className="h-px w-3 bg-gray-300 mx-3"></div>
                    <div className="w-auto">
                        <DatePicker className="bg-transparent text-center border border-gray-800 rounded mx-3"
                            selected={endDate}
                            onSelect={(date) => setEndDate(date)}
                            dateFormat={"yyyy-MM-dd"} />
                    </div>

                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-center my-4">
                <div className="overflow-auto my-3">
                    <TableTramos tramos={tramos} />
                </div>

                <div className="flex flex-row flex-wrap justify-start">
                    <BarChartComponent data={dataConsumo} />
                    <BarChartComponent data={dataPerdidas} />
                    <BarChartComponent data={dataCosto} />
                </div>
            </div>
        </div>
    )
}

export default TramosList