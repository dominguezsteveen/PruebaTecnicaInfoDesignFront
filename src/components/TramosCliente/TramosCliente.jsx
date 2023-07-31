import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import LineChartComponent from "../shared/LineChartComponent";

function TramosCliente() {
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState(new Date("2010-01-02"));
    const [endDate, setEndDate] = useState(new Date("2010-01-31"));

    const [tramoFilter, setTramoFilter] = useState("Tramo 1");
    const [objetivo, setObjetivo] = useState("Perdidas");
    const [clienteFilter, setClienteFilter] = useState("Residencial");


    const getData = async (starDate, endDate, objetivo) => {
        let endpoint = "http://192.168.20.27:4000/tramos-cliente";
        if (objetivo == "Consumo") {
            endpoint = "http://192.168.20.27:4000/tramos-cliente-consumo";
        }
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
        getData(startDate, endDate, objetivo);
    }, [startDate, endDate, objetivo]);

    const dataFiltered = data.filter((data) => data.TipoConsumo == clienteFilter && data.Linea == tramoFilter);

    const dataFormatted = dataFiltered.map((item) => {
        const originalDate = new Date(item.Fecha);
        const formattedDate = `${originalDate.getFullYear()}-${String(originalDate.getMonth() + 1).padStart(2, '0')}-${String(originalDate.getDate()).padStart(2, '0')}`;
        return { ...item, Fecha: formattedDate };
    });
    return (
        <div className="mx-6 my-10 rounded border">
            <div className="flex flex-row flex-wrap justify-between my-4">
                <div className="flex flex-row overflow-auto text-xl font-bold ml-8">
                    <h2>Data </h2>
                    <select className="bg-transparent appearance-none ml-2 underline cursor-pointer leading-tight focus:outline-none focus:bg-transparent" name="objetivo" id="objetivo" onChange={(value) => setObjetivo(value.target.value)}>
                        <option className="text-black" value="Perdidas" >Perdidas</option>
                        <option className="text-black" value="Consumo" >Consumo</option>
                    </select>
                    <select className="bg-transparent appearance-none ml-2 underline cursor-pointer leading-tight focus:outline-none focus:bg-transparent" name="tramo" id="tramo" onChange={(value) => setTramoFilter(value.target.value)}>
                        <option className="text-black" value="Tramo 1" >Tramo 1</option>
                        <option className="text-black" value="Tramo 2" >Tramo 2</option>
                        <option className="text-black" value="Tramo 3" >Tramo 3</option>
                        <option className="text-black" value="Tramo 4" >Tramo 4</option>
                        <option className="text-black" value="Tramo 5" >Tramo 5</option>
                    </select>
                    <select className="bg-transparent appearance-none ml-2 underline cursor-pointer leading-tight focus:outline-none focus:bg-transparent" name="filtro" id="filtro" onChange={(value) => setClienteFilter(value.target.value)}>
                        <option className="text-black" value="Residencial" >Residencial</option>
                        <option className="text-black" value="Comercial" >Comercial</option>
                        <option className="text-black" value="Industrial" >Industrial</option>
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
                <div className="flex flex-row flex-wrap justify-start overflow-auto">
                    <LineChartComponent data={dataFormatted} objetivo={objetivo} />
                </div>
            </div>
        </div>
    )
}

export default TramosCliente