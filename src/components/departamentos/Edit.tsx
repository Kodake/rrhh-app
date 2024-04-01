import { Link, useParams } from 'react-router-dom'
import store from '../../store/departamentoStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import useDepartamentos from '../../hooks/useDepartamentos';

const Edit = () => {
    const { handleSaveDepartamento, handleInputDepartamento } = useDepartamentos();

    const { id } = useParams();

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
            <form onSubmit={handleSaveDepartamento}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' onChange={handleInputDepartamento} value={store.departamento.nombre || ''} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm me-sm-3">Actualizar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm">Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Edit);