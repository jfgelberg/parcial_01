import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { MongoClient, ObjectId } from "mongodb"

const clientesComentarios = new MongoClient('mongodb://localhost:27017');
const db = clientesComentarios.db("cafes");

// function getClientes(eliminados = false){
//     return readFile(resolve("data/comentarios.json"), { encoding: 'utf8' })
//         .then( (clientes) => eliminados ? JSON.parse(clientes) : JSON.parse(clientes).filter( cliente => !cliente.eliminado ) )
//         .catch( () => [] )
// }

async function getClientes(eliminados = false) {
    await clientesProductos.connect()
    return db.collection("comentarios").find().toArray();
}

function getClienteId(id){
    return getClientes().then( clientes => {
        return clientes.find( cliente => cliente.id == id ) || {}
    } )
}

function agregarCliente(cliente){
    return getClientes().then( async clientes => {
        const nuevoCliente = {
            id: clientes.length + 1,  // Generar un nuevo ID
            nombre: cliente.nombre,
            resena: cliente.resena,
            img: cliente.img,
        }
        clientes.push(nuevoCliente)
        await writeFile("./data/comentarios.json", JSON.stringify(clientes) )
        return nuevoCliente
    })
}


function eliminarCliente(id){
    return getClientes(true)
        .then( async clientes => {

            const clientesActualizados = clientes.map( cliente =>  {
                if( cliente.id == id ) {
                    return {
                        ...cliente,
                        eliminado: true
                    }
                }else{
                    return cliente
                } 
            } )  

            await writeFile("./data/comentarios.json", JSON.stringify(clientesActualizados))
            return id
        } )
}

const modificarCliente = (id, clienteActualizado) => {
    return getClientes(true)
        .then( async clientes => {
            let clienteActualiza = null
            const clientesActualizados = clientes.map( cliente => {
                if( cliente.id == id ){
                    clienteActualiza = {
                        id: id,
                        ...clienteActualizado
                    }
                    return clienteActualiza
                }else{
                    return cliente
                }
            } )
            await writeFile("./data/comentarios.json", JSON.stringify(clientesActualizados))
            return clienteActualiza
        } )
}


const actualizarCliente = (id, clienteActualizado) => {
    return getClientes(true) //el true, es para que me traiga las clientes eliminadas
        .then( async clientes => {
            let clienteActualiza = null
            const clientesActualizados = clientes.map( cliente => {
                if( cliente.id == id ){
                    clienteActualiza = {
                        id: id,
                        "nombre": clienteActualizado.nombre ? clienteActualizado.nombre : cliente.nombre,
                        "resena": clienteActualizado.resena ? clienteActualizado.resena : cliente.resena,
                        "img": clienteActualizado.img ? clienteActualizado.img : cliente.img,
                    }
                    return clienteActualiza
                }else{
                    return cliente
                }
            } )
            await writeFile("./data/comentarios.json", JSON.stringify(clientesActualizados))
            return clienteActualiza
        } )
}

export {
    getClienteId,
    getClientes,
    agregarCliente,
    modificarCliente,
   eliminarCliente
}
