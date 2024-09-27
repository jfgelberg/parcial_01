import * as clienteService from "../services/clientes.service.js"
import * as clienteView from "../views/clientes.view.js"
import { ObjectId } from 'mongodb';


//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
// *-*-*-*-*-* Detalle del producto *-*-*-*-*-*
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const getClientes = (req, res)=>{
    clienteService.getClientes()
        .then(comentarios => {
            res.send(clienteView.crearPagina("Listado de clientes", clienteView.crearListadoclientes(comentarios)))
        })
}

const getClienteId = (req, res) => {
    clienteService.getClienteId(req.params.id)
        .then( cliente => res.send( clienteView.crearPagina("detalle del cliente", clienteView.crearDetalleCliente(cliente)) ) )
}


// //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// //*-*-*-* Nuevo cliente *-*-*-*-*-*
// //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const crearNuevoCliente = (req, res) => {
    res.send( clienteView.crearPagina("Cargar un nuevo cliente", clienteView.crearNuevoCliente() ) )
}

//---- Muestra el cliente cargado en la base de datos ---- 
const agregarCliente = (req, res) => {
    clienteService.agregarCliente(req.body)       
    .then( ( cliente ) => res.send( clienteView.crearPagina("Nuevo cliente ", `      
      <div class="container mt-5 ">
         <h3 class='text-center'>Se agregó el cliente con exito! </h3>
         <div class="card w-50 m-auto bg-dark text-light border border-none">
             <div class="card-body bg-dark text-light">
             <ul>
                <li class="tablaAgregado">ID: ${cliente._id}</li>
                <li class="tablaAgregado">Nombre: ${cliente.nombre}</li>
                <li class="tablaAgregado">Descripción: ${cliente.resena}</li>
                <li class="tablaAgregado">Preparado: ${cliente.img}</li>
             </ul>
                <div>
                    <a class='btnMenu' href='/clientes' >Volver</a>
                </div>
             </div>
         </div>
     </div>
        `  ) ) )
    .catch( (err) => res.send(clienteView.crearPagina("Error Al agregar un café", `<p>${err}</p>`)) )
}


// //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// //*-*-*-*-* modificar cliente *-*-*-*-*-*
// //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const modificarClienteForm = (req, res) => {
    const idCliente = req.params.id
    clienteService.getClienteId(idCliente)
          .then( cliente => res.send( clienteView.crearPagina("Editar un cliente", clienteView.modificarForm(cliente) ) ) )
}

export const modificarCliente = (req, res) => {
    const idCliente = req.params.id
    clienteService.modificarCliente(idCliente, req.body)
        .then( ( cliente ) => res.send( clienteView.crearPagina("Editar un cliente ", `      
            <div class="container mt-5 ">
               <h3 class='text-center'>Se editó con exito! </h3>
               <div class="card w-50 m-auto bg-dark text-light border border-none">
                   <div class="card-body bg-dark text-light">
                   <ul>
                      <li class="tablaEditado">Nombre: ${cliente.nombre}</li>
                      <li class="tablaEditado">Descripción: ${cliente.resena}</li>
                      <li class="tablaEditado">imagen: ${cliente.img}</li>
                   </ul>
                      <div>
                          <a class='btnMenu' href='/clientes' >Volver</a>
                      </div>
                   </div>
               </div>
           </div>
             `  ) ) )
         .catch( (err) => res.send(clienteView.crearPagina("Error al editar un cliente", `<p>${err}</p>`)) )
}


// //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// //*-*-*-*-* eliminar cliente *-*-*-*-*-*
// //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const eliminarClienteForm = (req, res) => {
    const idCliente = req.params.id
    clienteService.getClienteId(idCliente)
        .then( cliente => res.send( clienteView.crearPagina("Eliminar un cliente", clienteView.eliminarForm(cliente) ) ) )
        .catch( (err) => res.send(clienteView.crearPagina("Error Al eliminar una cliente", `<p>${err}</p>`)) )
}

export const eliminarCliente = (req, res) => {
    const idCliente = req.params.id
    clienteService.eliminarCliente(idCliente, req.body)
        .then( () => res.redirect("/clientes") )
}

export {
    getClienteId,
    getClientes,
    crearNuevoCliente,
    agregarCliente,
    modificarClienteForm,
    eliminarClienteForm

}