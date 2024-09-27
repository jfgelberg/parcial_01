import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { MongoClient, ObjectId } from "mongodb"

const clientesComentarios = new MongoClient('mongodb://localhost:27017');
const db = clientesComentarios.db("cafes");


// async function getClientes(eliminados = false) {
//     await clientesComentarios.connect()
//     return db.collection("comentarios").find().toArray();
// }

async function getClientes(filtros = {}) {
    await clientesComentarios.connect()
        
        // Filtro por "eliminado" en false
        const filtroMongo = { eliminado: { $ne: true } };

        // Realiza la consulta a la colección "comentarios"
        const comentarios = await db.collection("comentarios").find(filtroMongo).toArray();
        
        return comentarios;
   
}


const getClienteId = async (id) => {
    await clientesComentarios.connect();
    
    // Validar que el ID tenga un formato de ObjectId válido (24 caracteres hexadecimales)
    if (!ObjectId.isValid(id)) {
        throw new Error("El ID proporcionado no es válido.");
    }

    const cliente = await db.collection("comentarios").findOne({ _id: new ObjectId(id) });
    if (!cliente) {
        throw new Error("No se encontró el cliente con el ID proporcionado.");
    }
    return cliente;
};

async function agregarCliente(cliente) {
    await clientesComentarios.connect();
    await db.collection("comentarios").insertOne(cliente)
    return cliente
}


// async function eliminarCliente(id) {
//     await clientesComentarios.connect()
//     await db.collection("comentarios").updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { eliminado: true } })
//     return id
// }

async function eliminarCliente(id) {
    await clientesComentarios.connect()

        // Marca el cliente como eliminado en la colección "comentarios"
        await db.collection("comentarios").updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { eliminado: true } });

        return id;
    
    }


const modificarCliente = async (id, clienteActualizado) => {
    await clientesComentarios.connect()
    await db.collection("comentarios").replaceOne(
        { _id: ObjectId.createFromHexString(id) },  
        clienteActualizado  
    );

    return clienteActualizado;
}

const actualizarCliente = async (id, clienteActualizado) => {
    await clientesComentarios.connect()
    await db.collection("comentarios").updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: clienteActualizado })
    return clienteActualizado
}

export {
    getClienteId,
    getClientes,
    agregarCliente,
    modificarCliente,
    actualizarCliente,
    eliminarCliente
}
