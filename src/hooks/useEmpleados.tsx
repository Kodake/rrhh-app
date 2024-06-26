import { useNavigate } from 'react-router-dom';
import useNotifications from '../utils/useNotifications';
import store from '../store/empleadoStore';
import Swal from 'sweetalert2';

const useEmpleados = () => {
    let nav = useNavigate();

    const handleInputSueldo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        const parsedValue = parseFloat(value);

        if (!isNaN(parsedValue)) {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                store.setEmpleado({ ...store.empleado, sueldo: 0 });
            } else {
                store.setEmpleado({ ...store.empleado, sueldo: parsedValue });
            }
        }
    };

    const handleChangeSueldo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.currentTarget;
        const parsedValue = parseFloat(value);

        if (!isNaN(parsedValue)) {
            store.setEmpleado({ ...store.empleado, sueldo: parsedValue });
        }
    };

    const handleInputEmpleado = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setEmpleado({ ...store.empleado, [name]: value });
    };

    const handleInputDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        store.setEmpleado({ ...store.empleado, [name]: value });
    };

    const handleSaveEmpleado = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!store.validateEmpleado()) {
            return;
        }
        const empleado = await store.guardar();
        if (empleado === null) {
            return;
        }
        nav('/');
        useNotifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    const handleDeleteConfirmation = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No se puede revertir este cambio',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            store.eliminar(id);
            store.setCurrentPage(0);
            useNotifications('Eliminado', 'El registro ha sido eliminado satisfactoriamente.', 'success');
        }
    };

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

    return {
        handleInputSueldo,
        handleChangeSueldo,
        handleInputEmpleado,
        handleInputDepartamento,
        handleSaveEmpleado,
        handleDeleteConfirmation,
        handlePageChange
    }
}

export default useEmpleados