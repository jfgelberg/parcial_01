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
        <h2 class="heading-blanco"><span>Nuestro espectaluar</span>Menú</h2>
        <div class="contenedor grid-menu">
            <section class="menu cafe">
                ${contenido}
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

export function crearListadoCafes(cafes) {
    let html = `
        <div class='d-flex align-items-end justify-content-end'>
            <a href='/' class='btn btn-success text-light text-center w-25 mb-3 me-3 p-3' >volver</a>
            <a href='/cafes/cafeNuevo' class='btn btn-info text-light text-center w-25 mb-3 p-3' >Nuevo Café</a>
        </div>

        <!-- Filtros -->
        <div class="container mb-4">
            <div class="row">
                <div class="col-md-4">
                    <label for="filtroNombre" class="form-label text-light">Filtrar por nombre:</label>
                    <input type="text" id="filtroNombre" class="form-control p-3" placeholder="Buscar por nombre" />
                </div>
                <div class="col-md-4">
                    <label for="filtroTamano" class="form-label text-light ">Filtrar por tamaño:</label>
                    <select id="filtroTamano" class="form-select p-3">
                        <option value="">Todos los tamaños</option>
                        <option value="chico">Chico</option>
                        <option value="mediano">Mediano</option>
                        <option value="grande">Grande</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="filtroPreparado" class="form-label text-light ">Filtrar por preparado:</label>
                    <select id="filtroPreparado" class="form-select p-3">
                        <option value="">Todos los preparados</option>
                        <option value="frio">Frío</option>
                        <option value="caliente">Caliente</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Tabla de cafés -->
        <div class='container'>
            <table class='table table-dark table-striped'>
                <thead class="text-center">
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Preparado</th>
                        <th>Tamaño</th>
                        <th>Precio</th>
                        <th>Detalles</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody id="tablaCafes">
    `;

    if (cafes.length === 0) {
        html += `
            <tr>
                <td colspan='10' class='text-center'>No hay Cafés</td>
            </tr>
        `;
    } else {
        cafes.forEach(producto => {
            html += `
                <tr data-nombre="${producto.nombre.toLowerCase()}" data-tamano="${producto.tamano}" data-preparado="${producto.preparado}">
                <div class="text-light my-3" id="resultadoFiltro"></div>
                    <td>${producto._id}</td>
                    <td><img src="../img/${ producto.img }" alt="${ producto.nombre }" style="width: 100px;"/></td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.preparado}</td>
                    <td>${producto.tamano}</td>
                    <td class="text-center" style="width: 10%">$ ${producto.precio},00</td>
                    <td class="text-center"> <a href='/cafes/${producto._id}' class='btn btn-sm btn-info p-2 m-2' style='width: 100px'>Detalle</a> </td>
                    <td class="text-center"> <a href='/cafes/modificar/${producto._id}' class='btn btn-sm btn-primary p-2 m-2' style='width: 100px'>Modificar</a> </td>
                    <td class="text-center"> <a href='/cafes/eliminar/${producto._id}' class='btn btn-sm btn-danger p-2 m-2 borrar' style='width: 100px'>X</a> </td>
                </tr>
            `;
        });
    }

    html += `
                </tbody>
            </table>
            
    `;

    // Funcionalidad de filtrado
    html += `
        <script>
            document.getElementById('filtroNombre').addEventListener('input', filtrarCafes);
            document.getElementById('filtroTamano').addEventListener('change', filtrarCafes);
            document.getElementById('filtroPreparado').addEventListener('change', filtrarCafes);

            function filtrarCafes() {
                const filtroNombre = document.getElementById('filtroNombre').value.toLowerCase();
                const filtroTamano = document.getElementById('filtroTamano').value;
                const filtroPreparado = document.getElementById('filtroPreparado').value;
                const filas = document.querySelectorAll('#tablaCafes tr');
                let contador = 0;

                filas.forEach(fila => {
                    const nombre = fila.getAttribute('data-nombre');
                    const tamano = fila.getAttribute('data-tamano');
                    const preparado = fila.getAttribute('data-preparado');

                    const coincideNombre = nombre.includes(filtroNombre);
                    const coincideTamano = !filtroTamano || tamano === filtroTamano;
                    const coincidePreparado = !filtroPreparado || preparado === filtroPreparado;

                    if (coincideNombre && coincideTamano && coincidePreparado) {
                        fila.style.display = '';
                        contador++;
                    } else {
                        fila.style.display = 'none';
                    }
                });

                document.getElementById('resultadoFiltro').textContent = \`Cafés encontrados: \${contador}\`;
            }
        </script>
    `;

    return html;
}

export function crearDetalleCafe(cafe){
    let html = `
        <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 class='m-5 text-light text-center'>Detalle del Café</h1>
            <div class='container'>
              <div class='d-flex align-items-end justify-content-end'>
                <a class='btnMenu' href='/cafes'>Atrás</a>
              </div>
              <div class='container'>
                <table class='table table-dark table-striped'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Preparado</th>
                      <th>Tamaño</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${ cafe._id }</td>
                      <td><img src="/img/${ cafe.img }" alt="imagen de ${ cafe.nombre }" style="width: 100px;"/></td>
                      <td>${ cafe.nombre }</td>
                      <td>${ cafe.descripcion }</td>
                      <td>${ cafe.preparado }</td>
                      <td>${ cafe.tamano }</td>
                      <td>${cafe.precio}</td>
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


export function crearNuevoCafe(){
    let html = `
        <div class="container mt-5">
        <h2 class='text-center text-light'>Agregar un nuevo café</h2>
        <form action='/cafes/cafeNuevo' method='POST' class='w-50 d-block m-auto mb-5'>
            <div class="mb-3">
                <label for="nombre" class="form-label text-light">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre del tipo de café" required>
            </div>
            <div class="mb-3">
                <label for="descripcion" class="form-label text-light">Descripción</label>
                <textarea class="form-control" id="descripcion" name="descripcion" rows="4" placeholder="Breve descripción del café" required></textarea>
            </div>
            <div class="mb-3">
                <label for="preparado" class="form-label text-light">Preparado</label>
                <select class="form-select" id="preparado" name="preparado" required>
                    <option value="" disabled selected>Seleccione el preparado</option>
                    <option value="caliente">Caliente</option>
                    <option value="frio">Frío</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="tamano" class="form-label text-light">Tamaño</label>
                <select class="form-select" id="tamano" name="tamano" required>
                    <option value="" disabled selected>Seleccione un tamaño de medida</option>
                    <option value="grande">Grande</option>
                    <option value="mediano">Mediano</option>
                    <option value="chico">Chico</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="img" class="form-label text-light">Imagen</label>
                <select class="form-select" id="img" name="img" required>
                    <option value="" disabled selected>Seleccione el imagen</option>
                    <option value="cafe_03.jpg">Agregar imagen</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="precio" class="form-label text-light">Precio</label>
                <input type="number" class="form-control" id="precio" name="precio" placeholder="Precio del café" required>
            </div>
            <div class="mb-3 d-flex gap-2">
                <button type="submit" class="btn btn-lg btn-primary w-50 ">Agregar</button>
                <a class='btn btn-danger btn-lg text-light text-center w-50' href='/cafes' >Cancelar</a>
            </div>
        </form>
    </div>
    `
    return html
}

export function modificarForm(cafe){
    let html = `
        <div class="container mt-5">
    <h2 class='text-center text-light'>Modificar el café</h2>
    <form action='/cafes/modificar/${cafe._id}' method='POST' class='w-50 d-block m-auto mb-5'>
        <div class="mb-3">
            <label for="nombre" class="form-label text-light">Nombre</label>
            <input type="text" class="form-control" id="nombre" name="nombre" value="${cafe.nombre}" required>
        </div>
        <div class="mb-3">
            <label for="descripcion" class="form-label text-light">Descripción</label>
            <textarea class="form-control" id="descripcion" name="descripcion" rows="4" required>${cafe.descripcion}</textarea>
        </div>
        <div class="mb-3">
            <label for="preparado" class="form-label text-light">Preparado</label>
            <select class="form-select" id="preparado" name="preparado" required>
                <option value="" disabled>Seleccione el preparado</option>
                <option value="caliente" ${cafe.preparado === "caliente" ? "selected" : ""}>Caliente</option>
                <option value="frio" ${cafe.preparado === "frio" ? "selected" : ""}>Frío</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="tamano" class="form-label text-light">Tamaño</label>
            <select class="form-select" id="tamano" name="tamano" required>
                <option value="" disabled>Seleccione un tamaño de medida</option>
                <option value="grande" ${cafe.tamano === "grande" ? "selected" : ""}>Grande</option>
                <option value="mediano" ${cafe.tamano === "mediano" ? "selected" : ""}>Mediano</option>
                <option value="chico" ${cafe.tamano === "chico" ? "selected" : ""}>Chico</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="img" class="form-label text-light">Imagen</label>
            <select class="form-select" id="img" name="img" required>
                <option value="" disabled>Seleccione la imagen</option>
                <option value="cafe_01.jpg" ${cafe.img === "cafe_01.jpg" ? "selected" : ""}>cafe_01.jpg</option>
                <option value="cafe_02.jpg" ${cafe.img === "cafe_02.jpg" ? "selected" : ""}>cafe_02.jpg</option>
                <option value="cafe_03.jpg" ${cafe.img === "cafe_03.jpg" ? "selected" : ""}>cafe_03.jpg</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="precio" class="form-label text-light">Precio</label>
            <input type="number" class="form-control" id="precio" name="precio" value="${cafe.precio}" required>
        </div>
        <div class="mb-3 d-flex gap-2">
            <button type="submit" class="btn btn-lg btn-primary w-50">Modificar</button>
            <a class='btn btn-danger btn-lg text-light text-center w-50' href='/cafes'>Cancelar</a>
        </div>
    </form>
</div>
    `
    return html
}

export function eliminarForm(cafe){
    let html = `
     <div class="container mt-5">
        <h2 class='text-center'>Usted va a eliminar este cafe</h2>
            <form action='/cafes/eliminar/${cafe._id}' method='post' class='w-50 d-block m-auto mb-5'>
                <div class="card bg-danger border border-1 mb-3">
                    <h3 class='text-center text-light'>Se eliminará el siguiente café</h3>
                     <div class="m-3">
                        <input type='text' name='descripcion' class="w-50" value="ID: ${cafe._id}" disabled>
                    </div>
                    <div class="m-3">
                        <input type='text' name='nombre' class="w-50" value="cafe: ${cafe.nombre}" disabled>
                    </div>
                </div>
                <div class="mb-3 d-flex gap-2">
                    <button type="submit" class="btnEliminar ">Eliminar</button>
                    <a class='btnMenu' href='/cafes' >Cancelar</a>
                </div>
            </form>
    </div>

    `
    return html
}