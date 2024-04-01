import { Link } from 'react-router-dom'
import { observer } from 'mobx-react';
import useDepartamentos from '../../hooks/useDepartamentos';

const Add = () => {
    const { handleSaveDepartamento, handleInputDepartamento } = useDepartamentos();

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Agregar Departamento</h3>
            </div>
            <form onSubmit={handleSaveDepartamento}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' onChange={handleInputDepartamento} />
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