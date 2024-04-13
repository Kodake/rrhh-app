export class EmpleadoDTO {
    idEmpleado: number;
    nombre: string;
    departamento: number;
    sueldo: number;

    constructor(idEmpleado: number, nombre: string, departamento: number, sueldo: number) {
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.departamento = departamento;
        this.sueldo = sueldo;
    }
}

export class GetEmpleadoDTO {
    idEmpleado: number;
    nombre: string;
    departamento: string;
    sueldo: number;

    constructor(idEmpleado: number, nombre: string, departamento: string, sueldo: number) {
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.departamento = departamento;
        this.sueldo = sueldo;
    }
}

export class DepartamentoDTO {
    idDepartamento: number;
    nombre: string;

    constructor(idDepartamento: number, nombre: string) {
        this.idDepartamento = idDepartamento;
        this.nombre = nombre;
    }
}