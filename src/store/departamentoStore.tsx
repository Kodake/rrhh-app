import { makeAutoObservable, observable, runInAction } from 'mobx';
import { DepartamentoDTO } from '../classes/appClasses';
import axios from 'axios';
import * as yup from 'yup';
import { VALIDATION_STRINGS } from '../messages/appMessages';
import useNotifications from '../utils/useNotifications';
import { renderToString } from 'react-dom/server';

import.meta.env.VITE_API_URL;

class DepartamentoStore {
    totalPages = 0;
    pageNumber = 0;
    pageSize = 5;
    departamento: DepartamentoDTO = {
        idDepartamento: 0,
        nombre: '',
    }
    departamentos: DepartamentoDTO[] = [];
    select: DepartamentoDTO[] = [];
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

    departamentoInicial: DepartamentoDTO = {
        idDepartamento: 0,
        nombre: '',
    };

    limpiar = () => {
        this.setDepartamento(this.departamentoInicial);
    };

    setDepartamento(departamento: DepartamentoDTO) {
        this.departamento = departamento;
    }

    setDepartamentos(departamentos: DepartamentoDTO[]) {
        this.departamentos = departamentos;
    }

    setSelect(select: DepartamentoDTO[]) {
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

    setCurrentPage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    validationSchema = yup.object().shape({
        nombre: yup.string()
            .required(VALIDATION_STRINGS.nombreRequired)
            .min(2, VALIDATION_STRINGS.nombreMinLength)
            .max(50, VALIDATION_STRINGS.nombreMaxLength),
    });

    validateDepartamento() {
        try {
            this.validationSchema.validateSync(this.departamento, { abortEarly: false });
            return true;
        } catch (error) {
            runInAction(() => {
                const validationError = error as yup.ValidationError;
                const errorMessages = validationError.inner.map((e) => (
                    <li key={e.path} className='border-0 text-start'>{e.message}</li>
                ));
                const errorMessage = renderToString(<ul>{errorMessages}</ul>);
                useNotifications(VALIDATION_STRINGS.validationError, errorMessage, 'error');
            });
            return false;
        }
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

    async listarPaginado(pageNumber: number, pageSize: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/departamentos?pageNumber=${pageNumber}&pageSize=${pageSize}`;

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
            await this.listarPaginado(this.pageNumber, this.pageSize);
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
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const departamentoStore = new DepartamentoStore();
export default departamentoStore;