import { useEffect } from "react";
import { useState } from "react"

function TramosList() {

    const [tramos, setTramos] = useState(null);

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
        <>
            <div>TramosList</div>
            <div>
                {JSON.stringify(tramos)}
            </div>
        </>
    )
}

export default TramosList