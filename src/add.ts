import { writeFileSync } from 'fs';
import { openSync } from 'fs';
import { mkdirSync } from 'fs';
import { Nota } from "../src/nota"
const chalk = require('chalk');


/**
 * Clase add, su funcion es agregar una nota
 */
export class Add {
    private nota: Nota = {autor: "", titulo: "", cuerpo: "", color: ""};
    private rutaFichero: string = "";
    private ruta: string = "";

    /**
     * constructor de la clase 
     * @param autor 
     * @param titulo 
     * @param cuerpo 
     * @param color 
     */
    constructor(autor: string, titulo: string, cuerpo: string, color: string){
        this.ruta = "./src/datos/" + autor;
        this.rutaFichero = `./src/datos/${autor}/${titulo}.json`;
        this.addAutor(autor);
        if (this.existeNota(titulo) == 0){
            if (this.Color(color) == 0){
                this.nota = {autor: autor, titulo: titulo, cuerpo: cuerpo, color: color};
                this.addNota();
            }
        }
    }

    /**
     * Funcion para comprobar si hay una nota igual
     * @param titulo 
     * @returns 1 -> existe nota, 0 -> crea una nota
     */
    existeNota(titulo: string){
        try{
          openSync(this.rutaFichero, "r");
          console.log(chalk.red(`Error 401, Existe la nota con el mismo titulo: ${titulo}`));
          return 1;
        }
        catch(err){
          console.log(chalk.green(`creando nota llamado: ${titulo}`));
          return 0;
        }
    }

    /**
     * Funcion para ver si el autor existe o no
     * @param autor 
     * @returns 1-> para crear el autor, 0-> si ya esta creado
     */
    addAutor(autor: string){
        try{
            mkdirSync(this.ruta);
            console.log(chalk.red(`Creando al autor: ${autor}`));
            return 1;
        }
        catch(err){
            console.log(chalk.green(`Este autor ya esta creado, ${autor}`));
            return 0;
        }
    }

    /**
     * Funcion donde se comprueba si el color está disponible o no
     * @param color 
     * @returns 1 -> si el color no esta disponible, 0 -> si el color es correcto
     */
    Color(color: string){
        if (color != "rojo" && color != "azul" && color != "verde" && color != "amarillo") {
          console.log(chalk.red(`Color no disponible, ${color}`));
            return 1;
        }
        else{
          console.log(chalk.green(`El color elegido(${color}), es correcto`));
            return 0;;
        }
    }

    /**
     * Funcion donde se crea una nota del autor 
     */
    addNota(){
      let aux: JSON[] =  [];
      aux.push(JSON.parse(`{"autor": "${this.nota.autor}", "titulo": "${this.nota.titulo}", "cuerpo": "${this.nota.cuerpo}", "color": "${this.nota.color}"}`));
      writeFileSync(this.rutaFichero, JSON.stringify(aux, null, 2));
      console.log(chalk.green(`Creando nota con titulo: ${this.nota.titulo} y autor: ${this.nota.autor}`));
      return 0;
    }
}