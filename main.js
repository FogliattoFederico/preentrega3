class productos{
    constructor(opcion, tipoArticulo, nombre, cantidad, precio, imagen ){
        this.opcion = opcion
        this.tipoArticulo = tipoArticulo
        this.nombre = nombre
        this.cantidad = cantidad
        this.precio = precio
        this.imagen = imagen
        this.comprar = function(cantidadSeleccionada) {
                if(articuloSeleccionado == 1){
                    return producto1.cantidad = producto1.cantidad - cantidadSeleccionada
                }else if(articuloSeleccionado == 2){
                    return producto2.cantidad = producto2.cantidad - cantidadSeleccionada
                }else if(articuloSeleccionado == 3){
                    return producto3.cantidad = producto3.cantidad - cantidadSeleccionada
                }else if(articuloSeleccionado == 4){
                    return producto4.cantidad = producto4.cantidad - cantidadSeleccionada
                }else if(articuloSeleccionado == 5){
                    return producto5.cantidad = producto5.cantidad - cantidadSeleccionada
                }else if(articuloSeleccionado == 6){
                    return producto6.cantidad = producto6.cantidad - cantidadSeleccionada
                }
        }
      
    }
}

function validarSoloNumeros(n){
    const regex =  /^[0-9]+$/;
    return regex.test(n)
}

async function CargarProductos() {
    let listaProductosJson = await fetch("apiProductos.json")
    let listaProductosJs = await listaProductosJson.json()

    const productos = document.getElementById("productos")
    listaProductosJs.forEach(producto => {
        productos.innerHTML += `<div class="card" style="width: 18rem; height:27rem;">
        <img src="${producto.Imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title" style="text-align: center">${producto.Nombre}</h5>
          <p class="card-text" style="text-align: center">$${producto.Precio}</p>
        </div>
        </div>`
    });
}
CargarProductos()

const producto1 = new productos(1, "Consola de video juegos", "Playstation 5", 10, 500, "./img/ps5.jpeg")
const producto2 = new productos(2, "Consola de video juegos", "Xbox series x", 10, 500, "./img/sx.jpeg")
const producto3 = new productos(3, "Televisor", "Lg Oled C2", 10, 600, "./img/lgOled.jpeg")
const producto4 = new productos(4, "Televisor", "Sony A8G Oled", 10, 600, "./img/tvsony.jpeg")
const producto5 = new productos(5, "Notebook", "Lenovo Legion 7", 10, 450, "./img/legion.jpeg")
const producto6 = new productos(6, "Notebook", "Asus Rog Strix G15", 10, 450, "./img/asus.jpeg")


const carrito = []
let totalCarrito = 0
let articuloSeleccionado
let cantidadSeleccionada


articuloSeleccionado = Number(prompt("Seleccione el articulo que desea comprar \n 1.Playstation 5 \n 2.Xbox Series X \n 3.TV Lg Oled C2 \n 4.TV Sony A8G Oled \n 5.Notebook Lenovo Legion 7 \n 6.Notebook Asus Rog Strix G15 \n \n 0 para salir"))

while(articuloSeleccionado < 0 || articuloSeleccionado > 6 || validarSoloNumeros(articuloSeleccionado) == false) {
    if(validarSoloNumeros(articuloSeleccionado) == false){
        alert("Debe ingresar solo numeros")
    }else if(articuloSeleccionado < 0 || articuloSeleccionado > 6){
        alert("Debe ingresar un numero valido")
    }
    
    articuloSeleccionado = Number(prompt("Seleccione el articulo que desea comprar \n 1.Playstation 5 \n 2.Xbox Series X \n 3.TV Lg Oled C2 \n 4.TV Sony A8G Oled \n 5.Notebook Lenovo Legion 7 \n 6.Notebook Asus Rog Strix G15 \n \n 0 para salir"))
}

if (articuloSeleccionado != 0){
    cantidadSeleccionada = prompt("seleccione la cantidad que desea comprar")
    while(cantidadSeleccionada == "" ){
        alert("Debe ingresar un valor")
        cantidadSeleccionada = prompt("seleccione la cantidad que desea comprar")
    }
}

while (articuloSeleccionado != 0) {

    if(articuloSeleccionado == 1){
            if (cantidadSeleccionada <= producto1.cantidad && cantidadSeleccionada > 0){
                carrito.push(producto1)
                producto1.cantidadSeleccionada = cantidadSeleccionada
                producto1.comprar(cantidadSeleccionada)
                producto1.cantidad == 0 ? alert("El producto " + producto1.nombre + " ha sido agregado al carrito exitosamente, no quedan unidades disponibles") : alert("Producto " + producto1.nombre + " ha sido agregado al carrito exitosamente, quedan solo " + producto1.cantidad + " unidades")

            }else if(cantidadSeleccionada > producto1.cantidad){
                alert("La cantidad ingresada es mayor al stock disponible actualmente")
            }else if(validarSoloNumeros(cantidadSeleccionada) == false){
                alert("Debe ingresar solo numeros")
            }else if(cantidadSeleccionada < 1){
                alert("Numero invalido")
            }
    }else if(articuloSeleccionado == 2){
        if (cantidadSeleccionada <= producto2.cantidad && cantidadSeleccionada > 0){
            carrito.push(producto2)
            producto2.cantidadSeleccionada = cantidadSeleccionada
            producto2.comprar(cantidadSeleccionada)
            
            producto2.cantidad == 0 ? alert("El producto " + producto1.nombre + " ha sido agregado al carrito exitosamente, no quedan unidades disponibles") : alert("Producto " + producto2.nombre + " ha sido agregado al carrito exitosamente, quedan solo " + producto2.cantidad + " unidades")
         
        }else if(cantidadSeleccionada > producto2.cantidad){
            alert("La cantidad ingresada es mayor al stock disponible actualmente")
        }else if(validarSoloNumeros(cantidadSeleccionada)== false){
            alert("Debe ingresar solo numeros")
        }else if(cantidadSeleccionada < 1){
            alert("Numero invalido")
        }
    }else if(articuloSeleccionado == 3){
        if (cantidadSeleccionada <= producto3.cantidad && cantidadSeleccionada > 0){
            carrito.push(producto3)
            producto3.cantidadSeleccionada = cantidadSeleccionada
            producto3.comprar(cantidadSeleccionada)
            producto3.cantidad == 0 ? alert("El producto " + producto1.nombre + " ha sido agregado al carrito exitosamente, no quedan unidades disponibles") : alert("Producto " + producto3.nombre + " ha sido agregado al carrito exitosamente, quedan solo " + producto3.cantidad + " unidades")
          
        }else if(cantidadSeleccionada > producto3.cantidad){
            alert("La cantidad ingresada es mayor al stock disponible actualmente")
        }else if(validarSoloNumeros(cantidadSeleccionada) == false){
            alert("Debe ingresar solo numeros")
        }else if(cantidadSeleccionada < 1){
            alert("Numero invalido")
        }
    }else if(articuloSeleccionado == 4){
        if (cantidadSeleccionada <= producto4.cantidad && cantidadSeleccionada > 0){
            carrito.push(producto4)
            producto4.cantidadSeleccionada = cantidadSeleccionada
            producto4.comprar(cantidadSeleccionada)
            producto4.cantidad == 0 ? alert("El producto " + producto1.nombre + " ha sido agregado al carrito exitosamente, no quedan unidades disponibles") : alert("Producto " + producto4.nombre + " ha sido agregado al carrito exitosamente, quedan solo " + producto4.cantidad + " unidades")
         
        }else if(cantidadSeleccionada > producto4.cantidad){
            alert("La cantidad ingresada es mayor al stock disponible actualmente")
        }else if(validarSoloNumeros(cantidadSeleccionada)== false){
            alert("Debe ingresar solo numeros")
        }else if(cantidadSeleccionada < 1){
            alert("Numero invalido")
        }
    }else if(articuloSeleccionado == 5){
        if (cantidadSeleccionada <= producto5.cantidad && cantidadSeleccionada > 0){
            carrito.push(producto5)
            producto5.cantidadSeleccionada = cantidadSeleccionada
            producto5.comprar(cantidadSeleccionada)
            producto5.cantidad == 0 ? alert("El producto " + producto1.nombre + " ha sido agregado al carrito exitosamente, no quedan unidades disponibles") : alert("Producto " + producto5.nombre + " ha sido agregado al carrito exitosamente, quedan solo " + producto5.cantidad + " unidades")
         
                
        }else if(cantidadSeleccionada > producto5.cantidad){
            alert("La cantidad ingresada es mayor al stock disponible actualmente")
        }else if(validarSoloNumeros(cantidadSeleccionada)== false){
            alert("Debe ingresar solo numeros")
        }else if(cantidadSeleccionada < 1){
            alert("Numero invalido")
        }
    }else if(articuloSeleccionado == 6){
        if (cantidadSeleccionada <= producto6.cantidad && cantidadSeleccionada > 0){
            carrito.push(producto6)
            producto6.cantidadSeleccionada = cantidadSeleccionada
            producto6.comprar(cantidadSeleccionada)
            producto6.cantidad == 0 ? alert("El producto " + producto1.nombre + " ha sido agregado al carrito exitosamente, no quedan unidades disponibles") : alert("Producto " + producto6.nombre + " ha sido agregado al carrito exitosamente, quedan solo " + producto6.cantidad + " unidades")
            
                
        }else if(cantidadSeleccionada > producto6.cantidad){
            alert("La cantidad ingresada es mayor al stock disponible actualmente")
        }else if(validarSoloNumeros(cantidadSeleccionada)== false){
            alert("Debe ingresar solo numeros")
        }else if(cantidadSeleccionada < 1){
            alert("Numero invalido")
        }
    }
    
    articuloSeleccionado = Number(prompt("Seleccione el articulo que desea comprar \n 1.Playstation 5 \n 2.Xbox Series X \n 3.TV Lg Oled C2 \n 4.TV Sony A8G Oled \n 5.Notebook Lenovo Legion 7 \n 6.Notebook Asus Rog Strix G15 \n \n 0 para salir"))
    
    while(articuloSeleccionado < 0 || articuloSeleccionado > 6 || validarSoloNumeros(articuloSeleccionado) == false){
        if(validarSoloNumeros(articuloSeleccionado) == false){
            alert("Debe ingresar solo numeros")
        }else if(articuloSeleccionado < 0 || articuloSeleccionado > 6){
            alert("Debe ingresar un numero valido")
        }
        
        articuloSeleccionado = Number(prompt("Seleccione el articulo que desea comprar \n 1.Playstation 5 \n 2.Xbox Series X \n 3.TV Lg Oled C2 \n 4.TV Sony A8G Oled \n 5.Notebook Lenovo Legion 7 \n 6.Notebook Asus Rog Strix G15 \n \n 0 para salir"))
    }
    
    if (articuloSeleccionado != 0){
        cantidadSeleccionada = prompt("seleccione la cantidad que desea comprar")
        while(cantidadSeleccionada === "" ){
            alert("Debe ingresar un valor")
            cantidadSeleccionada = prompt("seleccione la cantidad que desea comprar")
        }
    }
}

localStorage.setItem("carrito", JSON.stringify(carrito))


if (carrito != []){
    let titulo = document.getElementById("titulo")
    titulo.textContent= "Tu carrito contiene los siguientes productos:"
}

for(const producto of carrito){
    let contenedor = document.getElementById("contenedor")
    let main = document.createElement("div")
    main.innerHTML = `<div class="card" style="width: 18rem; height:27rem;">
    <img src="${producto.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title" style="text-align: center">${producto.nombre}</h5>
      <p class="card-text" style="text-align: center">$${producto.precio * producto.cantidadSeleccionada}</p>
    </div>
    </div>`
    contenedor.append(main)
}


let boton = document.createElement("button")
boton.innerText = "Pagar"
boton.className = "btn btn-primary mb-2"
let container = document.getElementById("contenedor-boton")
container.append(boton)

const resultado = carrito.reduce((total, producto) => total + producto.precio * producto.cantidadSeleccionada, 0)
let total = document.getElementById("total")
total.innerHTML = "<h4> TOTAL  $" + resultado + "</h4>"
container.append(total)

boton.addEventListener("click", () => {
    Swal.fire({
        title: 'Desea realizar el pago?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Pagar',
        cancelButtonText: "Cancelar"
    }).then((result) => {
        setTimeout(() =>{
            if (result.isConfirmed) {
                Swal.fire(
                  'El pago se ha realizado exitosamente!',
                )
              }
        }, 2000)
    })
})

