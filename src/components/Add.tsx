import { Link } from 'react-router-dom'
import store from '../store/empleadoStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

const Add = () => {
    let nav = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setEmpleado({ ...store.empleado, [name]: value });
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const empleado = await store.guardar();
        if (empleado === null) {
            return;
        }
        nav('/');
    };

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Agregar Empleado</h3>
            </div>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor='Nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" required onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor='Departamento' className="form-label">{'Departamento'}</label>
                    <input type="text" className="form-control" id="departamento" name="departamento" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor='Sueldo' className="form-label">{'Sueldo'}</label>
                    <input type="number" step="any" className="form-control" id="sueldo" name="sueldo" onChange={handleInputChange} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm">Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Add);