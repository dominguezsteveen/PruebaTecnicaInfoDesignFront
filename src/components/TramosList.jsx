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
            <div>TramosList</div>
            {tramos.length == 0 ?
                (<p>No data founded</p>)
                :
                (<table className="table-auto">
                    <thead>
                        <tr>
                            <th>Línea</th>
                            <th>Consumo</th>
                            <th>Perdidas</th>
                            <th>Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tramos.map((tramo, index) => (
                            <tr key={index}>
                                <td>{tramo.Linea}</td>
                                <td>{tramo.consumo}</td>
                                <td>{tramo.perdidas}</td>
                                <td>{tramo.costo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>)
            }
        </div>
    )
}

export default TramosList