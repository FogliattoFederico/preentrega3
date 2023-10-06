class Producto {
    constructor(id, nombre, precio, descripcion, imagen, cantidad) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.imagen = imagen
        this.cantidad = cantidad
    }

    descripcionCarrito() {
        return `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${this.imagen}" class="img-fluid rounded-start" alt="${this.descripcion}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${this.nombre}</h5>
                    <p class="card-text">Cantidad 
                    ${this.cantidad}</p>
                    <p class="card-text">Precio $${this.precio}</p> 
                </div>
                <button id="ep-${this.id}"class="btn_tacho"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" stroke-width="0" fill="currentColor" />
                <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" fill="currentColor" />
              </svg></button
            </div>
        </div>
        </div>`

    }
    descripcionProducto() {
        return `
       <div class="card" style="width: 18rem;">
            <img src="${this.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.nombre}</h5>
              <p class="card-text">${this.descripcion}.</p>
              <p class="card-text">$ ${this.precio}.</p>
              <button class="btn btn-primary" id="ap-${this.id}">Agregar al Carrito</button
            </div>
        </div>`
    }
    anadirCantidad() {
        this.cantidad++
    }
}

class ProductoController {
    constructor() {
        this.listaProductos = []
    }
    async prepararContenedorProductos() {
       let listaProductosJson = await fetch("apiProductos.json")
       let listaProductosJs = await listaProductosJson.json()

        listaProductosJs.forEach(producto =>{
            let nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.descripcion, producto.imagen, producto.cantidad)
            this.agregar(nuevoProducto)
        })
        console.log(listaProductosJs)
        this.mostrarEnDom()

    }
    agregar(producto) {
        if (producto instanceof Producto) {
            this.listaProductos.push(producto)
        }
    }
    mostrarEnDom() {
        const contenedor_productos = document.getElementById("contenedor_productos")
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += producto.descripcionProducto()

        })
        this.listaProductos.forEach(producto => {
            const btn_ap = document.getElementById(`ap-${producto.id}`)
            btn_ap.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarEnDom()
                Toastify({
                    text: "Agregado exitosamente al carrito",
                    duration: 1000
                }).showToast();
            })
        })
    }
}

class Carrito {
    constructor() {
        this.listaCarrito = []
    }
    agregar(producto) {
        const productoExistente = this.listaCarrito.find(productoExistente => productoExistente.id == producto.id)

        if (productoExistente) {
            productoExistente.anadirCantidad()
        } else if (producto instanceof Producto) {
            this.listaCarrito.push(producto)
        }


    }

    guardarEnStorage() {
        let listaCarritoJson = JSON.stringify(this.listaCarrito)
        localStorage.setItem("lista carrito", listaCarritoJson)

    }
    recuperarStorage() {
        if (this.listaCarrito !== 0) {

            let listaCarritoJson = localStorage.getItem("lista carrito")
            let listaCarritoJs = JSON.parse(listaCarritoJson)
            let listaAuxiliar = []
            listaCarritoJs.forEach(producto => {
                let productoNuevo = new Producto(producto.id, producto.nombre, producto.precio, producto.descripcion, producto.imagen, producto.cantidad)
                listaAuxiliar.push(productoNuevo)
            })
            this.listaCarrito = listaAuxiliar
        }
    }
    eliminar(productoAeliminar) {
        let indice = this.listaCarrito.findIndex(producto => producto.id == productoAeliminar.id)

        if (productoAeliminar.cantidad > 1) {
            productoAeliminar.cantidad--

        } else {
            this.listaCarrito.splice(indice, 1)
        }
    }
    mostrarEnDom() {
        let contenedor_carrito = document.getElementById("contenedor_carrito")
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += producto.descripcionCarrito()
        })
        
        this.eventoVaciarCarrito()
        this.eventoEliminarProducto()
        this.eventoPagar()
        this.eventoMostrarTotal()
    }
    eventoVaciarCarrito() {
        const eliminarCarrito = document.getElementById("btn_vaciar")
        eliminarCarrito.addEventListener("click", () => {
            this.mensajeBorrar()
            this.vaciarCarrito()
            this.guardarEnStorage()
            this.mostrarEnDom()
        })
    }
    eventoEliminarProducto() {
        this.listaCarrito.forEach(producto => {
            const btn_eliminar = document.getElementById(`ep-${producto.id}`)

            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto)
                this.guardarEnStorage()
                this.mostrarEnDom()
            })

        })
    }
    eventoPagar() {
        const pagar = document.getElementById("btn_pagar")

        pagar.addEventListener("click", () => {
            this.pagar()
            this.mensajePagar()
            this.vaciarCarrito()
            this.mostrarEnDom()
        })
    }
    eventoMostrarTotal() {
        const total = document.getElementById("total")
        total.innerText = `Total: $ ${carrito.pagar()} `
    }
    vaciarCarrito() {
        this.listaCarrito = []
    }
    pagar() {
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
    }
    mensajeBorrar() {
        Swal.fire({
            title: 'Estas seguro que desear eliminar tu carrito?',
            text: "No habra posibilidad de recuperarlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Borrado!')

            }
        })
    }
    mensajePagar() {
        Swal.fire({
            title: 'Desea confirmar el Pago?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pagar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    Swal.fire(
                        setTimeout(this.cerrarModal, 5000),
                        'Su pago ha sido realizado',
                        'Muchas Gracias')
                }, 2000)
            }
        })
    }
}

const CP = new ProductoController()
const carrito = new Carrito()

carrito.recuperarStorage()
carrito.mostrarEnDom()

CP.prepararContenedorProductos()
CP.cargarProducto()
CP.mostrarEnDom()
