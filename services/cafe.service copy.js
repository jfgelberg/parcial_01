//import { readFile, writeFile } from "fs/promises"
import { promises as fs } from 'fs';
import { resolve } from "path"

// function getCafes(eliminados = false){
//     return readFile(resolve("data/productos.json"), { encoding: 'utf8' })
//         .then( (cafes) => eliminados ? JSON.parse(cafes) : JSON.parse(cafes).filter( cafe => !cafe.eliminado ) )
//         .catch( () => [] )
// }

// function getCafes(eliminados = false) {
//     return readFile(resolve("data/productos.json"), { encoding: 'utf8' })
//         .then((cafes) => {
//             const parsedCafes = JSON.parse(cafes);
//             console.log("Cafés:", parsedCafes); // Verifica los datos aquí
//             return eliminados ? parsedCafes : parsedCafes.filter(cafe => !cafe.eliminado);
//         })
//         .catch((error) => {
//             console.error("Error leyendo el archivo:", error);
//             return [];
//         });
// }

const getCafes = async (req, res) => {
    try {
        const filePath = 'C:/Users/javie/Desktop/Da vinci/Materias/Aplicaciones Hibridas/Parcial_01/data/productos.json';
        await fs.access(filePath); // Verifica si el archivo existe
        const data = await fs.readFile(filePath, 'utf8');
        const productos = JSON.parse(data);
        res.send(cafeView.crearPagina("Variedades de Cafes", cafeView.crearListadoCafes(productos)));
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener cafés");
    }
};







export {
    getCafes
}