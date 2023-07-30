import PropTypes from 'prop-types';

function TableClientes({ data, filtro }) {
    return (
        <div className="rounded-md border w-fit">
            {data.length == 0 ?
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
                        {data.map((dato, index) => (
                            <tr key={index}>
                                <td className="px-3 py-2">{dato.Linea}</td>
                                {filtro == "residencial" ? <td className="px-3 py-2">{dato.consumo_residencial}</td> : filtro == "comercial" ? <td className="px-3 py-2">{dato.consumo_comercial}</td> : <td className="px-3 py-2">{dato.consumo_industrial}</td>}
                                {filtro == "residencial" ? <td className="px-3 py-2">{dato.perdidas_residencial}</td> : filtro == "comercial" ? <td className="px-3 py-2">{dato.perdidas_comercial}</td> : <td className="px-3 py-2">{dato.perdidas_industrial}</td>}
                                {filtro == "residencial" ? <td className="px-3 py-2">{dato.costo_residencial}</td> : filtro == "comercial" ? <td className="px-3 py-2">{dato.costo_comercial}</td> : <td className="px-3 py-2">{dato.costo_industrial}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>)
            }
        </div>
    )
}

TableClientes.propTypes = {
    data: PropTypes.array.isRequired,
    filtro: PropTypes.string.isRequired,
};

export default TableClientes;