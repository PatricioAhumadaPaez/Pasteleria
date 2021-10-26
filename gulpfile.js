/**
 * Importamos las principales funciones que utilizaremos de gulp:
 * series: nos permite ejecutar varias funciones a la vez, una despues de otra.
 * src: nos permite encontrar archivos según su ubicacion.
 * dest: nos permite porner la ruta en donde se guardaran los archivos que vayamos creando.
 * watch: definimos cuales archivos estaran cambiando y una tarea a realizar cuando estos cambien.
 * 
 * NOTA: estas funciones van entre llaves porque estamos importando algunas de las funciones que nos ofrece gulp.
 */
const { series , src , dest, watch, parallel} = require('gulp');
/**
 * Nos permite compilar sass y convertirlo en un achivo css.
 * 
 * NOTA: No lleva llaves como el anterior porque gulp-sass solo contiene una función.
 */
const sass = require('gulp-sass');
/**
 * Permite minificar imagenes
 */
const imagemin = require('gulp-imagemin');
/**
 * Permite enviar notificaciones. En general, no se utiliza mucho.
 * const notify = require('gulp-notify');
 */

/*
*Permite convertir imagenes a formato webp */
const webp= require('gulp-webp');

/*Permite convertir imagenes a formato avif*/ 
const avif= require('gulp-avif');


//UTILIDADES CSS

/**
 * Permite agregar prefijos a ciertos archivos css.
 */
const autoprefixer = require('autoprefixer');
/**
 * Le agrega procesamiento al css.
 */
const postcss= require('gulp-postcss');
/**
 * Nos da una versión optimizada de css.
 */
const cssnano = require('cssnano');
/**
 * Nos indica en donde esta la referencia de los archivos originales.
 */
 const sourcemaps= require('gulp-sourcemaps');


 //UTILIDAES JAVASCRIPT
 /**
  * Permite compilar varios archivos javascript.
  */
const concat =require('gulp-concat');

const terser = require('gulp-terser-js');
 /**
  * Para renombrar archivos.
  */
const rename = require('gulp-rename');

/**
 * Esta función compila los archivos sass de la carpeta desarrollo y crea un solo archivo en css y lo guarda en la carpeta de producto listo.
 */
function generadorCSS(){ 
    //Se utiliza return para que la función se detenga.
    return src('desarrollo/scss/app.scss') //Busca y lee el archivo de la ubicación dada.
    .pipe(sourcemaps.init())
    .pipe( sass() ) //Compila el archivo
    .pipe( postcss([autoprefixer(), cssnano()] ) ) //Transformamos el css con postcss. La sintaxis de arreglo es para ejecutar las dos tareas (autoprefixer y cssnano).
    .pipe(sourcemaps.write('.')) //Anota las referencias de sass.
    .pipe(dest('./productolisto/css')) //El archivo compilado se guardará en esta ubicación.
    // El punto diagonal (./) significa "la carpeta actual"
}

/*
*Convierte las imagenes de desarrollo en formato webp y las guarda en la carpeta de productolisto
*/
function convertirWebp(){
    return src('desarrollo/img/**/*')
    .pipe( webp() )
    .pipe(dest('./productolisto/img'))
}


function convertirAvif(){
    return src('desarrollo/img/**/*')
    .pipe( avif() )
    .pipe(dest('./productolisto/img'))
}


/*
*Compila todos los archivos de la carpeta desarrollo/js y los junta en un solo archivo que guardara en la carpeta js de productolisto*/
function javascript(){
       //todos los archivos con la extension js
       return src('desarrollo/js/**/*.js')
       .pipe( sourcemaps.init() ) //para saber cual es el archivo 'raiz' en donde se encuentra el elemento
       .pipe( concat('scripts.js')) //el archivo creado se llamará scripts.js
       .pipe( terser() )
       .pipe(sourcemaps.write('.'))
       .pipe(rename({suffix:'.min'}))//le agrega el .min al nombre para saber que el archivo se encuentra minificado
       .pipe(dest('./productolisto/js')) //y se guardará en una carpeta de js en productolisto
   
}

/**
 * Guarda los cambios y actualiza los archivos compilados cuando guardamos nuevos cambios en sass o en javascript en desarrollo.
 */
 function watchArchivos(){
    //Toma el archivo y pide que especifiquemos qué tarea debe ejecutar
    watch('desarrollo/scss/**/*.scss' , generadorCSS);
    watch('desarrollo/js/**/*.js', javascript);
}

/**
 * Default: solamente escribimos 'gulp' en la terminal y se ejecuta esta tarea que, a u vez, cotiene varias tareas.
 */
 exports.default = series(generadorCSS, javascript,convertirWebp, convertirAvif, watchArchivos );


 //COMANDO IMPORTANTE: para detener cualquier función: Ctrl+C