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
         <h3><strong>${nombre} ${apellidos}</strong></h3>
         <p><strong>Correo:</strong> ${correo}</p>
         <p><strong>Coleccion:</strong></p>
         <ul>
            ${coleccion && coleccion.length > 0 ? coleccion.map(libro => `<li>${libro}</li>`).join('') : 'No hay libros en la colección'}
         </ul>
         <p><strong>Wishlist:</strong></p>
         <ul>
            ${wishlist && wishlist.length > 0 ? wishlist.map(libro => `<li>${libro}</li>`).join('') : 'No hay libros en la wishlist'}
         </ul>
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
     colectionDiv.innerHTML = `<h3><strong>Colección de libros de ${data.nombre}</strong></h3>`;
     
     coleccion.forEach(libro => {
      colectionDiv.innerHTML += `
         <div class="book-card">
           <h4><strong>${libro.titulo}</strong></h4>
           <img src="${libro.imagen}" alt="${libro.titulo}">
           <p><strong>Autor:</strong> ${libro.autor}</p>
           <p><strong>Fecha de Publicación:</strong> ${libro.fechaPublicacion}</p>
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
         <p><strong>Autor:</strong> ${autor}</p>
         <p><strong>Fecha de Publicacion:</strong> ${fechaPublicacion}</p>
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
