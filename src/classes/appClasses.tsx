export class Empleado {
    idEmpleado: number;
    nombre: string;
    departamento: Departamento;
    sueldo: number;

    constructor(idEmpleado: number, nombre: string, departamento: Departamento, sueldo: number) {
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.departamento = departamento;
        this.sueldo = sueldo;
    }
}

export class Departamento {
    idDepartamento: number;
    nombre: string;

    constructor(idDepartamento: number, nombre: string) {
        this.idDepartamento = idDepartamento;
        this.nombre = nombre;
    }
}