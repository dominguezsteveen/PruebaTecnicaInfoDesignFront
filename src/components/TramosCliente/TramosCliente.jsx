import { useState } from "react"
import DatePicker from "react-datepicker";
import TableTramoCliente from './TableTramoCliente'

function TramosCliente() {
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState(new Date("2010-01-02"));
    const [endDate, setEndDate] = useState(new Date("2010-01-31"));

    const [tramoFilter, setTramoFilter] = useState("Tramo 1");
    const [clienteFilter, setClienteFilter] = useState("residencial");

    return (
        <div className="mx-6 my-10 rounded border">
            <div className="flex flex-row flex-wrap justify-between my-4">
                <div className="flex flex-row overflow-auto text-xl font-bold ml-8">
                    <h2>Data</h2>
                    <select className="bg-transparent appearance-none ml-2 leading-tight focus:outline-none focus:bg-transparent" name="tramo" id="tramo" onChange={(value) => setTramoFilter(value.target.value)}>
                        <option className="text-black" value="Tramo 1" >Tramo 1</option>
                        <option className="text-black" value="Tramo 2" >Tramo 2</option>
                        <option className="text-black" value="Tramo 3" >Tramo 3</option>
                        <option className="text-black" value="Tramo 4" >Tramo 4</option>
                        <option className="text-black" value="Tramo 5" >Tramo 5</option>
                    </select>
                    <select className="bg-transparent appearance-none ml-2 leading-tight focus:outline-none focus:bg-transparent" name="filtro" id="filtro" onChange={(value) => setClienteFilter(value.target.value)}>
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
                    <TableTramoCliente data={data} />
                </div>

                <div className="flex flex-row flex-wrap justify-start">
                    {/* <BarChartComponent data={dataConsumo} />
                    <BarChartComponent data={dataPerdidas} />
                    <BarChartComponent data={dataCosto} /> */}
                </div>
            </div>
        </div>
    )
}

export default TramosCliente