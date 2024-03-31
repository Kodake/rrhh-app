import { Link, useParams } from 'react-router-dom'
import store from '../../store/departamentoStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import Notifications from '../../utils/Notifications';

const Edit = () => {
    let nav = useNavigate();

    const { id } = useParams();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        store.setDepartamento({ ...store.departamento, [name]: value });
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

    useEffect(() => {
        if (id !== undefined) {
            store.buscarPorId(parseInt(id));
        }
    }, []);

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Editar Departamento</h3>
            </div>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' required onChange={handleInputChange} value={store.departamento.nombre || ''} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm me-3">Actualizar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm">Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Edit);