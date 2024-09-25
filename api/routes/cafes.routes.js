import { Router } from "express";
import * as controller from "../controllers/cafes.controller.js"; // viene de api/controllers/cafes.controller.js

const route = Router();

route.get("/cafes", controller.getCafes );
route.post("/cafes", controller.agregarCafe );
route.put("/cafes/:id", controller.reemplazarCafe );  
route.patch("/cafes/:id", controller.actualizarCafe );  
route.delete("/cafes/:id", controller.borrarCafe );     

export default route;