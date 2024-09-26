import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { MongoClient, ObjectId } from "mongodb"

const clientesComentarios = new MongoClient('mongodb://localhost:27017');
const db = clientesComentarios.db("cafes");


async function getClientes(eliminados = false) {
    await clientesComentarios.connect()
    return db.collection("comentarios").find().toArray();
}


const getClienteId = async (id) => {
    await clientesComentarios.connect();
    
    // Validar que el ID tenga un formato de ObjectId válido (24 caracteres hexadecimales)
    if (!ObjectId.isValid(id)) {
        throw new Error("El ID proporcionado no es válido.");
    }

    const cliente = await db.collection("comentarios").findOne({ _id: new ObjectId(id) });
    if (!cliente) {
        throw new Error("No se encontró el café con el ID proporcionado.");
    }
    return cliente;
};

async function agregarCliente(cliente) {
    await clientesComentarios.connect();
    await db.collection("comentarios").insertOne(cliente)
    return cliente
}


async function eliminarCliente(id) {
    await clientesComentarios.connect()
    await db.collection("comentarios").deleteOne({ _id: new ObjectId(id) })
    return id
}


const modificarCliente = async (id, clienteActualizado) => {
    await clientesComentarios.connect()

   // Reemplazar el documento existente con el actualizado
    const resultado = await db.collection("comentarios").replaceOne(
        { _id: ObjectId.createFromHexString(id) },  // Filtro
        clienteActualizado  // Nuevo documento
    );

    return clienteActualizado;
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
