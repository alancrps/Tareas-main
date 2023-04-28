import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const formulario = document.querySelector('form');
const tareaInput = document.querySelector('#tarea');
const guardarBtn = document.querySelector('#guardar');
const borrarBtn = document.querySelector('#borrar')
const listaTareas = document.querySelector('#listaTareas');

guardarBtn.addEventListener('click', (event) => {
	event.preventDefault(); //sirve para prevenir que el sitio recargue cada vez que se ejecute este evento
	const tarea = tareaInput.value; //obtenemos el valor del input 
	//obtenemos el valor de la key 'tareas' del localStorage y lo parseamos como un objecto JSON
	//Si no hay un valor para esa clave, se inicializa una lista vacía.
	let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
	//si intentamos guardar una tarea con el input vacio nos saldrá una alerta y terminará ahi (return)
	if(tarea === ""){
		return alert(`La tarea no puede estar vacia`)
	}
	tareas.push(tarea);//Añade el valor de la constante "tarea" al final de la lista de tareas obtenida anteriormente.
	//Convierte la lista actualizada de tareas a formato JSON y la guarda en el localStorage con la clave 'tareas'.
	localStorage.setItem('tareas', JSON.stringify(tareas));
	cargarTareas();
	formulario.reset();
	Toastify({
		text: "Tarea cargada exitosamente",
		className: "info",
		position: "center",
	}).showToast();
});

const cargarTareas = () => {
	listaTareas.innerHTML = '';
	let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
	tareas.forEach((tarea) => {
		const li = document.createElement('li');
		li.textContent = tarea;
		listaTareas.appendChild(li);
	})
}

borrarBtn.addEventListener('click', () => {
	localStorage.removeItem('tareas')
})

window.addEventListener('load', () => {
	cargarTareas();
})

