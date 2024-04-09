export class Empleado {
    idEmpleado: number;
    nombre: string;
    departamento: Departamento;
    sueldo: Sueldo;

    constructor(idEmpleado: number, nombre: string, departamento: Departamento, sueldo: Sueldo) {
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


export class Sueldo {
    idSueldo: number;
    cantidad: number;

    constructor(idSueldo: number, cantidad: number) {
        this.idSueldo = idSueldo;
        this.cantidad = cantidad;
    }
}