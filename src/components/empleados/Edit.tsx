import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import store from '../../store/empleadoStore';
import storeDep from '../../store/departamentoStore';
import useEmpleados from '../../hooks/useEmpleados';

const Edit = () => {
    const { handleInputSueldo, handleInputEmpleado, handleInputDepartamento, handleSaveEmpleado } = useEmpleados();

    const { id } = useParams();

    useEffect(() => {
        storeDep.listar();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            store.buscarPorId(parseInt(id));
        }
    }, []);

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Editar Empleado</h3>
            </div>
            <form onSubmit={handleSaveEmpleado}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' onChange={handleInputEmpleado} value={store.empleado.nombre || ''} />
                </div>
                <div className="mb-3">
                    <label htmlFor='departamento' className="form-label">{'Departamento'}</label>
                    <select className="form-select" id="departamento" name="departamento" onChange={handleInputDepartamento} value={store.empleado.departamento.idDepartamento} >
                        <option value={0}>Seleccione un departamento</option>
                        {storeDep.select.map((departamento) => (
                            <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                                {departamento.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='sueldo' className="form-label">{'Sueldo'}</label>
                    <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="sueldo"
                        name="sueldo"
                        autoComplete='off'
                        onChange={() => handleInputSueldo}
                        onKeyUp={() => handleInputSueldo}
                        onKeyPress={() => handleInputSueldo}
                        value={store.empleado.sueldo || 0} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm me-sm-3">Actualizar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm">Regresar</Link>
                </div>
            </form>
        </div>
    );
}

export default observer(Edit);
