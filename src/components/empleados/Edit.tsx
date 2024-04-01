import { Link, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import store from '../../store/empleadoStore';
import Notifications from '../../utils/Notifications';
import storeDep from '../../store/departamentoStore';

const Edit = () => {
    let nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        storeDep.listar();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            store.buscarPorId(parseInt(id));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const trimmedValue = value;

        const newValue = name === "sueldo" && trimmedValue === "" ? "0" : trimmedValue;

        store.setEmpleado({ ...store.empleado, [name]: newValue });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const idDepartamento = JSON.parse(value);
        const departamento = { idDepartamento, string: '' };
        store.setEmpleado({ ...store.empleado, [name]: departamento });
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const empleado = await store.actualizar();
        if (empleado === null) {
            return;
        }
        nav('/');
        Notifications('Actualizado', 'El registro ha sido actualizado satisfactoriamente.', 'success');
    };

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Editar Empleado</h3>
            </div>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' required onChange={handleInputChange} value={store.empleado.nombre || ''} />
                </div>
                <div className="mb-3">
                    <label htmlFor='departamento' className="form-label">{'Departamento'}</label>
                    <select className="form-select" id="departamento" name="departamento" required onChange={handleSelectChange} value={JSON.stringify(store.empleado.departamento.idDepartamento)} >
                        <option value={JSON.stringify({ idDepartamento: 0, nombre: "" })}>Seleccione un departamento</option>
                        {storeDep.select.map((departamento) => (
                            <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                                {departamento.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='sueldo' className="form-label">{'Sueldo'}</label>
                    <input type="number" step="any" className="form-control" id="sueldo" name="sueldo" autoComplete='off' onChange={handleInputChange} value={store.empleado.sueldo || 0} />
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
