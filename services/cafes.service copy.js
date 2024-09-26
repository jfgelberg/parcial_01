import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { MongoClient, ObjectId } from "mongodb"

const  cafesProductos = new MongoClient('mongodb://localhost:27017');
const db = cafesProductos.db("cafes");


async function getCafes(eliminados = false){
    await cafesProductos.connect()
    return db.collection("productos").find().toArray();

    // return readFile(resolve("data/productos.json"), { encoding: 'utf8' })
    //     .then( (cafes) => eliminados ? JSON.parse(cafes) : JSON.parse(cafes).filter( cafe => !cafe.eliminado ) )
    //     .catch( () => [] )
}

async function getCafeId(id){
    await cafesProductos.connect()
    const datos = await db.collection("productos").findOne({_id: new ObjectId(id) })
    return datos

    // return getCafes().then( cafes => {
    //     return cafes.find( cafe => cafe.id == id ) || {}
    // } )
}

async function agregarCafe(cafe){
    await cafesProductos.connect()
    await db.collection("productos").insertOne(cafe)
    return cafe


    // return getCafes().then( async cafes => {
    //     const nuevoCafe = {
    //         id: cafes.length + 1,  // Generar un nuevo ID
    //         nombre: cafe.nombre,
    //         descripcion: cafe.descripcion,
    //         preparado: cafe.preparado,
    //         tamano: cafe.tamano,
    //         img: cafe.img,
    //         precio: cafe.precio
    //     }
    //     cafes.push(nuevoCafe)
    //     await writeFile("./data/productos.json", JSON.stringify(cafes) )
    //     return nuevoCafe
    // })
}


async function eliminarCafe(id){
    await cafesProductos.connect()
    await db.collection("productos").deleteOne({_id: new ObjectId(id) })
    return id


    // return getCafes(true)
    //     .then( async cafes => {

    //         const cafesActualizadas = cafes.map( cafe =>  {
    //             if( cafe.id == id ) {
    //                 return {
    //                     ...cafe,
    //                     eliminado: true
    //                 }
    //             }else{
    //                 return cafe
    //             } 
    //         } )  

    //         await writeFile("./data/productos.json", JSON.stringify(cafesActualizadas))
    //         return id
    //     } )
}

const modificarCafe = async (id, cafeActualizado) => {
    await cafesProductos.connect()
    await db.collection("productos").replaceOne({ _id: ObjectId.createFromHexString(id)})
    return cafeActualizado


    // return getCafes(true)
    //     .then( async cafes => {
    //         let cafeActualiza = null
    //         const cafesActualizados = cafes.map( cafe => {
    //             if( cafe.id == id ){
    //                 cafeActualiza = {
    //                     id: id,
    //                     ...cafeActualizado
    //                 }
    //                 return cafeActualiza
    //             }else{
    //                 return cafe
    //             }
    //         } )
    //         await writeFile("./data/productos.json", JSON.stringify(cafesActualizados))
    //         return cafeActualiza
    //     } )
}


const actualizarCafe = (id, cafeActualizado) => {
    return getCafes(true) //el true, es para que me traiga las cafes eliminadas
        .then( async cafes => {
            let cafeActualiza = null
            const cafesActualizadas = cafes.map( cafe => {
                if( cafe.id == id ){
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
                }else{
                    return cafe
                }
            } )
            await writeFile("./data/productos.json", JSON.stringify(cafesActualizados))
            return cafeActualiza
        } )
}

export {
    getCafeId,
    getCafes,
    agregarCafe,
    modificarCafe,
    eliminarCafe
}
