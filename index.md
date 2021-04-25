# Practica 8: Aplicación de procesamiento de notas de texto

## Tareas previas
* Aprender la utilización de ***yargs y chalk***
* Aprender las ***API sincrona de node.js***

## Procesamiento de texto

Comandos que tendrá la aplicación:
* add: añade nuevas notas
* list: hace un listado de las notas
* read: se utiliza para leer
* remove: eliminar una nota
* modify: modificar una nota

Estos comandos serám los encargados de procesar distintos elementos para que la aplicación haga lo que le pidamos.

Add:
* ejemplo de uso: add --autor="autor de la nota" --titulo="titulo de la nota" --cuerpo="cuerpo de la nota" --color="color del título de la nota"
* Se llevo a cabo una clase donde se le pasan por el constructor los atributos. Luego miramos si es un nuevo usuario o no para crear un directorio nuevo.
* API utilizadas
** opensync: abrir un fichero
** writesync: escribir en fichero
** mkdirsync: crear un directorio

```
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
```


Read:
* ejemplo de uso: read --autor"autor de la nota" --titulo="titulo de la nota"
* Creamos una clase donde le pasamos los atributos por el constructor y vemos si existe una nota existente ya con ese titulo, si es así se mostrará el string con el titulo.
* API utilizadas:
** readfilesync: leer un fichero
** pensync: abrir ficheros

```
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
```


Modify:
* ejemplo de uso: modify --autor"autor de la nota" --titulo="titulo de la nota" --cuerpo="cuerpo de la nota" --color="color del título de la nota"
* Creamos una clase donde tambien le pasamos los atributos desde el constructor y vemos si la nota introducida existe. en ese caso, se borrará y se mnodificará segun el usuario desee.
* API utilizada:
** unlinksync: borrar ficheros

```
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
```


Remove: 
* ejemplo de uso: remove --autor"autor de la nota" --titulo="titulo de la nota" 
* Creamos una clase donde psamos los atributos desde el construictor y nos cercioramos de si existe o no alguna nota con ese titulo. En el caso de que exista, procedemos a eliminar esa nota.
* API utilizadas:
** unlinksync: borrar ficheros

```
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
            console.log(chalk.green(`Eliminando nota titulada: ${titulo}`));
            return 0;
        }
        catch(err){
            console.log(chalk.red(`Error 403, la nota titulada ${titulo} no existe`));
            return 1;
        }
    }
}
```


En cuanto a los test, la siguiente imagen servirá para ver que los ha pasado correctamente con el uso de coveralls e instambul

![image](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-lucianosekulic/blob/gh-pages/Captura2.PNG)

He procedido a utilizar **chalk** para realizar los respectivos prints mediante colores en el codigo. Además de añadir sonar cloud, coveralls y githubactions.
