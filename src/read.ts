import { readFileSync } from "fs";
import { openSync } from "fs";
const chalk = require('chalk');

/**
 * clase read, su funcion es leer una nota en especifico 
 */
export class Read {
    private rutaFichero: string = "";
    private nota: string = "";
    private cuerpo: string = "";
    private titulo: string = "";

    /**
     * Constructor de la clase
     * @param autor 
     * @param titulo 
     */
    constructor(autor: string, titulo: string){
        this.rutaFichero = `./src/datos/${autor}/${titulo}.json`;
        if (this.existeNota(titulo) == 0) {
            this.nota = readFileSync(this.rutaFichero).toString();
            this.titulo = titulo;
            this.tituloNota();
            this.cuerpoNota();
        }
    }

    /**
     * Funcion que mira si el titulo existe o no
     * @param titulo 
     * @returns 1-> no existe una nota con ese titulo, 0-> existe nota con ese titulo
     */
    existeNota(titulo: string){
        try{
            openSync(this.rutaFichero, "r");
            console.log(chalk.green(`Existe una nota titulada ${titulo}`));
            return 0;
        }
        catch(err){
            console.log(chalk.red(`Error 406, no existe la nota titulada ${titulo}`));
            return 1;
        }
    }

    /**
     * Funcion que muestra el titulo de la nota
     */
    tituloNota(){    
        if (this.nota.includes(`"color": "azul"`)){
            console.log(chalk.blue(`${this.titulo}`));
        }
        else if (this.nota.includes(`"color": "rojo"`)){
            console.log(chalk.red(`${this.titulo}`));
        }
        else if (this.nota.includes(`"color": "verde"`)){
            console.log(chalk.green(`${this.titulo}`));
        }
        else if (this.nota.includes(`"color": "amarillo"`)){
            console.log(chalk.yellow(`${this.titulo}`));
        }
    }

    /**
     * Funcion que muestra el cuerpo de la nota
     */
    cuerpoNota(){
        let aux1: number = this.nota.indexOf(`cuerpo":`);
        let aux2: number = this.nota.indexOf(`"color":`);
        this.cuerpo = this.nota.substring(aux1+9, aux2-7);
        console.log(this.cuerpo);
    }
}