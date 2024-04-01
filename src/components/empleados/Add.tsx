import { Link } from 'react-router-dom'
import store from '../../store/empleadoStore';
import storeDep from '../../store/departamentoStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Notifications from '../../utils/Notifications';
import { useEffect } from 'react';

const Add = () => {
    let nav = useNavigate();

    useEffect(() => {
        storeDep.listar();
    }, []);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const empleado = await store.guardar();
        if (empleado === null) {
            return;
        }
        nav('/');
        Notifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Agregar Empleado</h3>
            </div>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' required onChange={(e) => store.setEmpleado({ ...store.empleado, [e.target.name]: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor='departamento' className="form-label">{'Departamento'}</label>
                    <select className="form-select" id="departamento" name="departamento" required onChange={(e) => store.setDepartamento(parseInt(e.target.value))}>
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
                    <input type="number" step="any" className="form-control" id="sueldo" name="sueldo" autoComplete='off' onChange={(e) => store.setEmpleado({ ...store.empleado, [e.target.name]: e.target.value })} />
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