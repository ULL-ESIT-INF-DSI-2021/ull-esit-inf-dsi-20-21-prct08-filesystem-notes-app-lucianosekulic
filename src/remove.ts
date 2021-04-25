//import { unlinkSync } from "fs";
const chalk = require('chalk');


/**
 * Clase remove, su funcion es eliminar una nota
 */
export class Remove {
    public rutaFichero: string = "";

    /**
     * Constructor de la clase
     * @param autor 
     * @param titulo 
     */
    constructor(autor: string, titulo: string) {
        this.rutaFichero = `./src/datos/${autor}/${titulo}.json`;
        this.existeNota(titulo);
    }

    /**
     * Funcion que comprueba la existencia del titulo o no
     * @param titulo 
     * @returns 0-> si se elimina la nota correctamente, 1-> si no hay nota con ese titulo
     */
    existeNota(titulo: string){
        try{
            //unlinkSync(this.rutaFichero);
            console.log(chalk.green(`Eliminando nota titulada: ${titulo}`));
            return 0;
        }
        catch(err){
            console.log(chalk.red(`Error 403, la nota titulada ${titulo} no existe`));
            return 1;
        }
    }
}