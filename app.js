//*******DEBUG**********/
console.log(" ");
console.log("corriendo APP tareas");
//*******requires*******/
const chalk = require('chalk');
const funcionesDeTareas = require('./funcionesDeTareas');

//se accede al array de argumentos que se pasa y se ejecuta en node
//primer parametro es donde esta el exe node
//segundo donde esta el app.js (en este caso)
//tercero en adelante, accedemos a los argumentos que le podemos o no pasar (cada argumento esta separado de un espacio)
const entradaAccion = process.argv[2];
let parametros = process.argv.slice(3);

const DESCRIPCION_INICIAL = 'sin descripción';
const ESTADO_INICIAL = 'pendiente';
//**********************/

switch (entradaAccion){
    case "listar":
    case "l":
    case undefined:
        listarTareas()
        break;
    case "buscar":
    case "b":
        buscarTarea()
        break;
    case 'crear':
    case 'c':
        crearTarea();
        break;
        case 'crear':
    case 'borrar':
        borrarTarea();
        break;
    case 'editar':
    case 'e':
        editarTarea();
        break;
    default:
        porDefault();
}

//******FUNCIONES DE LA APLICACION (VALIDA LOS DATOS Y EJECUTA LOS METODOS QUE TENEMOS EN funcionesDeTareas.js)*********/
function listarTareas(){
    console.log(" ");
    if(parametros.length>0){
        console.log(chalk.green.inverse("Listado de las tareas en estado " + parametros[0]));
        funcionesDeTareas.listarPorEstado(parametros[0]);
    }else{
        console.log(chalk.green.inverse("Listado de todas las tareas"));
        funcionesDeTareas.listar();
    }      
    console.log(" ");
}

function buscarTarea(){
    console.log(" ");
    if(parametros.length>0){
        console.log(chalk.green.inverse('Listado de tareas con el nombre de "' + parametros[0] + '"'));
        funcionesDeTareas.listarPorTitulo(parametros[0]);
    }else{
        console.log(chalk.yellow.inverse("Tiene que escribir el nombre de la tarea que busca"));
    }      
    console.log(" ");
}

function crearTarea(){
    let creacionCorrecta = false;
    if(parametros.length > 0 ) {       
        let tarea;
        switch (parametros.length){
            case 1:
                tarea = {
                    titulo: parametros[0],
                    descripcion: DESCRIPCION_INICIAL,
                    estado: ESTADO_INICIAL
                }
                creacionCorrecta = funcionesDeTareas.crear(tarea);
            break;
            case 2:
                tarea = {
                    titulo: parametros[0],
                    descripcion: parametros[1],
                    estado: ESTADO_INICIAL
                }
                creacionCorrecta = funcionesDeTareas.crear(tarea);
            break;
            default:
                console.log(" ");
                console.log(chalk.red.inverse('Hay parametros de mas. Solo escribe el titulo y opcionalmente una descripción'));
        }                       
    } else {
        console.log(" ");
        console.log(chalk.red.inverse('Debes escribir al menos el título de la tarea que quieres crear. Opcional escribir una descripción'));
    }
    if(creacionCorrecta){
        console.log(" ");
        console.log(chalk.green.inverse('La creacion de la nueva tarea con el titulo "' + parametros[0] + '" fue exitosa'));
    }
}

function borrarTarea(){
    console.log(" ");
    if(parametros.length>1){
        if( parametros[0] == 'titulo' || parametros[0] == 'descripcion' || parametros[0] == 'estado'){
            if(funcionesDeTareas.borrar(parametros[0], parametros[1])){
                console.log(chalk.green.inverse('La tarea con el parametro "' + parametros[0] + '" y el contenido "' + parametros[1] +'" fue borrada exitosamente'));
            }else{
                console.log(chalk.yellow.inverse('La tarea con el parametro "' + parametros[0] + '" y el contenido "' + parametros[1] + '" no se encontro'));
            }    
        }else{
            console.log(chalk.yellow.inverse("No se reconoce el nombre de la tarea que se quiere borrar (titulo, descripcion, estado)"));
        }        
    }else{
        console.log(chalk.yellow.inverse("Tiene que escribir el parametro y su contenido para poder borrar la tarea"));
    }      
    console.log(" ");
}

function editarTarea(){
    console.log(" ");
    if(parametros.length>1){
        if(parametros[1] == 'terminada' || parametros[1] == 'pendiente' || parametros[1] == 'en progreso' ){
            if(funcionesDeTareas.editar(parametros[0], parametros[1])){
                console.log(chalk.green.inverse('La tarea con el titulo "' + parametros[0] + '" fue actualizada con el estado "' + parametros[1] +'" exitosamente'));
            }else{
                console.log(chalk.yellow.inverse('La tarea con el titulo "' + parametros[0] +'" no se encontro'));
            } 
        }else{
            console.log(chalk.yellow.inverse('No se reconoce el nuevo estado'));
        }
    }else{
        console.log(chalk.yellow.inverse("Tiene que escribir el titulo y el nuevo estado de la tarea, para actualizar su estado"));
    }
    console.log(" ");
}

function porDefault(){
    console.log(" ");
    console.log(chalk.yellow.inverse("No entiendo qué quieres hacer."));
    console.log("Las opciones son:");
    console.log("listar/l : lista las tareas por estado o todas (parametro opcional estado)");
    console.log("buscar/b : busca una tarea por nombre (parametro opcional titulo)");
    console.log("crear/c  : crea una tarea nueva (parametro obligatorio titulo, parametro opcional descripcion)");
    console.log("borrar   : borra una tarea (parametro obligatorio titulo, descripcion o estado mas el contenido que corresponda)");
    console.log("editar/e : edita una tarea (parametro obligatorio titulo, parametro obligatorio 'nuevo estado')");
    console.log(" ");
}