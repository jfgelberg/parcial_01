//cafe.routes.js

import express from "express"
import * as controllerCafe from "../controllers/cafes.controller.js"
import * as controllerClientes from "../controllers/clientes.controller.js"

const route = express.Router()
route.get("/cafes", controllerCafe.getCafes)      //listado de cafes

route.get("/cafes/cafeNuevo", controllerCafe.crearNuevoCafe)    
route.post("/cafes/cafeNuevo", controllerCafe.agregarCafe)

route.post("/cafes/eliminar/:id", controllerCafe.eliminarCafe)
route.get("/cafes/eliminar/:id", controllerCafe.eliminarCafeForm)

route.get("/cafes/modificar/:id", controllerCafe.modificarCafeForm)
route.post("/cafes/modificar/:id", controllerCafe.modificarCafe)

route.get("/cafes/:id", controllerCafe.getCafeId) //detalle del cafe

// //---------------------------------------------------------------------
// //------ routes clientes ----------------------------------------------
// //---------------------------------------------------------------------
route.get("/clientes", controllerClientes.getClientes)     //listado de clientes

route.get("/clientes/clienteNuevo", controllerClientes.crearNuevoCliente)
route.post("/clientes/clienteNuevo", controllerClientes.agregarCliente)

route.post("/clientes/eliminar/:id", controllerClientes.eliminarCliente)
route.get("/clientes/eliminar/:id", controllerClientes.eliminarClienteForm)

route.get("/clientes/modificar/:id", controllerClientes.modificarClienteForm)
route.post("/clientes/modificar/:id", controllerClientes.modificarCliente)

route.get("/clientes/:id", controllerClientes.getClienteId) //detalle de clientes

export default route