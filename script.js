// ==========================================
// DATOS DE LOS PRODUCTOS
// ==========================================

const productos = {
    "Playera básica": {
        precio: 250,
        imagen: "basica.jpg",
        descripcion: "Playera de algodón cómoda y de buena calidad para uso diario."
    },

    "Pantalón de mezclilla": {
        precio: 500,
        imagen: "mezcliya.jpg",
        descripcion: "Pantalón de mezclilla clásico, cómodo y resistente."
    },

    "Sudadera": {
        precio: 450,
        imagen: "sudaderas.jpg",
        descripcion: "Sudadera cómoda y abrigadora para cualquier ocasión."
    },

    "Tenis deportivos": {
        precio: 1500,
        imagen: "tenis.jpg",
        descripcion: "Tenis deportivos cómodos para uso diario."
    }
};


// ==========================================
// VARIABLES
// ==========================================

let productoSeleccionado = "Playera básica";
let carrito = [];


// ==========================================
// ELEMENTOS HTML
// ==========================================

const buscador = document.getElementById("buscador");
const contadorCarrito = document.getElementById("contadorCarrito");

const detalleTitulo = document.getElementById("detalleTitulo");
const detallePrecio = document.getElementById("detallePrecio");
const detalleDescripcion = document.getElementById("detalleDescripcion");
const imagenDetalle = document.getElementById("imagenDetalle");

const color = document.getElementById("color");
const talla = document.getElementById("talla");

const agregarCarrito = document.getElementById("agregarCarrito");

const listaCarrito = document.getElementById("listaCarrito");

const subtotalElemento = document.getElementById("subtotal");
const envioElemento = document.getElementById("envio");
const totalElemento = document.getElementById("total");

const procederPago = document.getElementById("procederPago");


// ==========================================
// SELECCIONAR PRODUCTO
// ==========================================

document.querySelectorAll(".verProducto").forEach(boton => {

    boton.addEventListener("click", () => {

        const nombre = boton.dataset.producto;

        seleccionarProducto(nombre);

    });

});


// ==========================================
// MOSTRAR PRODUCTO SELECCIONADO
// ==========================================

function seleccionarProducto(nombre) {

    const producto = productos[nombre];

    if (!producto) {
        return;
    }

    productoSeleccionado = nombre;

    detalleTitulo.textContent = nombre;

    detallePrecio.textContent =
        "$" + producto.precio;

    detalleDescripcion.textContent =
        producto.descripcion;

    imagenDetalle.src =
        producto.imagen;

    imagenDetalle.alt =
        nombre;

    document.getElementById("detalle").scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// AGREGAR AL CARRITO
// ==========================================

agregarCarrito.addEventListener("click", () => {

    const producto = productos[productoSeleccionado];

    const colorSeleccionado = color.value;
    const tallaSeleccionada = talla.value;

    const productoExistente = carrito.find(item =>
        item.nombre === productoSeleccionado &&
        item.color === colorSeleccionado &&
        item.talla === tallaSeleccionada
    );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            nombre: productoSeleccionado,

            precio: producto.precio,

            imagen: producto.imagen,

            color: colorSeleccionado,

            talla: tallaSeleccionada,

            cantidad: 1

        });

    }

    actualizarCarrito();

    alert(
        productoSeleccionado +
        " fue agregado al carrito."
    );
});


// ==========================================
// ACTUALIZAR CARRITO
// ==========================================

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            "<p>Tu carrito está vacío.</p>";

    } else {

        carrito.forEach((item, indice) => {

            const div = document.createElement("div");

            div.className = "item";

            div.innerHTML = `

                <div class="item-img">
                    <img 
                        src="${item.imagen}"
                        alt="${item.nombre}"
                    >
                </div>

                <div>

                    <h3>${item.nombre}</h3>

                    <p>Color: ${item.color}</p>

                    <p>Talla: ${item.talla}</p>

                    <strong>
                        $${item.precio}
                    </strong>

                    <div class="cantidad">

                        <button 
                            onclick="cambiarCantidad(${indice}, -1)"
                        >
                            -
                        </button>

                        <span>
                            ${item.cantidad}
                        </span>

                        <button 
                            onclick="cambiarCantidad(${indice}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="eliminar"
                        onclick="eliminarProducto(${indice})"
                    >
                        Eliminar
                    </button>

                </div>

                <strong>
                    $${item.precio * item.cantidad}
                </strong>

            `;

            listaCarrito.appendChild(div);

        });

    }

    actualizarTotales();

}


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function cambiarCantidad(indice, cambio) {

    carrito[indice].cantidad += cambio;

    if (carrito[indice].cantidad <= 0) {

        carrito.splice(indice, 1);

    }

    actualizarCarrito();
}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}


// ==========================================
// ACTUALIZAR TOTALES
// ==========================================

function actualizarTotales() {

    let subtotal = 0;

    carrito.forEach(item => {

        subtotal +=
            item.precio * item.cantidad;

    });


    let envio = 0;

    if (subtotal > 0) {

        envio = 100;

    }


    const total =
        subtotal + envio;


    subtotalElemento.textContent =
        "$" + subtotal;

    envioElemento.textContent =
        "$" + envio;

    totalElemento.textContent =
        "$" + total;


    let cantidadTotal = 0;

    carrito.forEach(item => {

        cantidadTotal += item.cantidad;

    });


    contadorCarrito.textContent =
        cantidadTotal;
}


// ==========================================
// BUSCADOR
// ==========================================

buscador.addEventListener("input", () => {

    const texto =
        buscador.value.toLowerCase();

    document.querySelectorAll(".producto").forEach(producto => {

        const nombre =
            producto.dataset.nombre.toLowerCase();

        if (nombre.includes(texto)) {

            producto.style.display = "";

        } else {

            producto.style.display = "none";

        }

    });

});


// ==========================================
// PROCEDER AL PAGO
// ==========================================

procederPago.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío. Agrega un producto antes de continuar."
        );

        return;
    }

    const total =
        totalElemento.textContent;

    alert(
        "Compra preparada correctamente.\n\n" +
        "Total a pagar: " + total +
        "\n\nGracias por tu compra."
    );

});


// ==========================================
// INFORMACIÓN DE ENVÍO
// ==========================================

document.querySelectorAll(".info-box")[0]
.addEventListener("click", () => {

    abrirModal(
        "Información de envío",
        "Realizamos envíos a diferentes lugares de México. El costo de envío mostrado en el carrito es de $100."
    );

});


// ==========================================
// COMPRA SEGURA
// ==========================================

document.querySelectorAll(".info-box")[1]
.addEventListener("click", () => {

    abrirModal(
        "Compra segura",
        "Tu compra está protegida. Puedes revisar tu producto, seleccionar talla y color y consultar el total antes de proceder al pago."
    );

});


// ==========================================
// PAGO SEGURO
// ==========================================

document.querySelectorAll(".info-box")[2]
.addEventListener("click", () => {

    abrirModal(
        "Pago seguro",
        "El sistema muestra el total de tu compra antes de continuar. Selecciona el método de pago disponible al momento de realizar tu compra."
    );

});


// ==========================================
// CREAR VENTANA MODAL
// ==========================================

function crearModal() {

    if (document.getElementById("modalInfo")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "modalInfo";

    modal.className = "modal";

    modal.innerHTML = `

        <div class="modal-contenido">

            <h2 id="modalTitulo"></h2>

            <p id="modalTexto"></p>

            <button 
                class="cerrar-modal"
                id="cerrarModal"
            >
                Cerrar
            </button>

        </div>

    `;

    document.body.appendChild(modal);


    document
        .getElementById("cerrarModal")
        .addEventListener("click", () => {

            modal.style.display = "none";

        });


    modal.addEventListener("click", (evento) => {

        if (evento.target === modal) {

            modal.style.display = "none";

        }

    });
}


// ==========================================
// ABRIR MODAL
// ==========================================

function abrirModal(titulo, texto) {

    crearModal();

    const modal =
        document.getElementById("modalInfo");

    document.getElementById("modalTitulo")
        .textContent = titulo;

    document.getElementById("modalTexto")
        .textContent = texto;

    modal.style.display = "flex";
}


// ==========================================
// INICIAR
// ==========================================

seleccionarProducto("Playera básica");

actualizarCarrito();