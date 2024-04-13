import { Link } from 'react-router-dom'
import store from '../../store/empleadoStore';
import storeDep from '../../store/departamentoStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import useEmpleados from '../../hooks/useEmpleados';

const Add = () => {
    const { handleInputSueldo, handleChangeSueldo, handleInputEmpleado, handleInputDepartamento, handleSaveEmpleado } = useEmpleados();

    useEffect(() => {
        storeDep.listar();
    }, []);

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Agregar Empleado</h3>
            </div>
            <form onSubmit={handleSaveEmpleado}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' onChange={handleInputEmpleado} />
                </div>
                <div className="mb-3">
                    <label htmlFor='departamento' className="form-label">{'Departamento'}</label>
                    <select className="form-select" id="departamento" name="departamento" onChange={handleInputDepartamento}>
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
                        onChange={handleChangeSueldo}
                        onKeyUp={handleInputSueldo}
                        onKeyPress={handleInputSueldo}
                        value={store.empleado.sueldo} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm me-sm-3">Agregar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm">Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Add);