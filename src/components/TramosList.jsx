import { useEffect } from "react";
import { useState } from "react"

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

        } catch (error) {
            console.error('Error fetching data:', error);
            setTramos(null);
        }
    };

    useEffect(() => {
        getTramos();
    }, []);

    return (
        <div>
            <div className="text-lg font-bold">TramosList</div>
            <div className="rounded-md border w-fit">
                {tramos.length == 0 ?
                    (<p>No data founded</p>)
                    :
                    (<table className="table-auto text-center">
                        <thead>
                            <tr>
                                <th className="px-5 py-2">Línea</th>
                                <th className="px-5 py-2">Consumo</th>
                                <th className="px-5 py-2">Perdidas</th>
                                <th className="px-5 py-2">Costo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tramos.map((tramo, index) => (
                                <tr key={index}>
                                    <td className="px-3 py-2">{tramo.Linea}</td>
                                    <td className="px-3 py-2">{tramo.consumo}</td>
                                    <td className="px-3 py-2">{tramo.perdidas}</td>
                                    <td className="px-3 py-2">{tramo.costo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>)
                }
            </div>
        </div>
    )
}

export default TramosList