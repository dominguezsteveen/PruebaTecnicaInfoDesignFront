import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableClientes from './TableClientes';
import { format } from 'date-fns'
import BarChartComponent from "../shared/BarChartComponent";

function ClienteList() {
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState(new Date("2010-01-02"));
    const [endDate, setEndDate] = useState(new Date("2010-01-31"));

    const [filtro, setFiltro] = useState("residencial");


    const getData = async (starDate, endDate) => {
        const endpoint = "http://192.168.20.27:4000/cliente";
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
            setData(responseData);
            return responseData;
        } catch (error) {
            console.error('Error fetching data:', error);
            setData(null);
            return null;
        }
    };

    useEffect(() => {
        getData(startDate, endDate);
    }, [startDate, endDate]);


    const dataConsumo = data.reduce(
        (acc, dato) => {
            if (filtro == "residencial") {
                acc[0][dato.Linea] = dato.consumo_residencial;
            } else if (filtro == "comercial") {
                acc[0][dato.Linea] = dato.consumo_comercial;
            } else if (filtro == "industrial") {
                acc[0][dato.Linea] = dato.consumo_industrial;
            }
            return acc;
        },
        [{ name: "Consumo" }]
    );

    const dataPerdidas = data.reduce(
        (acc, dato) => {
            if (filtro == "residencial") {
                acc[0][dato.Linea] = dato.perdidas_residencial;
            } else if (filtro == "comercial") {
                acc[0][dato.Linea] = dato.perdidas_comercial;
            } else if (filtro == "industrial") {
                acc[0][dato.Linea] = dato.perdidas_industrial;
            }
            return acc;
        },
        [{ name: "Perdidas" }]
    );

    const dataCosto = data.reduce(
        (acc, dato) => {
            if (filtro == "residencial") {
                acc[0][dato.Linea] = dato.costo_residencial;
            } else if (filtro == "comercial") {
                acc[0][dato.Linea] = dato.costo_comercial;
            } else if (filtro == "industrial") {
                acc[0][dato.Linea] = dato.costo_industrial;
            }
            return acc;
        },
        [{ name: "Consumo" }]
    );

    return (
        <div className="mx-6 my-10 rounded border">
            <div className="flex flex-row flex-wrap justify-between my-4">
                <div className="flex flex-row overflow-auto text-xl font-bold ml-8">
                    <h2>Data Cliente</h2>
                    <select className="bg-transparent appearance-none ml-2 leading-tight focus:outline-none focus:bg-transparent" name="filtro" id="filtro" onChange={(value) => setFiltro(value.target.value)}>
                        <option className="text-black" value="residencial" >Residencial</option>
                        <option className="text-black" value="comercial" >Comercial</option>
                        <option className="text-black" value="industrial" >Industrial</option>
                    </select>
                </div>
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
                    <TableClientes data={data} filtro={filtro} />
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

export default ClienteList