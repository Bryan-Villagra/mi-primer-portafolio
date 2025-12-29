// ==========================================
// 1. SECCIÓN DEL CONTADOR (Mantenla tal cual)
// ==========================================
let cantidadClicks = localStorage.getItem('conteoGuardado') || 0;
const displayNumero = document.getElementById('numero');
const botonSumar = document.getElementById('btn-sumar');
const botonReset = document.getElementById('btn-reset');

if(displayNumero) {
    displayNumero.innerText = cantidadClicks;
    botonSumar.addEventListener('click', () => {
        cantidadClicks++;
        displayNumero.innerText = cantidadClicks;
        localStorage.setItem('conteoGuardado', cantidadClicks);
    });
    botonReset.addEventListener('click', () => {
        cantidadClicks = 0;
        displayNumero.innerText = cantidadClicks;
        localStorage.removeItem('conteoGuardado');
    });
}

// ==========================================
// 2. SECCIÓN DE PROYECTOS DINÁMICOS (Lo nuevo)
// ==========================================

// 2a. Tu "Base de Datos" (Array de objetos)
const misProyectos = [
    { 
        titulo: "Análisis con Python", 
        tecnologia: "Python", 
        descripcion: "Procesamiento de datos universitarios.", 
        color: "var(--color-secundario)" 
    },
    { 
        titulo: "Sistema en C++", 
        tecnologia: "C++", 
        descripcion: "Algoritmos de optimización de memoria.", 
        color: "var(--color-principal)" 
    },
    { 
        titulo: "Dashboard Data Science", 
        tecnologia: "JavaScript", 
        descripcion: "Visualización de estadísticas web.", 
        color: "#3498db" 
    },
    {
        titulo: "Diseños Visuales",
        tecnologia: "Canva",
        descripcion: "Diseños audiovisuales",
        color: "#7b00ffff" 
    },
];

const contenedor = document.getElementById('contenedor-proyectos');
const buscador = document.getElementById('buscador');

// 2b. Función para dibujar los proyectos (Como un 'def' en Python)
function mostrarProyectos(lista) {
    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de dibujar

    lista.forEach(proyecto => {
        const caja = document.createElement('div');
        caja.style.borderLeft = `5px solid ${proyecto.color}`;
        caja.style.padding = "15px";
        caja.style.margin = "15px 0";
        caja.style.background = "white";
        caja.style.borderRadius = "8px";
        caja.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

        caja.innerHTML = `
            <h3 style="margin-top:0; color: var(--color-principal);">${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
            <small>Tecnología: <strong>${proyecto.tecnologia}</strong></small>
        `;
        contenedor.appendChild(caja);
    });
}

// 2c. Lógica del buscador (El filtro)
buscador.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase(); // Convertimos a minúsculas para comparar
    
    // Filtramos el array original
    const filtrados = misProyectos.filter(p => 
        p.tecnologia.toLowerCase().includes(texto) || 
        p.titulo.toLowerCase().includes(texto)
    );
    
    // Llamamos a la función para que dibuje solo los resultados del filtro
    mostrarProyectos(filtrados);
});

// 2d. Ejecución inicial (Para que se vean al abrir la página)
mostrarProyectos(misProyectos);

// Función asíncrona para pedir datos a internet
// --- SECCIÓN DE LA API ---

async function obtenerUsuario() {
    // 1. Buscamos los elementos en el HTML (Cuidado con los IDs)
    const etiquetaNombre = document.getElementById('nombre-api');
    const etiquetaFoto = document.getElementById('foto-api');
    const etiquetaPais = document.getElementById('pais-api');

    try {
        // 2. Pedimos los datos a internet
        const respuesta = await fetch('https://randomuser.me/api/');
        const datos = await respuesta.json();
        
        // 3. AQUÍ SE DEFINE 'persona'. Todo lo que la use debe estar dentro del try
        const persona = datos.results[0];

        // 4. Llenamos los datos en el HTML
        if (etiquetaNombre) {
            etiquetaNombre.innerText = `${persona.name.first} ${persona.name.last}`;
        }
        
        if (etiquetaFoto) {
            etiquetaFoto.src = persona.picture.large;
            
            // Lógica de colores según género
            if (persona.gender === "female") {
                etiquetaFoto.style.border = "5px solid hotpink";
            } else {
                etiquetaFoto.style.border = "5px solid dodgerblue";
            }
        }

        if (etiquetaPais) {
            etiquetaPais.innerText = `País: ${persona.location.country}`;
            etiquetaPais.style.fontStyle = "normal"; // Le quitamos la cursiva al cargar
        }

        console.log("¡Éxito! Cargamos a:", persona.name.first);

    } catch (error) {
        console.error("Hubo un error real:", error);
    }
}

// 5. Ejecutamos la función
obtenerUsuario();

const btnActualizar = document.getElementById("boton-actualizar");

 if(btnActualizar) {

 btnActualizar.addEventListener('click', () => {
    obtenerUsuario();
 });
}
