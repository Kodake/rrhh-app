import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import store from '../store/empleadoStore';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Notifications from '../utils/Notifications';

const List = () => {
    useEffect(() => {
        store.listarPaginado(store.currentPage, store.pageSize);
    }, [store.currentPage, store.pageSize]);

    const handleDeleteConfirmation = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No se puede revertir este cambio',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            store.eliminar(id);
            Notifications('Eliminado', 'El registro ha sido eliminado satisfactoriamente.', 'success');
        }
    };

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

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
                    {store.empleados.map((empleado: any) => (
                        <tr key={empleado.idEmpleado}>
                            <th scope="row">{empleado.idEmpleado}</th>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.departamento}</td>
                            <td>
                                <NumericFormat
                                    value={empleado.sueldo}
                                    displayType={'text'}
                                    thousandSeparator=","
                                    prefix="$"
                                    decimalScale={2}
                                    fixedDecimalScale
                                />
                            </td>
                            <td className="text-center">
                                <Link to={`/editar/${empleado.idEmpleado}`} className="btn btn-warning btn-sm me-3">
                                    Editar
                                </Link>
                                <button onClick={() => handleDeleteConfirmation(empleado.idEmpleado)} className="btn btn-danger btn-sm">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${store.currentPage === 0 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(store.currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {[...Array(store.totalPages).keys()].map((page) => (
                        <li key={page} className={`page-item ${store.currentPage === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(page)}>
                                {page + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${store.currentPage === store.totalPages - 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(store.currentPage + 1)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default observer(List);
