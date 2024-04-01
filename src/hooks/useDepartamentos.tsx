import { useNavigate } from 'react-router-dom';
import useNotifications from '../utils/useNotifications';
import store from '../store/departamentoStore';

const useDepartamentos = () => {
    let nav = useNavigate();

    const handleInputDepartamento = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setDepartamento({ ...store.departamento, [name]: value });
    };

    const handleSaveDepartamento = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!store.validateDepartamento()) {
            return;
        }
        const departamento = await store.guardar();
        if (departamento === null) {
            return;
        }
        nav('/');
        useNotifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

    return {
        handleInputDepartamento,
        handleSaveDepartamento,
        handlePageChange
    }
}

export default useDepartamentos