import { unlinkSync } from "fs";
import { Add } from "./add";
const chalk = require('chalk');

/**
 * Clase modify, su funcion es modificar la nota de un correspondiente autor
 */
export class Modify {
    private rutaFichero: string = "";
    
    /**
     * Constructor de la clase
     * @param autor 
     * @param titulo 
     * @param cuerpo 
     * @param color 
     */
    constructor(autor: string, titulo: string, cuerpo: string, color: string){
        this.rutaFichero = `./src/datos/${autor}/${titulo}.json`;
        if (this.existeNota(titulo) == 0) {  
            new Add(autor, titulo, cuerpo, color);
        }
    }

    /**
     * Funcion que se serciora si la nota existe o no
     * @param titulo 
     * @returns  1-> si se modifica 0 -> si no existe
     */
    existeNota(titulo: string){
        try{
            unlinkSync(this.rutaFichero);
            console.log(chalk.green(`Modificando la nota con el titulo: ${titulo}`));
            return 0;
        }
        catch(err){
            console.log(chalk.red(`Error 402, no existe la nota titulada "${titulo}"`));
            return 1;
        }
    }
}