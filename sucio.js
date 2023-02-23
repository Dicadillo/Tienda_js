// Obtener el elemento de entrada de búsqueda
const busquedaInput = document.getElementById('busqueda');
// Obtener el elemento de opciones dinámicas
const opcionesDiv = document.getElementById('opciones');

// Función que se ejecuta cada vez que se modifica el valor de búsqueda
busquedaInput.addEventListener('input', function() {
  // Obtener el valor de búsqueda
  const busqueda = busquedaInput.value;
  // Enviar una solicitud AJAX para obtener los productos que coinciden con la búsqueda
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Procesar la respuesta y actualizar la lista de opciones
      const productos = parseProductosXML(xhr.responseXML);
      actualizarOpciones(productos);
    }
  };
  xhr.open('GET', `productos.xml`);
  xhr.send();
});

// Función que procesa la respuesta XML y retorna un array de objetos producto
function parseProductosXML(xmlDoc) {
  const productos = [];
  const productosXML = xmlDoc.getElementsByTagName('producto');
  for (const productoXML of productosXML) {
    const producto = {
      codigo: productoXML.getAttribute('codigo'),
      descripcion: productoXML.getElementsByTagName('descripcion')[0].textContent,
    };
    productos.push(producto);
  }
  return productos;
}

// Función que actualiza la lista de opciones con los productos obtenidos de la respuesta AJAX
function actualizarOpciones(productos) {
  // Limpiar la lista de opciones
  opcionesDiv.innerHTML = '';
  // Crear un elemento de lista para cada producto que coincida con la búsqueda
  for (const producto of productos) {
    if (producto.codigo.toLowerCase().includes(busquedaInput.value.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busquedaInput.value.toLowerCase())) {
      const li = document.createElement('li');
      li.innerText = `${producto.codigo} - ${producto.descripcion}`;
      // Agregar un evento de clic que seleccione el producto y lo muestre en el campo de búsqueda
      li.addEventListener('click', function() {
        busquedaInput.value = `${producto.codigo} - ${producto.descripcion}`;
        opcionesDiv.innerHTML = '';
      });
      opcionesDiv.appendChild(li);
    }
  }
}
fetch('productos.xml')
.then(response => response.json())
.then(producto => {
    if (producto.stock > 0) {
        console.log('El producto está disponible');
    } else {
        //Si el producto no esta ...
        fetch('productos.xml')
            .then(response => response.json())
            .then(productos => {
                let proParecidos = productos.filter(p => p.codigo === producto.codigo && p.id !== producto.id);
                console.log('No hay stock disponible para este producto. Aquí hay algunos productos similares:');
                proParecidos.map(p => console.log(p.nombre));
            });
    }
});