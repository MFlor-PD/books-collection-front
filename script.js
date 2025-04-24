const loader = document.getElementById('loader');
const section = document.getElementById('info');
const userDiv = document.getElementById('user-div');
const bookDiv = document.getElementById('book-div');
const colectionDiv = document.getElementById('colection');
const messageDiv = document.getElementById('message');

function mostrarMensaje(mensaje, tipo) {
   messageDiv.style.display = 'block';
   messageDiv.textContent = mensaje;
   messageDiv.className = tipo; // 'success' o 'error'
 
   // Ocultar mensaje después de 3 segundos
   setTimeout(() => {
     messageDiv.style.display = 'none';
   }, 3000);
 }
 
async function mostrarUsuarios() {

   try {
      loader.style.display = 'block'; // 🔛 Mostrar loader

      const res = await fetch('http://localhost:3000/users');

      if (!res.ok) throw new Error('Error al cargar usuarios');

      const data = await res.json();

      userDiv.innerHTML = ''; 
      
      data.forEach(({ nombre, apellidos, correo, coleccion, wishlist, id}) => { 
         
         userDiv.innerHTML += `<div class="usercard">
         <h3>${nombre} ${apellidos}</h3>
         <p>Correo: ${correo}</p>
         <p>Email:</p>
         <p>Coleccion:</p>
         <ul>
            ${coleccion && coleccion.length > 0 ? coleccion.map(libro => `<li>${libro}</li>`).join('') : 'No hay libros en la colección'}
         </ul>
         <p>Wishlist:</p>
         <ul>
            ${wishlist && wishlist.length > 0 ? wishlist.map(libro => `<li>${libro}</li>`).join('') : 'No hay libros en la wishlist'}
         </ul>
         <button class="verColeccion" onclick="verColeccion(${id})">Ver Colección</button>
         </div>
         `; 
      });

      mostrarMensaje('Usuarios cargados correctamente', 'success');
      bookDiv.style.display = 'none';
      userDiv.style.display = 'block';

   } catch (error) {
      console.error(error);
      mostrarMensaje('Error al cargar usuarios. Intenta nuevamente.', 'error');
   } finally {
      loader.style.display = 'none'; // 🔚 Ocultar loader pase lo que pase
   }
}

async function verColeccion(userId) {
   try {
     loader.style.display = 'block'; 
 
     const res = await fetch(`http://localhost:3000/users/${userId}`);
 
     if (!res.ok) throw new Error('Error al cargar la colección del usuario');
 
     const data = await res.json();
 
     
     const coleccion = data.coleccion;
     colectionDiv.innerHTML = `<h3>Colección de libros de ${data.nombre}</h3>`;
     
     coleccion.forEach(libro => {
      colectionDiv.innerHTML += `
         <div class="book-card">
           <h4>${libro.titulo}</h4>
           <img src="${libro.imagen}" alt="${libro.titulo}">
           <p>Autor: ${libro.autor}</p>
           <p>Fecha de Publicación: ${libro.fechaPublicacion}</p>
         </div>
       `;
     });
 
     
     userDiv.appendChild(coleccionDiv);
 
     
     mostrarMensaje('Colección cargada correctamente', 'success');
 
   } catch (error) {
     console.error(error);
     
     mostrarMensaje('Error al cargar la colección del usuario. Intenta nuevamente.', 'error');
   } finally {
     loader.style.display = 'none'; 
   }
 }



async function mostrarLibros() {
   try {
      loader.style.display = 'block'; 

      const res = await fetch('http://localhost:3000/books');

      if (!res.ok) throw new Error('Error al cargar libros');

      const data = await res.json();

      bookDiv.innerHTML = ''; 
      
      data.forEach(({ titulo, imagen, autor, fechaPublicacion }) => { 
         
         bookDiv.innerHTML += `
         <div class="book-card">
         <h3>${titulo}</h3>
         <img src='${imagen}' alt='${titulo}'>
         <p>Autor: ${autor}</p>
         <p>Fecha de Publicacion: ${fechaPublicacion}</p>
         </div>
         `;
         
      });

      mostrarMensaje('Libros cargados correctamente', 'success');
      userDiv.style.display = 'none';
      bookDiv.style.display = 'block';

   } catch (error) {
      console.error(error);
      mostrarMensaje('Error al cargar usuarios. Intenta nuevamente.', 'error');
   } finally {
      loader.style.display = 'none'; 
   }
}
