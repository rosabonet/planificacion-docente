if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(function (registration) {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(function (error) {
      console.log('Error al registrar el Service Worker:', error);
    });
}

let editandoIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  const guardadas = JSON.parse(localStorage.getItem("planificaciones")) || [];
  guardadas.forEach((plan, index) => mostrarPlanificacion(plan, index));
});

document.getElementById("planForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;

  const plan = {
    asignatura: form[0].value,
    fecha: form[1].value,
    inicio: form[2].value,
    desarrollo: form[3].value,
    cierre: form[4].value,
    evidencias: form[5].value,
    instrumentos: form[6].value,
    metacognicion: form[7].value,
    recursos: form[8].value
  };

  let planificaciones = JSON.parse(localStorage.getItem("planificaciones")) || [];

  if (editandoIndex !== null) {
    planificaciones[editandoIndex] = plan;
    editandoIndex = null;
  } else {
    planificaciones.push(plan);
  }

  localStorage.setItem("planificaciones", JSON.stringify(planificaciones));
  mostrarTodas();
  form.reset();
});

function mostrarPlanificacion(plan, index) {
  const contenedor = document.getElementById("resultado");
  const div = document.createElement("div");
  div.className = "planificacion";
  div.innerHTML = `
    <strong>Asignatura:</strong> ${plan.asignatura}<br>
    <strong>Fecha:</strong> ${plan.fecha}<br><br>
    <strong>Inicio:</strong> ${plan.inicio}<br>
    <strong>Desarrollo:</strong> ${plan.desarrollo}<br>
    <strong>Cierre:</strong> ${plan.cierre}<br>
    <strong>Evidencias:</strong> ${plan.evidencias}<br>
    <strong>Instrumentos:</strong> ${plan.instrumentos}<br>
    <strong>Metacognición:</strong> ${plan.metacognicion}<br>
    <strong>Recursos:</strong> ${plan.recursos}<br><br>
    <button onclick="editar(${index})">Editar</button>
    <button onclick="eliminar(${index})">Eliminar</button>
  `;
  contenedor.appendChild(div);
}

function mostrarTodas() {
  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = "";
  const planificaciones = JSON.parse(localStorage.getItem("planificaciones")) || [];
  planificaciones.forEach((plan, index) => mostrarPlanificacion(plan, index));
}

function eliminar(index) {
  const planificaciones = JSON.parse(localStorage.getItem("planificaciones")) || [];
  planificaciones.splice(index, 1);
  localStorage.setItem("planificaciones", JSON.stringify(planificaciones));
  mostrarTodas();
}

function editar(index) {
  const planificaciones = JSON.parse(localStorage.getItem("planificaciones")) || [];
  const plan = planificaciones[index];
  const form = document.getElementById("planForm");
  form[0].value = plan.asignatura;
  form[1].value = plan.fecha;
  form[2].value = plan.inicio;
  form[3].value = plan.desarrollo;
  form[4].value = plan.cierre;
  form[5].value = plan.evidencias;
  form[6].value = plan.instrumentos;
  form[7].value = plan.metacognicion;
  form[8].value = plan.recursos;
  editandoIndex = index;
}

function generarPDF() {
  const elemento = document.getElementById("resultado");
  html2pdf().from(elemento).save("planificacion.pdf");
}

