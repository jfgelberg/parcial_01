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
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>
    <header class="header header-inicio">
        <div class="contenido-header contenedor">
            <div class="barra">
                <div class="logo">
                    <img src="../img/logo_01.png" class="animate__animated animate__bounce" alt="logo cafeteria">
                </div>
                <div class="texto-header">
                    <h1>Tierra de Café</h1>
                </div>                
                <nav class="nav-principal">
                    <a class="activo" href="index.html">Inicio</a>
                    <a href="nosotros.html">Nosotros</a>
                    <a href="proceso.html">Proceso</a>
                    <a href="menu.html">Menú</a>
                    <a href="galeria.html">Galería</a>
                    <a href="contacto.html">Contacto</a>
                </nav>
            </div>
        </div>
    </header>
    <main >
    <section class="nuestro-menu">
        <h2 class="heading-blanco"><span>Nuestro espectaluar</span>Menú</h2>
        <div class="contenedor grid-menu">
            <section class="menu cafe">
                <h3>Especialidades de Café</h3>
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
            <a href='/' class='btn btn-success text-light text-center w-25 mb-3 ' >volver</a>
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
    `;

    if (cafes.length === 0) {
        html += `
            <tr>
                <td colspan='8' class='text-center'>No hay Cafés</td>
            </tr>
        `;
    } else {
        cafes.forEach(producto => {
            html += `
                <tr>
                    <td>${producto._id}</td>
                    <td><img src="../img/${ producto.img }" alt="${ producto.nombre }" style="width: 100px;"/></td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.preparado}</td>
                    <td>${producto.tamano}</td>
                    <td>${producto.precio}</td>
                </tr>
            `;
        });
    }

    html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return html;
}

