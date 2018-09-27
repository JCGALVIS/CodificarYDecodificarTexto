/**
 * @description: Array de datos de codigo de letras y las letras 
 * */
var codigoLetras = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ']

/** 
 * @description: Identificando etiquetas de HTML
*/
var txtPalabraACodificar = document.getElementById('txtPalabraACodificar');
var ddlLetraClave = document.getElementById('ddlLetraClave');
var lblResultadoCodificacion = document.getElementById('lblResultadoCodificacion');
var lblResultadoCodificacionRedondeado = document.getElementById('lblResultadoCodificacionRedondeado');

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
function codificarTexto() {
    var valorTextoRegistrado = txtPalabraACodificar.value.toLowerCase(); //Se convierte el texto en munusculas para evitar inconsistencia con las letras mayusculas
    var valorPalabraClave = ddlLetraClave.options[ddlLetraClave.selectedIndex].value;
    var arregloDeletrasTextoRegistrado;
    var codigoPalabraClave;
    var resultadoCodificacion;
    var resultadoCodificacionRedondeado;
    var calculoCodigoResultado;

    if(valorTextoRegistrado === ""){
        alert('Debe registrar un texto.');
        return;
    };

    if(valorPalabraClave === '-1'){
        alert('Debe seleccionar una palabra clave.');
        return;
    };

    arregloDeletrasTextoRegistrado = valorTextoRegistrado.split('');
    codigoPalabraClave = parseInt(valorPalabraClave);

    for(var count = 0; count < arregloDeletrasTextoRegistrado.length; count++){
        var codigoLetra;        

        codigoLetra = obtenerCodigoLetra(arregloDeletrasTextoRegistrado[count]);
        calculoCodigoResultado = (codigoLetra + codigoPalabraClave) / 2;

        if(resultadoCodificacion == undefined){            
            resultadoCodificacion = calculoCodigoResultado
            resultadoCodificacionRedondeado = parseInt(calculoCodigoResultado);
            
        }else{
            resultadoCodificacion = resultadoCodificacion + ' - ' + calculoCodigoResultado;
            resultadoCodificacionRedondeado = resultadoCodificacionRedondeado + ' - ' +  parseInt(calculoCodigoResultado);
        }        
    };

    lblResultadoCodificacion.innerHTML = resultadoCodificacion;
    lblResultadoCodificacionRedondeado.innerHTML = resultadoCodificacionRedondeado;
}

/**
 * @description: Obtener el codigo de las letras.
 * @param: letras --> Se recive la letra a que se le quiere obtener el código.
 */
function obtenerCodigoLetra(letra){
    var codigoLetra;

    for(var count = 0; count < codigoLetras.length; count++){
        if(letra === letras[count]){
            codigoLetra = codigoLetras[count];
            break;
        }
    };

    return codigoLetra;
}