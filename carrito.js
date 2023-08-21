import { $, $$ } from './utils/dom'

// Variables - Carrito

const productos = $$('#productos li')
const carritoLista = $('#lista-carrito')
const totalProductos = $('#total-products')
const totalElement = $('#total')
const vaciarCarrito = $('#comprar')

// Array - Lista de carritos

let carrito = []

// Función que carga los productos

function actualizarTotalProductos () {
  totalProductos.textContent = carrito.length.toString()
}

function recuperarCarrito () {
  const compraRecuperada = window.localStorage.getItem('carrito')

  if (compraRecuperada) {
    carrito = JSON.parse(compraRecuperada)
    actualizarCarrito()
  }
}

// Guardar la lista de la compra

function guardarLista () {
  window.localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Agregar el producto al carrito

function agregarCarrito (producto) {
  const precioProducto = parseFloat(producto.getAttribute('data-precio'))
  const titleProducto = producto.getAttribute('data-title')
  const imgProducto = producto.getAttribute('data-img')
  const idProducto = producto.getAttribute('data-producto')

  const carritoItem = {
    id: idProducto,
    precio: precioProducto,
    img: imgProducto,
    title: titleProducto
  }

  carrito.push(carritoItem)
  actualizarCarrito()
  guardarLista()
  actualizarTotalProductos()
}

// Actualizar la lista de los productos agregados

function actualizarCarrito () {
  carritoLista.innerHTML = ''
  let total = 0

  carrito.forEach(item => {
    const li = document.createElement('div')
    li.innerHTML = `
    <div class='slider-box'>
      <img 
        src=${item.img}
        alt=${item.id}
        class='slider-img'
      >
      <div class='detail-box'>
        <span class='slider-product-title'>${item.title}</span>
        <span class='slider-price'>$${item.precio.toLocaleString()}</span>
      </div>
    </div>
  `
    carritoLista.appendChild(li)
    total += item.precio
  })

  totalElement.textContent = `Total ${total.toLocaleString()}`
}

// Realizar la compra

function comprarProductos () {
  carrito = []
  actualizarCarrito()
  window.localStorage.removeItem('carrito')

  actualizarTotalProductos()
}

// Recuperación a errores inesperados

recuperarCarrito()
actualizarTotalProductos()

// Agregar productos al carrito

productos.forEach(producto => {
  producto.addEventListener('click', () => {
    agregarCarrito(producto)
  })
})

// Vaciar el carrito

vaciarCarrito.addEventListener('click', () => {
  comprarProductos()
})
