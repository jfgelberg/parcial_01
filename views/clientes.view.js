export function crearPagina(titulo, contenido) {
    let html = `
   <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tierra de Café - ${titulo}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bona+Nova&family=Raleway:wght@700;900&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../../css/estilos.css">
</head>
<body>
    <header class="header header-inicio">
        <div class="contenido-header contenedor">
            <div class="barra">
                <div class="logo">
                    <img src="../../img/logo_01.png" class="animate__animated animate__bounce" alt="logo cafeteria">
                </div>
                <div class="texto-header">
                    <h1>Tierra de Café</h1>
                </div>                
                <nav class="nav-principal">
                    <a class="activo" href="index.html">Inicio</a>
                    <a href="nosotros.html">Nosotros</a>
                    <a href="proceso.html">Proceso</a>
                    <a href="/cafes">Menú</a>
                    <a href="/clientes">Clientes</a>
                </nav>
            </div>
        </div>
    </header>
    <main >
    <section class="nuestro-menu">
        <div class="contenedor grid-menu">
        <h2><span>Lo que dicen nuestros</span>Clientes</h2>
            <section class="nuestros-testimoniales contenedor bg-white margin-negativo-10 rounded rounded-3">
            <h3><span>Comentarios de </span>Clientes</h3>
                <div class="testimonial">
                    ${contenido}
                </div>
            </section>
        </div>
    </section>
    </main>
    <footer class="footer">
        <div class="contenedor contenido-footer bg-white">
            <div class="footer-box ubicacion">
                <h3>Ubicación</h3>
                <p>Avenida Rivadavia 5875</p>
                <p>CABA</p>
            </div>
            <div class="footer-box reserva">
                <h3>Reservas</h3>
                <p>Tel. 3850-9102</p>
                <a href="#">Llamar</a>
            </div>
            <div class="footer-box horario">
                <h3>Horario</h3>
                <p>Lun-Jue: 11:00 - 22:00</p>
                <p>Vie-Sab: 09:00 - 24:00</p>
                <p>Domingo: Cerrado</p>
            </div>
        </div>
        <p class="copyright">Parcial 1 - Javier Gelberg</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
    `
    return html
}

export function crearListadoclientes(clientes) {
    let html = `
    <div class="d-flex align-items-end justify-content-end">
        <a href="/" class="btn btn-success text-light text-center w-25 mb-3 me-3 p-3">Volver</a>
        <a href="/clientes/clienteNuevo" class="btn btn-info text-light text-center w-25 mb-3 p-3">Nuevo Cliente</a>
    </div>

    <!-- Filtros -->
    <div class="container mb-4">
        <div class="row">
            <div class="col-md-6">
                <label for="filtroNombre" class="form-label text-dark">Filtrar por nombre:</label>
                <input type="text" id="filtroNombre" class="form-control p-3" placeholder="Buscar por nombre" />
            </div>
            <div class="col-md-6">
                <label for="filtroResena" class="form-label text-dark">Filtrar por reseña:</label>
                <input type="text" id="filtroResena" class="form-control p-3" placeholder="Buscar por reseña" />
            </div>
        </div>
    </div>

    <!-- Contador de clientes -->
    <div class="container">
        <p id="contadorClientes" class="text-dark fs-4">se encontraron: ${clientes.length} clientes</p>
    </div>

    <!-- Listado de clientes -->
    <div class="container mt-4">
        <div class="row" id="listaClientes">
            ${clientes.length === 0 ? `
                <div class="col-12 text-center">
                    <p>No hay clientes</p>
                </div>
            ` : clientes.map(comentario => `
                <div class="col-md-4 mb-4 cliente" data-nombre="${comentario.nombre.toLowerCase()}" data-resena="${comentario.resena.toLowerCase()}">
                    <div class="card h-100 d-flex flex-column text-center">
                        <img src="../img/clientes/${comentario.img}" class="card-img-top imgClientes" alt="${comentario.nombre}" style="height: 200px; object-fit: cover;">
                        <div class="card-body flex-grow-1 d-flex flex-column">
                            <p class="fs-3 card-title autor"> - ${comentario.nombre} -</p>
                            <p class="card-text comentarioCliente flex-grow-1">${comentario.resena}</p>
                        </div>
                        <!-- Botonera al fondo del card -->
                        <div class="d-flex justify-content-center gap-2 mb-3">
                            <a href="/clientes/${comentario._id}" class="btn btn-sm btn-info p-3 btnCard">Detalle</a>
                            <a href="/clientes/modificar/${comentario._id}" class="btn btn-sm btn-primary p-3 btnCard">Modificar</a>
                            <a href="/clientes/eliminar/${comentario._id}" class="btn btn-sm btn-danger p-3 btnCard">Eliminar</a>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

    <script>
        document.getElementById('filtroNombre').addEventListener('input', filtrarClientes);
        document.getElementById('filtroResena').addEventListener('input', filtrarClientes);

        function filtrarClientes() {
            const filtroNombre = document.getElementById('filtroNombre').value.toLowerCase();
            const filtroResena = document.getElementById('filtroResena').value.toLowerCase();
            const clientes = document.querySelectorAll('.cliente');
            let contador = 0; // Inicializar contador

            clientes.forEach(cliente => {
                const nombre = cliente.getAttribute('data-nombre');
                const resena = cliente.getAttribute('data-resena');

                const coincideNombre = nombre.includes(filtroNombre);
                const coincideResena = resena.includes(filtroResena);

                if (coincideNombre && coincideResena) {
                    cliente.style.display = '';
                    contador++; // Incrementar contador si coincide
                } else {
                    cliente.style.display = 'none';
                }
            });

            // Actualizar el contador en la interfaz
            document.getElementById('contadorClientes').innerText = ' Se encontraron: ' + contador + ' clientes';
        }
    </script>
    `;

    return html;
}

export function crearDetalleCliente(cliente){
    let html = `
        <div class="container">
        <div class="row">
          <div class="col-12">
            <div class='container'>
              <div class='d-flex align-items-end justify-content-end'>
                <a class='btnMenu' href='/clientes'>Atrás</a>
              </div>
              <div class='container'>
                <table class='table table-dark table-striped'>
                  <thead>
                    <tr class="text-center">
                      <th>ID</th>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Reseña</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                        <td style="text-align: center; vertical-align: middle;">${ cliente._id }</td>
                        <td style="width: 15%; text-align: center; vertical-align: middle;">
                            <img src="../img/clientes/${ cliente.img }" alt="imagen de ${ cliente.nombre }" />
                        </td>
                        <td style="text-align: center; vertical-align: middle;" class="autor text-light">${ cliente.nombre }</td>
                        <td style="text-align: center; vertical-align: middle;">${ cliente.resena }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>      
    `
    return html    
}

export function crearNuevoCliente(){
    let html = `
        <div class="container mt-5">
        <h3 class='text-center text-dark'>Agregar un nuevo Cliente</h3>
        <form action='/clientes/clienteNuevo' method='POST' class='w-50 d-block m-auto mb-5'>
            <div class="mb-3">
                <label for="nombre" class="form-label text-dark">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese su nombre" required>
            </div>
            <div class="mb-3">
                <label for="resena" class="form-label text-dark">Reseña</label>
                <textarea class="form-control" id="resena" name="resena" rows="4" placeholder="Breve descripción de la reseña" required></textarea>
            </div>
            <div class="mb-3">
                <label for="img" class="form-label text-dark">Avatar</label>
                <select class="form-select" id="img" name="img" required>
                    <option value="" disabled selected>Seleccione el avatar</option>
                    <option value="clientes_01.png">Imagen 01 </option>
                    <option value="clientes_02.png">Imagen 02 </option>
                    <option value="clientes_03.png">Imagen 03 </option>
                    <option value="clientes_04.png">Imagen 04 </option>
                    <option value="clientes_05.png">Imagen 05 </option>
                    <option value="clientes_06.png">Imagen 06 </option>
                </select>
            </div>
            <div class="mb-3 d-flex gap-2">
                <button type="submit" class="btn btn-lg btn-primary w-50 ">Agregar</button>
                <a class='btn btn-danger btn-lg text-light text-center w-50' href='/clientes' >Cancelar</a>
            </div>
        </form>
    </div>
    `
    return html
}

export function modificarForm(cliente){
    let html = `
        <div class="container mt-5">
    <h3 class='text-center text-dark'>Modificar Datos</h3>
    <form action='/clientes/modificar/${cliente._id}' method='POST' class='w-50 d-block m-auto mb-5'>
        <div class="mb-3">
            <label for="nombre" class="form-label text-dark">Nombre</label>
            <input type="text" class="form-control" id="nombre" name="nombre" value="${cliente.nombre}" required>
        </div>
        <div class="mb-3">
            <label for="resena" class="form-label text-dark">Reseña</label>
            <textarea class="form-control" id="resena" name="resena" rows="4" required>${cliente.resena}</textarea>
        </div>
        <div class="mb-3">
            <label for="img" class="form-label text-dark">Imagen</label>
            <select class="form-select" id="img" name="img" required>
                <option value="" disabled>Seleccione la imagen</option>
                <option value="clientes_01.png" ${cliente.img === "clientes_01.png" ? "selected" : ""}>imagen_01</option>
                <option value="clientes_02.png" ${cliente.img === "clientes_02.png" ? "selected" : ""}>imagen_02</option>
                <option value="clientes_03.png" ${cliente.img === "clientes_03.png" ? "selected" : ""}>imagen_03</option>
                <option value="clientes_04.png" ${cliente.img === "clientes_04.png" ? "selected" : ""}>imagen_04</option>
                <option value="clientes_05.png" ${cliente.img === "clientes_05.png" ? "selected" : ""}>imagen_05</option>
                <option value="clientes_06.png" ${cliente.img === "clientes_06.png" ? "selected" : ""}>imagen_06</option>
            </select>
        </div>
        <div class="mb-3 d-flex gap-2">
            <button type="submit" class="btn btn-lg btn-primary w-50">Modificar</button>
            <a class='btn btn-danger btn-lg text-light text-center w-50' href='/clientes'>Cancelar</a>
        </div>
    </form>
</div>
    `
    return html
}

export function eliminarForm(cliente){
    let html = `
     <div class="container mt-5">
            <form action='/clientes/eliminar/${cliente._id}' method='post' class='w-50 d-block m-auto mb-5'>
                <div class="card bg-danger border border-1 mb-3">
                    <h3 class='text-center text-light'>Se eliminará el Cliente</h3>
                     <div class="m-3">
                        <input type='text' name='descripcion' class="w-100" value="ID: ${cliente._id}" disabled>
                    </div>
                    <div class="m-3">
                        <input type='text' name='nombre' class="w-100" value="cliente: ${cliente.nombre}" disabled>
                    </div>
                </div>
                <div class="mb-3 d-flex gap-2">
                    <button type="submit" class="btnEliminar ">Eliminar</button>
                    <a class='btnMenu' href='/clientes' >Cancelar</a>
                </div>
            </form>
    </div>

    `
    return html
}