import { readdirSync } from "fs";
import { readFileSync } from "fs";
const chalk = require('chalk');


/**
 * Clase list, donde su funcion es listar las notas de un mismo autor
 */
export class List {

    private listado: string[] = [];
    private ruta: string = "";

    /**
     * Constructor de la clase
     * @param autor 
     */
    constructor(autor: string){
        try {
            this.ruta = "./src/datos/" + autor;
            this.existeNota();
        }
        catch(err){
            console.log(chalk.red(`Error 404, este ${autor} no posee ninguna nota concocida`));
        }
    }

    /**
     * Funcion donde almacenamos en un vector el directorio de un autor y se comprueba si el autor tiene notas o no
     */
    existeNota(){
        readdirSync(this.ruta).forEach(nota => {
            this.listado.push(nota);
        });

        if (this.listado.length == 0){
            throw "Error 405, el autor no tiene ninguna nota conocida .";
        }
        else{
            console.log(chalk.green(`Posee las notas siguientes: `));
            this.listado.forEach(nota => {
                const data = readFileSync(`${this.ruta}/${nota}`).toString();
                if (data.includes(`"color": "rojo"`)){
                    console.log(chalk.red(`${nota}`));
                }
                else if (data.includes(`"color": "azul"`)){
                    console.log(chalk.blue(`${nota}`));
                }
                else if (data.includes(`"color": "verde"`)){
                    console.log(chalk.green(`${nota}`));
                }
                else if (data.includes(`"color": "amarillo"`)){
                    console.log(chalk.yellow(`${nota}`));
                }
            });
        }
    }
}