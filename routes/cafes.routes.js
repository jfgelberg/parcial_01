//cafe.routes.js

import express from "express"
import * as controllerCafe from "../controllers/cafes.controller.js"

const route = express.Router()
route.get("/cafes", controllerCafe.getCafes)



export default route