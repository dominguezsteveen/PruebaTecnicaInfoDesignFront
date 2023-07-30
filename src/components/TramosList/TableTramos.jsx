import PropTypes from 'prop-types';

function TableTramos({ tramos }) {
    return (
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
    )
}

TableTramos.propTypes = {
    tramos: PropTypes.array.isRequired,
}

export default TableTramos