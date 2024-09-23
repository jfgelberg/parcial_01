//cafe.service.js

import { readFile } from 'fs/promises';
import { resolve } from "path";

function getCafes(){
    return readFile(resolve("data/productos.json"), { encoding: "utf-8"})
        .then( (cafes) => JSON.parse(cafes) )
        .catch( () => [] )
}


export {
  getCafes
};