import * as service from '../../services/clientes.service.js'; //viene de la global de services/clientes.service.js


function getClientes(req, res) {
  service.getClientes()
    .then((clientes) => res.status(200).json(clientes))
}

function getClienteId(req, res) {
  const id = req.params.id
  service.getClienteId(id)
    .then((cliente) => res.status(200).json(cliente))
}

function agregarCliente(req, res) {
  service.agregarCliente(req.body)
    .then((cliente) => res.status(201).json(cliente))
}

function reemplazarCliente(req, res) {
  const id = req.params.id
  service.modificarCliente(id, req.body)
    .then((cliente) => res.status(201).json(cliente))
}

function actualizarCliente(req, res) {
  const id = req.params.id
  service.actualizarCliente(id, req.body)
  if (cliente) {
    res.status(201).json(cliente)
  }
  else {
    res.status(404).json({ mensaje: { message: "No se encuentra la cliente" } })
  }
}


function borrarCliente(req, res) {
  const id = req.params.id
  service.eliminarCliente(id)
    .then( (id) => res.status(202).json({ id: id }) )
}


export {
  getClientes,
  getClienteId,
  agregarCliente,
  reemplazarCliente,
  actualizarCliente,
  borrarCliente
}