async function obtenerProductos() {
  try {
    const respuesta = await fetch("./productos.json");
    if (!respuesta.ok) throw new Error(`Error al cargar el JSON: ${respuesta.status}`);
    const productos = await respuesta.json();

    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

function mostrarProductos(productos) {
  const contenedorHamburguesas = document.querySelector("#pills-home .row");
  const contenedorPerros = document.querySelector("#pills-profile .row");
  const contenedorArepas = document.querySelector("#pills-contact .row");

  contenedorHamburguesas.innerHTML = "";
  contenedorPerros.innerHTML = "";
  contenedorArepas.innerHTML = "";

  productos.hamburguesas.forEach(h => {
    contenedorHamburguesas.innerHTML += crearCard(h);
  });

  productos.perrosCalientes.forEach(p => {
    contenedorPerros.innerHTML += crearCard(p);
  });

  productos.arepas.forEach(a => {
    contenedorArepas.innerHTML += crearCard(a);
  });
}

function crearCard(producto) {
  return `
    <div class="col">
      <div class="card h-100">
        <img src="${producto.imgURL}" class="card-img-top imagen_fija" alt="${producto.nombre}">
        <div class="card-body text-center">
          <h5 class="card-title fw-bold text-dark">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <h4 class="text-danger fw-bold">$${producto.precio.toLocaleString("es-CO")}</h4>
          <button class="btn btn-dark" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}">
            <i class="bi bi-cart"></i> Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `;
}

obtenerProductos();
