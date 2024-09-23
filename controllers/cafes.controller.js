//cafe.controller.js

import * as cafeService from "../services/cafes.service.js";
import * as cafeView from "../views/cafe.view.js";

const getCafes = (req, res) => {
    cafeService.getCafes()
        .then(productos => {
            res.send(cafeView.crearPagina("Listado de cafes", cafeView.crearListadoCafes(productos)))
        })
}
export { getCafes };
