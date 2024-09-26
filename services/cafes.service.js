import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { MongoClient, ObjectId } from "mongodb"

const cafesProductos = new MongoClient('mongodb://localhost:27017');
const db = cafesProductos.db("cafes");


async function getCafes(eliminados = false) {
    await cafesProductos.connect()
    return db.collection("productos").find().toArray();
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
    await db.collection("productos").deleteOne({ _id: new ObjectId(id) })
    return id
}

const modificarCafe = async (id, cafeActualizado) => {
    await cafesProductos.connect(); 

   // Reemplazar el documento existente con el actualizado
    const resultado = await db.collection("productos").replaceOne(
        { _id: ObjectId.createFromHexString(id) },  // Filtro
        cafeActualizado  // Nuevo documento
    );

    return cafeActualizado;
}


const actualizarCafe = (id, cafeActualizado) => {
    return getCafes(true) //el true, es para que me traiga las cafes eliminadas
        .then(async cafes => {
            let cafeActualiza = null
            const cafesActualizadas = cafes.map(cafe => {
                if (cafe.id == id) {
                    cafeActualiza = {
                        id: id,
                        "nombre": cafeActualizado.nombre ? cafeActualizado.nombre : cafe.nombre,
                        "descripcion": cafeActualizado.descripcion ? cafeActualizado.descripcion : cafe.descripcion,
                        "preparado": cafeActualizado.preparado ? cafeActualizado.preparado : cafe.preparado,
                        "tamano": cafeActualizado.tamano ? cafeActualizado.tamano : cafe.tamano,
                        "img": cafeActualizado.img ? cafeActualizado.img : cafe.img,
                        "precio": cafeActualizado.precio ? cafeActualizado.precio : cafe.precio,
                    }
                    return cafeActualiza
                } else {
                    return cafe
                }
            })
            await writeFile("./data/productos.json", JSON.stringify(cafesActualizados))
            return cafeActualiza
        })
}

export {
    getCafeId,
    getCafes,
    agregarCafe,
    modificarCafe,
    eliminarCafe
}
