import { useEffect, useState } from "react";
import TableTramos from "./TableTramos";
import BarChartComponent from "./BarChartComponent";

function TramosList() {
    const [tramos, setTramos] = useState([]);

    const getTramos = async () => {
        const endpoint = "http://localhost:4000/tramos";
        const requestData = {
            fechainicial: "2010-01-01",
            fechafinal: "2010-01-30"
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
        getTramos();
    }, []);

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
            <div className="flex flex-row flex-wrap justify-between">
                <h2 className="text-xl font-bold ml-8 my-5">Tramos</h2>
                <div className="text-xl font-bold mr-10 my-5">Datapicker</div>
            </div>
            <div className="flex flex-row flex-wrap justify-center">
                <div>
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