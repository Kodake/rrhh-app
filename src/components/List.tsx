import { observer } from "mobx-react";
import store from "../store/empleadoStore";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const List = () => {
    useEffect(() => {
        store.listar();
    }, []);

    const handleDelete = async (id: number) => {
        store.eliminar(id);
    }

    return (
        <div className="container">
            <table className="table table-hover table-striped table-bordered align-middle">
                <thead className="table-dark text-center">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Sueldo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {store.empleados.map((empleado) => (
                        <tr key={empleado.idEmpleado}>
                            <th scope="row">{empleado.idEmpleado}</th>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.departamento}</td>
                            <td>
                                <NumericFormat
                                    value={empleado.sueldo}
                                    displayType={'text'}
                                    thousandSeparator=','
                                    prefix={'$'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                />
                            </td>
                            <td className="text-center">
                                <Link to={`/editar/${empleado.idEmpleado}`} className="btn btn-warning btn-sm me-3">Editar</Link>
                                <button onClick={() => handleDelete(empleado.idEmpleado)} className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default observer(List);