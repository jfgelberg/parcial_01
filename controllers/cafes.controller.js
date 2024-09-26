import * as cafeService from "../services/cafes.service.js"
import * as cafeView from "../views/cafes.view.js"
import { ObjectId } from 'mongodb';

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
// *-*-*-*-*-* Detalle del producto *-*-*-*-*-*
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const getCafes = (req, res)=>{
    cafeService.getCafes()
        .then(productos => {
            res.send(cafeView.crearPagina("Listado de cafes", cafeView.crearListadoCafes(productos)))
        })
}

const getCafeId = (req, res) => {
    cafeService.getCafeId(req.params.id)
        .then( cafe => res.send( cafeView.crearPagina("detalle del producto", cafeView.crearDetalleCafe(cafe)) ) )
}


//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
//*-*-*-* Nuevo cafe *-*-*-*-*-*
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const crearNuevoCafe = (req, res) => {
    res.send( cafeView.crearPagina("Cargar un nuevo café", cafeView.crearNuevoCafe() ) )
}

//---- Muestra el cafe cargado en la base de datos ---- 
const agregarCafe = (req, res) => {

    // Convertir el precio a un número
    const nuevoCafe = {
        ...req.body,
        precio: parseFloat(req.body.precio)  // Convertir el precio a un valor numérico
    };

    cafeService.agregarCafe(nuevoCafe)        
    .then( ( cafe ) => res.send( cafeView.crearPagina("Nuevo café ", `      
      <div class="container mt-5 ">
         <h2 class='text-center'>Se agregó el café con exito! </h2>
         <div class="card w-50 m-auto bg-dark text-light border border-none">
             <div class="card-body bg-dark text-light">
             <ul>
                <li class="tablaAgregado">ID: ${cafe._id}</li>
                <li class="tablaAgregado">Nombre: ${cafe.nombre}</li>
                <li class="tablaAgregado">Descripción: ${cafe.descripcion}</li>
                <li class="tablaAgregado">Preparado: ${cafe.preparado}</li>
                <li class="tablaAgregado">Tamaño: ${cafe.tamano}</li>
                <li class="tablaAgregado">imagen: ${cafe.img}</li>
                <li class="tablaAgregado">Precio: ${cafe.precio}</li>
             </ul>
                <div>
                    <a class='btnMenu' href='/cafes' >Volver</a>
                </div>
             </div>
         </div>
     </div>
        `  ) ) )
    .catch( (err) => res.send(cafeView.crearPagina("Error Al agregar un café", `<p>${err}</p>`)) )
}


//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
//*-*-*-*-* modificar cafe *-*-*-*-*-*
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const modificarCafeForm = (req, res) => {
    const idCafe = req.params.id
    cafeService.getCafeId(idCafe)
          .then( cafe => res.send( cafeView.crearPagina("Editar un producto", cafeView.modificarForm(cafe) ) ) )
}

export const modificarCafe = (req, res) => {
    const idCafe = req.params.id;

    const cafeActualizado = { ...req.body };
    if (cafeActualizado.precio) {
        cafeActualizado.precio = parseFloat(cafeActualizado.precio);
    }

    cafeService.modificarCafe(idCafe, cafeActualizado)
        .then((cafe) => {
            res.send(cafeView.crearPagina("Editar un Producto", `
                <div class="container mt-5">
                    <h2 class='text-center'>Se editó el café con éxito!</h2>
                    <div class="card w-50 m-auto bg-dark text-light border border-none">
                        <div class="card-body bg-dark text-light">
                            <ul>
                                <li class="tablaEditado">ID: ${cafe._id}</li>
                                <li class="tablaEditado">Nombre: ${cafe.nombre}</li>
                                <li class="tablaEditado">Descripción: ${cafe.descripcion}</li>
                                <li class="tablaEditado">Preparado: ${cafe.preparado}</li>
                                <li class="tablaEditado">Tamaño: ${cafe.tamano}</li>
                                <li class="tablaEditado">Imagen: ${cafe.img}</li>
                                <li class="tablaEditado">Precio: $${cafe.precio.toFixed(2)}</li>
                            </ul>
                            <div>
                                <a class='btnMenu' href='/cafes'>Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            `));
        })
        .catch((err) => res.send(cafeView.crearPagina("Error al editar un café", `<p>${err}</p>`)));
};



//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
//*-*-*-*-* eliminar cafe *-*-*-*-*-*
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const eliminarCafeForm = (req, res) => {
    const idCafe = req.params.id
    cafeService.getCafeId(idCafe)
        .then( cafe => res.send( cafeView.crearPagina("Eliminar un cafe", cafeView.eliminarForm(cafe) ) ) )
        .catch( (err) => res.send(cafeView.crearPagina("Error Al eliminar una cafe", `<p>${err}</p>`)) )
}

export const eliminarCafe = (req, res) => {
    const idCafe = req.params.id
    cafeService.eliminarCafe(idCafe, req.body)
        .then( () => res.redirect("/cafes") )
}

export {
    getCafeId,
    getCafes,
    crearNuevoCafe,
    agregarCafe,
    modificarCafeForm,
    eliminarCafeForm

}