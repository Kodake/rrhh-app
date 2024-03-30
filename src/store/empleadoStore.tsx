import { makeAutoObservable, observable, runInAction } from "mobx";
import { Empleado } from "../classes/appClasses";
import axios from "axios";
import.meta.env.VITE_API_URL;

class EmpleadoStore {
    empleado: Empleado = {
        idEmpleado: 0,
        nombre: '',
        departamento: undefined,
        sueldo: undefined
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

    setEmpleado(empleado: Empleado) {
        this.empleado = empleado;
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

    async guardar(): Promise<Empleado> {
        const url = `${import.meta.env.VITE_API_URL}/empleados`;

        try {
            const response = await axios.post(url, this.empleado);
            const nuevoEmpleado = response.data;

            runInAction(() => {
                this.listar();
            });

            return nuevoEmpleado;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async actualizar(): Promise<Empleado> {
        const url = `${import.meta.env.VITE_API_URL}/empleados/${this.empleado.idEmpleado}`;

        try {
            const response = await axios.put(url, this.empleado);
            const empleadoActualizado = response.data;

            runInAction(() => {
                this.listar();
            });

            return empleadoActualizado;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async eliminar(id: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/empleados/${id}`;

        await axios.delete(url).then(() => {

            runInAction(() => {
                this.listar();
            });
        }).catch((error) => {
            console.error(error);
        });
    }
}

const empleadoStore = new EmpleadoStore();
export default empleadoStore;