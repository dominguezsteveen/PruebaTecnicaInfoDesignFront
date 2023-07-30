import PropTypes from 'prop-types';

function TableTramoCliente({ data }) {
    return (
        <div className="rounded-md border w-fit">
            {data.length == 0 ?
                (<p>No data founded</p>)
                :
                (<table className="table-auto text-center">
                    <thead>
                        <tr>
                            <th className="px-5 py-2">Fecha</th>
                            <th className="px-5 py-2">Perdidas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dato, index) => (
                            <tr key={index}>
                                <td className="px-3 py-2">{dato.Fecha}</td>
                                <td className="px-3 py-2">{dato.Perdidas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>)
            }
        </div>
    )
}

TableTramoCliente.propTypes = {
    data: PropTypes.array.isRequired,
};

export default TableTramoCliente;