//*******requires*******/
const fs = require('fs');
const path = require('path');

//****creamos el path al JSON en el que estan las tareas *****/
let archivoTareas = path.join(__dirname, 'tareas.json');

/********Metodos para LEER el archivo tareas.json *******/
function leerJSON() {
    //si existe el archivo devolvemos el objeto json
    if(fs.existsSync(archivoTareas)) {
        let datos = fs.readFileSync(archivoTareas, 'utf-8');
        return JSON.parse(datos);
    }
    //si no existe devolvemos un array vacio
    return [];
}

/********Metodos para ESCRIBIR el archivo tareas.json *******/
function guardarJSON(datos) {
    let datosJson = JSON.stringify(datos, null, ' '); // null, ' ' le da formato al archivo JSON con espacios y saltos de linea
    fs.writeFileSync(archivoTareas, datosJson);
}

//****OBJETO LITERAL CON TODOS LOS METODOS PARA LISTAR, MODIFICAR, CREAR Y BORRAR TAREAS DEL ARCHIVO TAREAS.JSON *******/
let tareas = {
    listar() {
        let tareas = leerJSON();    
        tareas.forEach(function(tarea, indice) {
            //se le pone ++indice para que siempre le sume 1 al indice. asi no empieza del 0
            console.log(++indice + ': ' + tarea.titulo + ' --> ' + tarea.estado);
        });
    },
    listarPorTitulo(titulo) {
        let tareas = leerJSON();    
        let tareaPorTitulo = tareas.filter(function(tarea) {
            return tarea.titulo == titulo;
        });
        if(tareaPorTitulo.length > 0) {
            tareaPorTitulo.forEach(function(tarea, indice) {
                console.log(++indice + ': ' + tarea.titulo + ' --> ' + tarea.estado);
            });
        } else {
            console.log('No hay tareas con el titulo:', titulo);
        }
    },
    listarPorEstado(estado) {
        let tareas = leerJSON();   
        let tareasPorEstado = tareas.filter(function(tarea) {
            return tarea.estado == estado;
        });
        if(tareasPorEstado) {
            tareasPorEstado.forEach(function(tarea, indice) {
                console.log(++indice + ': ' + tarea.titulo + ' --> ' + tarea.estado);
            });
        } else {
            console.log('No hay tareas con el estado:', estado);
        }
    },
    crear(tarea) {
        let tareas = leerJSON();
        tareas.push(tarea);
        guardarJSON(tareas);
        return true;
    },
    editar(titulo,nuevoEstado){
        let tareas = leerJSON();
        let returnEstado = false;//para saber si pudo o no realizar el cambio de estado de la tarea
        tareas.forEach(function(temp)
            {
                if(temp.titulo == titulo){
                    temp.estado = nuevoEstado;
                    returnEstado = true;
                }
            }
        );            
        if(returnEstado){
            guardarJSON(tareas);
        }
        return returnEstado;
    },
    borrar(propiedadBusqueda, parametroBusqueda){
        let tareas = leerJSON();
        let actualizarTareas;
        let returnEstado = false;
        switch (propiedadBusqueda){
            case 'titulo':
                actualizarTareas =  tareas.filter(function (temp){ 
                    if(temp.titulo == parametroBusqueda){
                        returnEstado = true;
                    }           
                    return temp.titulo != parametroBusqueda;
                });
                break;
            case 'descripcion':
                actualizarTareas =  tareas.filter(function (temp){
                    if(temp.descripcion == parametroBusqueda){
                        returnEstado = true;
                    }             
                    return temp.descripcion != parametroBusqueda;
                });
                break;
            case 'estado':
                actualizarTareas =  tareas.filter(function (temp){ 
                    if(temp.estado == parametroBusqueda){
                        returnEstado = true;
                    }            
                    return temp.estado != parametroBusqueda;
                });
                break;
        }
        guardarJSON(actualizarTareas);
        return returnEstado;//para saber si pudo o no realizar el borrado
    }
}

module.exports = tareas;//devuelve todo el contenido del objeto literal incluyendo las funciones