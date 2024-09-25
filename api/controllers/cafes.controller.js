import * as service from '../../services/cafes.service.js'; //viene de la global de services/cafes.service.js


function getCafes(req, res) {
  service.getCafes()
    .then((cafes) => res.status(200).json(cafes))
}

function agregarCafe(req, res) {
  service.agregarCafe(req.body)
    .then((cafe) => res.status(201).json(cafe))
}

function reemplazarCafe(req, res) {
  const id = req.params.id
  service.modificarCafe(id, req.body)
    .then((cafe) => res.status(201).json(cafe))
}

function actualizarCafe(req, res) {
  const id = req.params.id
  service.actualizarCafe(id, req.body)
  if (cafe) {
    res.status(201).json(cafe)
  }
  else {
    res.status(404).json({ mensaje: { message: "No se encuentra la cafe" } })
  }
}


function borrarCafe(req, res) {
  const id = req.params.id
  service.eliminarCafe(id)
    .then( (id) => res.status(202).json({ id: id }) )
}


export {
  getCafes,
  agregarCafe,
  reemplazarCafe,
  actualizarCafe,
  borrarCafe
}