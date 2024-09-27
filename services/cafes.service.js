import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { MongoClient, ObjectId } from "mongodb"

const cafesProductos = new MongoClient('mongodb://localhost:27017');
const db = cafesProductos.db("cafes");


async function getCafes(filtros = {}) {
    await cafesProductos.connect();
    
    // Filtrar por "eliminado" en false o cuando no existe (usamos $ne: true)
    const filtroMongo = { eliminado: { $ne: true } };
    
    // Realizamos la consulta con los filtros aplicados
    return db.collection("productos").find(filtroMongo).toArray();
}


const getCafeId = async (id) => {
    await cafesProductos.connect();

    // Validar que el ID tenga un formato de ObjectId válido (24 caracteres hexadecimales)
    if (!ObjectId.isValid(id)) {
        throw new Error("El ID proporcionado no es válido.");
    }

    const cafe = await db.collection("productos").findOne({ _id: new ObjectId(id) });
    if (!cafe) {
        throw new Error("No se encontró el café con el ID proporcionado.");
    }
    return cafe;
};

async function agregarCafe(cafe) {
    await cafesProductos.connect()
    await db.collection("productos").insertOne(cafe)
    return cafe
}


async function eliminarCafe(id) {
    await cafesProductos.connect()
    await db.collection("productos").updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { eliminado: true } })
    return id
}


const modificarCafe = async (id, cafeActualizado) => {
    await cafesProductos.connect();
    await db.collection("productos").replaceOne(
        { _id: ObjectId.createFromHexString(id) },  
        cafeActualizado  
    );

    return cafeActualizado;
}

const actualizarCafe = async (id, cafeActualizado) => {
    await cafesProductos.connect()
    await db.collection("productos").updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: cafeActualizado })
    return cafeActualizado
}

export {
    getCafeId,
    getCafes,
    agregarCafe,
    modificarCafe,
    actualizarCafe,
    eliminarCafe
}
