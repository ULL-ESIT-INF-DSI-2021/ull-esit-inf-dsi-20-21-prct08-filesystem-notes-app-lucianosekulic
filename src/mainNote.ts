import { Add } from "../src/add";
import { List } from "../src/list";
import { Modify } from "../src/modify";
import { Read } from "../src/read";
import { Remove } from "../src/remove";
const yargs = require('yargs');
const chalk = require('chalk');

/**
 * Archivo donde gestionamos los diferentes comandos, con sus comandos, haciendo uso de yargs.
 */

/**
 * Comando: --add: Añadir una nota.
 * ejemplo: --autor="nombre autor" --titulo="titulo de la nota" --cuerpo="cuerpo de la nota" --color="color de la nota"
 */
yargs.command("add", 'Añadir una nota', {
    autor: {
        describe: 'Autor',
        demandOption: true,
        type: 'string',
    },
    titulo: {
        describe: 'Titulo',
        demandOption: true,
        type: 'string',
    },
    cuerpo: {
        describe: 'Cuerpo de la nota',
        demandOption: true,
        type: 'string',
    },
    color: {
        describe: 'Color',
        demandOption: true,
        type: 'string',
    },
});


/**
 * Comando: --list: Hace un listado de las notas del autor.
 * ejemplo: --autor="nombre autor"
 */
yargs.command("list", "Lista de las notas", {
    autor: {
        describe: 'Autor',
        demandOption: true,
        type: 'string',
    }
});


/**
 * Comando --read: Lee una nota con su respectivo titulo.
 * ejemplo: --autor="nombre autor" --titulo="titulo de la nota"
 */
yargs.command("read", "Lee una nota", {
    autor: {
        describe: 'Autor de la nota que se va a leer',
        demandOption: true,
        type: 'string',
    },
    titulo: {
        describe: 'Titulo de la nota que se va a leer',
        demandOption: true,
        type: 'string',
    },
});


/**
 * Comando --remove: Borra la nota de un autor con su respectivo titulo.
 * ejemplo: --autor="nombre autor" --titulo="titulo de la nota"
 */
yargs.command("remove", "Borrar una nota", {
    autor: {
        describe: 'Autor de la nota que se va a borrar',
        demandOption: true,
        type: 'string',
    },
    titulo: {
        describe: 'Titulo de la nota que se va a borrar',
        demandOption: true,
        type: 'string',
    },
});


/**
 * Comando --modify: Modifica una nota.
 * ejemplo: --autor="nombre autor" --titulo="titulo de la nota" --cuerpo="cuerpo de la nota" --color="color de la nota"
 */
 yargs.command("modify", 'Modificar una nota', {
    autor: {
        describe: 'Autor',
        demandOption: true,
        type: 'string',
    },
    titulo: {
        describe: 'Titulo',
        demandOption: true,
        type: 'string',
    },
    cuerpo: {
        describe: 'Cuerpo',
        demandOption: true,
        type: 'string',
    },
    color: {
        describe: 'Color',
        demandOption: true,
        type: 'string',
    },
});


const argv = yargs.argv;
const comando = argv._[0];


if (comando == "add"){
    new Add(argv.autor, argv.titulo, argv.cuerpo, argv.color);
}
else if (comando == "list"){
    new List(argv.autor);
}
else if (comando == "read"){
    new Read(argv.autor, argv.titulo);
}
else if (comando == "remove"){
    new Remove(argv.autor, argv.titulo);
}
else if (comando == "modify"){
    new Modify(argv.autor, argv.titulo, argv.cuerpo, argv.color);
}
else{
  console.log(chalk.red(`Error 400, no existe el comando`));
}

yargs.parse();