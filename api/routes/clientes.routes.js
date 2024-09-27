import { Router } from "express";
import * as controller from "../controllers/clientes.controller.js"; // viene de api/controllers/clientes.controller.js

const route = Router();

route.get("/clientes", controller.getClientes );
route.get("/clientes/:id", controller.getClienteId );
route.post("/clientes", controller.agregarCliente );
route.put("/clientes/:id", controller.reemplazarCliente );  
route.patch("/clientes/:id", controller.actualizarCliente );  
route.delete("/clientes/:id", controller.borrarCliente );     

export default route;