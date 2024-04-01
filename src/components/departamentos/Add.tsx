import { Link } from 'react-router-dom'
import store from '../../store/departamentoStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Notifications from '../../utils/Notifications';

const Add = () => {
    let nav = useNavigate();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const departamento = await store.guardar();
        if (departamento === null) {
            return;
        }
        nav('/');
        Notifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Agregar Departamento</h3>
            </div>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' required onChange={(e) => store.setDepartamento({ ...store.departamento, [e.target.name]: e.target.value })} />
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