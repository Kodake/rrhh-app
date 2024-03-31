import { makeAutoObservable, observable, runInAction } from "mobx";
import { Departamento } from "../classes/appClasses";
import axios from "axios";
import.meta.env.VITE_API_URL;

class DepartamentoStore {
    totalPages = 0;
    currentPage = 0;
    pageSize = 2;
    departamento: Departamento = {
        idDepartamento: 0,
        nombre: '',
    }
    departamentos: Departamento[] = [];
    select: Departamento[] = [];
    consultarApi: boolean = false;
    isValid: boolean = false;
    isLoading: boolean = false;
    focusInput: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            departamento: observable,
            consultarApi: observable,
            isLoading: observable,
            focusInput: observable
        });
    }

    departamentoInicial: Departamento = {
        idDepartamento: 0,
        nombre: '',
    };

    limpiar = () => {
        this.setDepartamento(this.departamentoInicial);
    };

    setDepartamento(departamento: Departamento) {
        this.departamento = departamento;
    }

    setDepartamentos(departamentos: Departamento[]) {
        this.departamentos = departamentos;
    }

    setSelect(select: Departamento[]) {
        this.select = select;
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
        const url = `${import.meta.env.VITE_API_URL}/departamentos2`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setSelect(data);

            runInAction(() => {
                this.setSelect(data);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async listarPaginado(page: number, pageSize: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/departamentos?page=${page}&pageSize=${pageSize}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setDepartamentos(data.content);
            this.setTotalPages(data.totalPages);

            runInAction(() => {
                this.setDepartamentos(data.content);
                this.setTotalPages(data.totalPages);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async buscarPorId(id: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/departamentos/${id}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setDepartamento(data);

            runInAction(() => {
                this.setDepartamento(data);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async guardar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/departamentos`;

        try {
            await axios.post(url, this.departamento);

            this.limpiar();
            await this.listarPaginado(this.currentPage, this.pageSize);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async actualizar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/departamentos/${this.departamento.idDepartamento}`;

        try {
            await axios.put(url, this.departamento);

            this.limpiar();
            await this.listarPaginado(this.currentPage, this.pageSize);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const departamentoStore = new DepartamentoStore();
export default departamentoStore;