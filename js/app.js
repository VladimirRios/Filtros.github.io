// Variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const precioMin = document.querySelector('#minimo')
const precioMax = document.querySelector('#maximo')
const puertas =  document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')


// Contenedor para los resultados
const resultado = document.querySelector('#resultado')



const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la busqueda
const DatosBusqueda = {
    marca : '',
    year : '',
    precioMin : '',
    precioMax : '',
    puertas : '',
    transmision : '',
    color : ''

}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar


    // Llena las opciones de (años)
    LlenaSelect();
})

// Event listener para los selectores de busqueda
marca.addEventListener('change', e => {
    DatosBusqueda.marca = e.target.value;

    filtrarAuto();
})
year.addEventListener('change', e => {
    DatosBusqueda.year = e.target.value;

    filtrarAuto();
    
})
precioMin.addEventListener('change', e => {
    DatosBusqueda.precioMin = e.target.value;

    filtrarAuto();
})
precioMax.addEventListener('change', e => {
    DatosBusqueda.precioMax = e.target.value;

    filtrarAuto();
})
puertas.addEventListener('change', e => {
    DatosBusqueda.puertas = e.target.value;

    filtrarAuto();
})
transmision.addEventListener('change', e => {
    DatosBusqueda.transmision = e.target.value;

    filtrarAuto();
})
color.addEventListener('change', e => {
    DatosBusqueda.color = e.target.value
    
    filtrarAuto();
})


// Funciones
function mostrarAutos(autos) {

    limpiarHTML();

    autos.forEach( auto => {
        const { marca, modelo, year, precio, puertas, color, transmision} = auto
        const autoHTML = document.createElement('p')

        autoHTML.textContent = `
            ${marca}
            ${modelo} -
            ${year} - Precio
            ${precio} -
            ${puertas} Puertas - Color
            ${color} -
            ${transmision} 
        `;

        // Insertar en el html
        resultado.appendChild(autoHTML)
    })
}

// Limpiar HTML

function limpiarHTML() {
    while(resultado.firstChild) {
       resultado.removeChild(resultado.firstChild) 
    }
}

// Genera los años

function LlenaSelect() {
    for( let i = max; i >= min; i-- ) {
        const opcion = document.createElement('option')
        opcion.value = i;
        opcion.textContent = i
        year.appendChild(opcion); // Agrega las opciones de año al select
    }
}

// Funcion que filtra en base a la busqueda

function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter ( filtrarTransmision ).filter (filtrarColor)

    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();

    const mensaje = document.createElement('div')
    mensaje.classList.add('alerta', 'error')
    mensaje.textContent = 'No hay Resultados, Intenta con otross terminos de busqueda'
    resultado.appendChild(mensaje)
}

function filtrarMarca(auto) {
    const { marca } = DatosBusqueda
    if(marca ) {
        return auto.marca === marca
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = DatosBusqueda
    if( year ) {
        return auto.year === parseInt(year)
    }
    return auto;
}
 
function filtrarMinimo(auto) {
    const {precioMin} = DatosBusqueda
    if( precioMin ) {
        return auto.precio >= precioMin 
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {precioMax} = DatosBusqueda
    if( precioMax ) {
        return auto.precio <= precioMax
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = DatosBusqueda
    if( puertas ) {
        return auto.puertas === parseInt(puertas)
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = DatosBusqueda
    if ( transmision ) {
        return auto.transmision === transmision
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = DatosBusqueda
    if(color) {
        return auto.color === color
    }
    return auto;
}


