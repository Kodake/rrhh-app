export class Empleado {
    idEmpleado: number;
    nombre: string;
    departamento?: string;
    sueldo?: number;

    constructor(idEmpleado: number, nombre: string, departamento: string, sueldo: number) {
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.departamento = departamento;
        this.sueldo = sueldo;
    }
}