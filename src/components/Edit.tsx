import { Link, useParams } from 'react-router-dom'
import store from '../store/empleadoStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const Edit = () => {
    let nav = useNavigate();

    const { id } = useParams();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setEmpleado({ ...store.empleado, [name]: value.trim() });
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const empleado = await store.actualizar();
        if (empleado === null) {
            return;
        }
        nav('/');
    };

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
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor='Nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" required onChange={handleInputChange} value={store.empleado.nombre || ''} />
                </div>
                <div className="mb-3">
                    <label htmlFor='Departamento' className="form-label">{'Departamento'}</label>
                    <input type="text" className="form-control" id="departamento" name="departamento" onChange={handleInputChange} value={store.empleado.departamento || ''} />
                </div>
                <div className="mb-3">
                    <label htmlFor='Sueldo' className="form-label">{'Sueldo'}</label>
                    <input type="number" step="any" className="form-control" id="sueldo" name="sueldo" onChange={handleInputChange} value={store.empleado.sueldo || ''} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-sm me-3">Actualizar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm">Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Edit);