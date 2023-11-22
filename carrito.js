// Esperar a que se cargue y esté listo el DOM del documento HTML para ejecutar todo el código
document.addEventListener('DOMContentLoaded', () => {

// Array de objetos JavaScript con los datos de los productos
  const baseDeDatos = [
    {
      id: 1,
      nombre: 'Chaqueta',
      precio: 99.99,
      imagen: 'img/chaqueta.jpg'
    },
    {
      id: 2,
      nombre: 'Camiseta',
      precio: 19.99,
      imagen: 'img/camiseta.jpg'
    },
    {
      id: 3,
      nombre: 'Pantalón',
      precio: 59.99,
      imagen: 'img/pantalon.jpg'
    },
    {
      id: 4,
      nombre: 'Botas',
      precio: 99.99,
      imagen: 'img/botas.jpg'
    }
  ];

/* Declaración y asignación de variables */
// Declara la variable carrito y la inicializa como un array vacío
let carrito = [];
// Declara una constante llamada divisa y la inicializa con el valor '€'
const divisa = '€';
// Obtiene el primer elemento que cumple con el selector CSS id 'items' y la asigna a la constante DOMitems
const DOMitems = document.querySelector('#items');
// OObtiene el primer elemento que cumple con el selector CSS con el id 'carrito' y la asigna a la constante DOMcarrito
const DOMcarrito = document.querySelector('#carrito');
// Obtiene el primer elemento que cumple con el selector CSS id 'total' y la asigna a la constante DOMtotal
const DOMtotal = document.querySelector('#total');
// Obtiene el primer elemento que cumple con el selector CSS id 'boton-vaciar' y la asigna a la constante DOMbotonVaciar
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
// Asigna el objeto window.localStorage a la constante miLocalStorage, que proporciona acceso al almacenamiento local del navegador
const miLocalStorage = window.localStorage;

/* Función que se encarga de generar y renderizar elementos HTML en la página */
function renderizarProductos() {
  // Itera sobre cada elemento del array baseDeDatos
  baseDeDatos.forEach((info) => {
    // Crea un nuevo elemento <div> y lo almacena en la variable miNodo
    const miNodo = document.createElement('div');
    miNodo.classList.add('card', 'col-sm-4');

    // Crea un nuevo elemento <div> y lo almacena en la variable miNodoCardBody
    const miNodoCardBody = document.createElement('div');
    miNodoCardBody.classList.add('card-body');

    // Crea un nuevo elemento <h5> y lo almacena en la variable miNodoTitle
    const miNodoTitle = document.createElement('h5');
    miNodoTitle.classList.add('card-title');
    // Establece el contenido de texto del elemento miNodoTitle como el valor de info.nombre
    miNodoTitle.textContent = info.nombre;

    // Crea un nuevo elemento <img> y lo almacena en la variable miNodoImagen
    const miNodoImagen = document.createElement('img');
    miNodoImagen.classList.add('img-fluid');
    // Establece el atributo src del elemento miNodoImagen como el valor de info.imagen
    miNodoImagen.setAttribute('src', info.imagen);

    // Crea un nuevo elemento <p> y lo almacena en la variable miNodoPrecio
    const miNodoPrecio = document.createElement('p');
    miNodoPrecio.classList.add('card-text');
    // Establece el contenido de texto del elemento miNodoPrecio como el valor de info.precio concatenado con la variable divisa
    miNodoPrecio.textContent = `${info.precio}${divisa}`;

    // Crea un nuevo elemento <button> y lo almacena en la variable miNodoBoton
    const miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-primary');
    // Establece el contenido de texto del elemento miNodoBoton como '+'
    miNodoBoton.textContent = '+';
    // Establece el atributo marcador del elemento miNodoBoton como el valor de info.id
    miNodoBoton.setAttribute('marcador', info.id);
    // Agrega un evento de escucha de clic al elemento miNodoBoton que llamará a la función anadirProductoAlCarrito
    miNodoBoton.addEventListener('click', anadirProductoAlCarrito);

    // Agrega el elemento miNodoImagen como hijo del elemento miNodoCardBody
    miNodoCardBody.appendChild(miNodoImagen);
    // Agrega el elemento miNodoTitle como hijo del elemento miNodoCardBody
    miNodoCardBody.appendChild(miNodoTitle);
    // Agrega el elemento miNodoPrecio como hijo del elemento miNodoCardBody
    miNodoCardBody.appendChild(miNodoPrecio);
    // Agrega el elemento miNodoBoton como hijo del elemento miNodoCardBody
    miNodoCardBody.appendChild(miNodoBoton);
    // Agrega el elemento miNodoCardBody como hijo del elemento miNodo
    miNodo.appendChild(miNodoCardBody);
    // Agrega el elemento miNodo como hijo del elemento DOMitems
    DOMitems.appendChild(miNodo);
  });
}

/* Función que se encarga de añadir un producto al carrito cuando se hace clic en el botón correspondiente */
function anadirProductoAlCarrito(evento) {
  // Obtiene el valor del atributo 'marcador' del elemento que disparó el evento y lo añade al array carrito
  carrito.push(evento.target.getAttribute('marcador'));

  // Llama a la función renderizarCarrito() para actualizar la visualización del carrito en la página
  renderizarCarrito();

  // Llama a la función guardarCarritoEnLocalStorage() para actualizar los datos del carrito en el almacenamiento local
  guardarCarritoEnLocalStorage();
}

/* Función que se encarga de renderizar los elementos del carrito en la página*/

function renderizarCarrito() {
  // Vacía el contenido HTML del elemento DOMcarrito
  DOMcarrito.textContent = '';

  // Elimina elementos duplicados del array carrito y lo asigna a la variable carritoSinDuplicados
  const carritoSinDuplicados = [...new Set(carrito)];

  // Genera los nodos correspondientes a los elementos del carritoSinDuplicados
  carritoSinDuplicados.forEach((item) => {
    // Obtiene el objeto correspondiente al item de la variable baseDeDatos
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      // Compara las ids y devuelve el objeto que coincide
      return itemBaseDatos.id === parseInt(item);
    });

    // Cuenta el número de veces que se repite el producto en el carrito
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      // Incrementa el contador si las ids coinciden, de lo contrario no hace cambios
      return itemId === item ? (total += 1) : total;
    }, 0);

    // Crea un nuevo elemento <li> y lo almacena en la variable miNodo
    const miNodo = document.createElement('li');
    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
    // Establece el contenido de texto del elemento miNodo con la cantidad, nombre y precio del producto
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

    // Crea un nuevo elemento <button> y lo almacena en la variable miBoton
    const miBoton = document.createElement('button');
    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
    miBoton.textContent = 'X';
    miBoton.style.marginLeft = '1rem';
    // Establece el atributo data-item del elemento miBoton como el valor del item actual
    miBoton.dataset.item = item;
    // Agrega un evento de escucha de clic al elemento miBoton que llamará a la función borrarItemCarrito
    miBoton.addEventListener('click', borrarItemCarrito);

    // Agrega el elemento miBoton como hijo del elemento miNodo
    miNodo.appendChild(miBoton);
    // Agrega el elemento miNodo como hijo del elemento DOMcarrito
    DOMcarrito.appendChild(miNodo);
  });

  // Renderiza el precio total en el HTML, asignando el resultado de la función calcularTotal() al contenido de DOMtotal
  DOMtotal.textContent = calcularTotal();
}

/* Función que se encarga de eliminar un producto del carrito cuando se hace clic en el botón de eliminación correspondiente */
function borrarItemCarrito(evento) {
  // Obtiene el valor del atributo 'data-item' del elemento que disparó el evento y lo almacena en la variable id
  const id = evento.target.dataset.item;

  // Filtra el array carrito para eliminar el producto con la id obtenida anteriormente
  carrito = carrito.filter((carritoId) => {
    // Devuelve true para mantener los elementos distintos a la id, y false para eliminar el elemento con la id
    return carritoId !== id;
  });

  // Vuelve a renderizar el carrito para reflejar los cambios en la página
  renderizarCarrito();

  // Actualiza los datos del carrito en el almacenamiento local
  guardarCarritoEnLocalStorage();
}

/* Función que se encarga de calcular el precio total de todos los productos en el carrito*/
function calcularTotal() {
  // Utiliza el método reduce para iterar sobre el array carrito y calcular el precio total
  return carrito.reduce((total, item) => {
    // Filtra el objeto correspondiente al item del carrito en baseDeDatos
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      // Compara las ids y devuelve el objeto que coincide
      return itemBaseDatos.id === parseInt(item);
    });
    // Suma el precio del producto al total
    return total + miItem[0].precio;
  }, 0).toFixed(2); // Aplica el método toFixed(2) para redondear el resultado a dos decimales
}

/* Función que se encarga de vaciar completamente el carrito de compras */
function vaciarCarrito() {
  // Vacía el array carrito, eliminando todos los productos
  carrito = [];

  // Renderiza el carrito para reflejar los cambios en la página
  renderizarCarrito();

  // Borra todos los datos almacenados en el LocalStorage
  localStorage.clear();
}

/* Función que se encarga de guardar los datos del carrito en el almacenamiento local del navegador */
function guardarCarritoEnLocalStorage() {
  // Convierte el array carrito en una cadena JSON y lo guarda en el almacenamiento local con la clave 'carrito'
  miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

/* Función que se encarga de cargar los datos del carrito desde el almacenamiento local del navegador, en caso de que existan */
function cargarCarritoDeLocalStorage() {
  // Verifica si existe un carrito previamente guardado en el almacenamiento local
  if (miLocalStorage.getItem('carrito') !== null) {
    // Si existe, carga la información del carrito desde el almacenamiento local y asigna los datos al array carrito
    carrito = JSON.parse(miLocalStorage.getItem('carrito'));
  }
}

// Añadir al controlador de eventos: cuando se hace clic en el botón de vaciar carrito, se ejecuta la función vaciarCarrito
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

/* Inicio de la aplicación: se ejecutan las siguientes funciones en el orden correcto */
// Cargar los datos del carrito almacenados en el LocalStorage, si existen
cargarCarritoDeLocalStorage();
// Renderizar los productos en la página
renderizarProductos();
// Renderizar el carrito en la página
renderizarCarrito();
});