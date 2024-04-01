import { makeAutoObservable, observable, runInAction } from "mobx";
import { Empleado } from "../classes/appClasses";
import axios from "axios";
import.meta.env.VITE_API_URL;

class EmpleadoStore {
    totalPages = 0;
    currentPage = 0;
    pageSize = 0;
    empleado: Empleado = {
        idEmpleado: 0,
        nombre: '',
        departamento: {idDepartamento: 0, nombre: ''},
        sueldo: 0
    }
    empleados: Empleado[] = [];
    consultarApi: boolean = false;
    isValid: boolean = false;
    isLoading: boolean = false;
    focusInput: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            empleado: observable,
            consultarApi: observable,
            isLoading: observable,
            focusInput: observable
        });
    }

    empleadoInicial: Empleado = {
        idEmpleado: 0,
        nombre: '',
        departamento: {idDepartamento: 0, nombre: ''},
        sueldo: 0
    };

    limpiar = () => {
        this.setEmpleado(this.empleadoInicial);
    };

    setEmpleado(empleado: Empleado) {
        this.empleado = empleado;
    }

    setDepartamento(idDepartamento: number) {
        this.empleado.departamento.nombre = this.empleado.departamento.nombre;
        this.empleado.departamento.idDepartamento = idDepartamento;
    }

    setEmpleados(empleados: Empleado[]) {
        this.empleados = empleados;
    }

    setIsValid(isValid: boolean) {
        this.isValid = isValid;
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    setFocusInput(focusInput: boolean) {
        this.focusInput = focusInput;
    }

    setTotalPages(totalPages: number) {
        this.totalPages = totalPages;
    }

    setCurrentPage(currentPage: number) {
        this.currentPage = currentPage;
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