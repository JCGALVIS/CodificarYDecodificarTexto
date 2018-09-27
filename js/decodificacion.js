/**
 * @description: Array de datos de codigo de letras y las letras 
 * */
var codigoLetras = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

var arraysNumerosImpares = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27];

/** 
 * @description: Identificando etiquetas de HTML
*/
var txtPalabraAdecodificar = document.getElementById('txtPalabraADecodificar');
var ddlLetraClave = document.getElementById('ddlLetraClave');
var lblResultadoDecodificacion = document.getElementById('lblResultadoDecodificacion');
var lblResultadoDecodificacionCodigo = document.getElementById('lblResultadoDecodificacionCodigo');

/**
 * @description: Carga inicial del documento
 */
$(document).ready(function () {
    cargarValoresLista();
});


/**
 * @description: Cargar valores de lista de select
 */
function cargarValoresLista() {
    var option;

    for (var count = 0; count < codigoLetras.length - 1; count++) {
        option = document.createElement('option');
        option.value = codigoLetras[count];
        option.text = letras[count];

        ddlLetraClave.add(option);
    };
}

/**
 * @description: Codifcar el texto registrado por el usuario
 */
function decodificarTexto() {
    var valorTextoRegistrado = txtPalabraAdecodificar.value.toLowerCase(); //Se convierte el texto en munusculas para evitar inconsistencia con las letras mayusculas

    valorTextoRegistrado = valorTextoRegistrado.replace(',', '.');

    var valorPalabraClave = ddlLetraClave.options[ddlLetraClave.selectedIndex].value;
    var arregloDeCodigoTextoRegistrado;
    var codigoPalabraClave;
    var resultadoDecodificacion;
    var codigoResuelto;

    if (valorTextoRegistrado === "") {
        alert('Debe registrar un código.');
        txtPalabraACodificar
        return;
    };

    if (valorPalabraClave === '-1') {
        alert('Debe seleccionar una palabra clave.');
        return;
    };

    arregloDeCodigoTextoRegistrado = valorTextoRegistrado.split(' - ');
    codigoPalabraClave = parseInt(valorPalabraClave);

    for (var count = 0; count < arregloDeCodigoTextoRegistrado.length; count++) {
        var codigoLetra = parseFloat(arregloDeCodigoTextoRegistrado[count]);
        var codigoLetraCalculado;

        codigoLetraCalculado = (2 * codigoLetra) - codigoPalabraClave;

        //Se valida que si el resultado de la operación de decodificación es igual a cero se asigna el .5
        if (codigoLetraCalculado === 0) {
            codigoLetra = parseFloat(codigoLetra + '.5');
            codigoLetraCalculado = (2 * codigoLetra) - codigoPalabraClave;
        }

        //Se crea para generar posible código de solución
        if (codigoResuelto == undefined) {
            codigoResuelto = codigoLetra;
        }else{
            codigoResuelto = codigoResuelto  + ' - ' + codigoLetra ;
        }
        
        if (resultadoDecodificacion == undefined) {
            codigoLetraCalculado = obtenerLetra(codigoLetraCalculado);
            resultadoDecodificacion = codigoLetraCalculado;
        }
        else {
            codigoLetraCalculado = obtenerLetra(codigoLetraCalculado);
            resultadoDecodificacion = resultadoDecodificacion + '' + codigoLetraCalculado;
        }
    };

    lblResultadoDecodificacionCodigo.innerHTML = codigoResuelto;
    lblResultadoDecodificacion.innerHTML = resultadoDecodificacion;
}

/**
 * @description: Obtener el codigo de las letras.
 * @param {*} codigoLetra: Se recive el codigo encriptado de la letra.
 */
function obtenerLetra(codigoLetra) {
    var codigoLetra;

    for (var count = 0; count < letras.length; count++) {
        if (codigoLetra === codigoLetras[count]) {
            codigoLetra = letras[count];
            break;
        }
    };

    return codigoLetra;
}

/**
 * @description: Reemplaza el caracter de un texto por el configuracio por el control.
 * @param {*} controlAReemplazar: Es this del elemnto que tiene el texto.
 * @param {*} caracterAReemplazar: Es el caracter que tiene el texto que deseamos reemplazar.
 * @param {*} caracterDeReeemplazo: Es el caracter que deseamos utilizar.
 */
function reemplazarCadenaDeTexto(controlAReemplazar, caracterAReemplazar, caracterDeReeemplazo) {
    var cadenaDeTextoAReemplazar;
    var cadenaDeTextoReeplazado;

    cadenaDeTextoAReemplazar = controlAReemplazar.value;

    if (cadenaDeTextoAReemplazar != '') {
        if (!/^[0-9.@-\s]+$/g.test(cadenaDeTextoAReemplazar)) {
            alert('El código no es numerico.');
            return;
        }
    }

    if (/^[0-9\s]+$/g.test(cadenaDeTextoAReemplazar)) {
        cadenaDeTextoReeplazado = cadenaDeTextoAReemplazar.replace(/\s/g, ' - ');
        controlAReemplazar.value = cadenaDeTextoReeplazado;
    }
}