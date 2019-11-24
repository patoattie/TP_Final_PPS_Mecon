export class Usuario {
    nombre:string;
    apellido:string;
    dni: string;
    perfil: string;
    foto: string;
    baja:boolean;
    motivo:string;
    id:any;
    spin:boolean;
    email:any;
    clave:string;

}


/*Alta de dueño / supervisor
● Se cargarán: nombre, apellido, DNI, CUIL, foto y perfil.
● La foto se tomará del celular.
● Brindar la posibilidad de contar con un lector de código QR para el DNI, que cargará la información
disponible (sólo aplicable a aquellos documentos que lo posean).
● Esta acción la podrá realizar el supervisor o el dueño.
B- Alta de empleados
● Se cargarán: nombre, apellido, DNI, CUIL, foto y tipo de empleado.
● La foto se tomará del celular. La foto puede ser tomada luego de realizar el alta.
● Brindar la posibilidad de contar con un lector de código QR para el DNI, que cargará la información
disponible (sólo aplicable a aquellos documentos que lo posean).
● Esta acción la podrá realizar el supervisor o el dueño*/