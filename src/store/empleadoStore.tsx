import { makeAutoObservable, observable, runInAction } from 'mobx';
import { Empleado } from '../classes/appClasses';
import axios from 'axios';
import * as yup from 'yup';
import { VALIDATION_STRINGS } from '../messages/appMessages';
import Notifications from '../utils/useNotifications';
import { renderToString } from 'react-dom/server';

import.meta.env.VITE_API_URL;

class EmpleadoStore {
    totalPages = 0;
    currentPage = 0;
    pageSize = 0;
    empleado: Empleado = {
        idEmpleado: 0,
        nombre: '',
        departamento: { idDepartamento: 0, nombre: '' },
        sueldo: 0
    }
    empleados: Empleado[] = [];
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            empleado: observable,
            isLoading: observable,
        });
    }

    empleadoInicial: Empleado = {
        idEmpleado: 0,
        nombre: '',
        departamento: { idDepartamento: 0, nombre: '' },
        sueldo: 0
    };

    limpiar = () => {
        this.setEmpleado(this.empleadoInicial);
    };

    setEmpleado(empleado: Empleado) {
        this.empleado = empleado;
    }

    setDepartamento(idDepartamento: number) {
        this.empleado.departamento.idDepartamento = idDepartamento;
        this.empleado.departamento.nombre = this.empleado.departamento.nombre;
    }

    setEmpleados(empleados: Empleado[]) {
        this.empleados = empleados;
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    setTotalPages(totalPages: number) {
        this.totalPages = totalPages;
    }

    setCurrentPage(currentPage: number) {
        this.currentPage = currentPage;
    }

    validationSchema = yup.object().shape({
        nombre: yup.string()
            .required(VALIDATION_STRINGS.nombreRequired)
            .min(2, VALIDATION_STRINGS.nombreMinLength)
            .max(50, VALIDATION_STRINGS.nombreMaxLength),
        departamento: yup.object().shape({
            idDepartamento: yup.number().moreThan(0, VALIDATION_STRINGS.departamentoChoose),
        }),
        sueldo: yup.number()
            .required(VALIDATION_STRINGS.sueldoRequired)
            .moreThan(0, VALIDATION_STRINGS.sueldoMinLength)
    });

    validateEmpleado() {
        try {
            this.validationSchema.validateSync(this.empleado, { abortEarly: false });
            return true;
        } catch (error) {
            runInAction(() => {
                const validationError = error as yup.ValidationError;
                const errorMessages = validationError.inner.map((e) => (
                    <li key={e.path} className='border-0 text-start'>{e.message}</li>
                ));
                const errorMessage = renderToString(<ul>{errorMessages}</ul>);
                Notifications(VALIDATION_STRINGS.validationError, errorMessage, 'error');
            });
            return false;
        }
    }

    async listar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/empleados`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setEmpleados(data);

            runInAction(() => {
                this.setEmpleados(data);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async listarPaginado(page: number, pageSize: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/empleados?page=${page}&pageSize=${pageSize}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setEmpleados(data.content);
            this.setTotalPages(data.totalPages);

            runInAction(() => {
                this.setEmpleados(data.content);
                this.setTotalPages(data.totalPages);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async buscarPorId(id: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/empleados/${id}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setEmpleado(data);

            runInAction(() => {
                this.setEmpleado(data);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async guardar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/empleados`;

        try {
            await axios.post(url, this.empleado);

            this.limpiar();
            await this.listarPaginado(this.currentPage, this.pageSize);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async actualizar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/empleados/${this.empleado.idEmpleado}`;

        try {
            await axios.put(url, this.empleado);

            this.limpiar();
            await this.listarPaginado(this.currentPage, this.pageSize);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async eliminar(id: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/empleados/${id}`;

        try {
            await axios.delete(url);

            await this.listarPaginado(this.currentPage, this.pageSize);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const empleadoStore = new EmpleadoStore();
export default empleadoStore;