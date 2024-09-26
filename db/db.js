import { MongoClient } from "mongodb"; // permite conectarme a la base de datos

const cliente = new MongoClient('mongodb://localhost:27017');

cliente.connect()
    .then( async ()=> {
        console.log('Conectado a la base de datos mongoDB' ) 

        // selecciono la base de datos
        const db = cliente.db("cafes"); 

        //colecciones
        const cafesProductos = await db.collection("productos").find().toArray();
        const  clientesComentarios = await db.collection("comentarios").find().toArray();

        console.log(cafesProductos)
        console.log(clientesComentarios)
    })
        .catch( () => console.log('no me pude conectar'));




