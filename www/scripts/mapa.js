document.addEventListener('deviceready', onDeviceReady, false);
let leyendas = null;
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    
    peticiones()
    //mostrar todo cuando cordova esté listo
    document.getElementById('divBody').style.display = "";

    //listener de clicks de los enlances del navbar
    document.getElementById('navbarHome').addEventListener('click',(e)=>{
        window.location = "index.html";
    });
    document.getElementById('navbarMapa').addEventListener('click',(e)=>{
        window.location = "mapa.html";
    });

    //listener de clicks del botón de leyendas
    document.getElementById('buttonOpenLeyendas').addEventListener('click',(e)=>{
        abrirLeyendas();
    });
    if (device.platform.toLowerCase == 'browser') {
        //litener de clicks del título de modal de leyendas
        document.getElementById('tituloModalLeyendas').addEventListener('click', (e) => {
            closeLeyendas();
        });
    } else {
        document.addEventListener("backbutton", onBackKeyDown, false);

        function onBackKeyDown() {
            // Handle the back button
            if($("#divLeyendas").css("display") != "none"){
                closeLeyendas();
            }
        }
    }
    
}

//esta función se encargará de hacer las peticiones una sola vez y luego
//almacenar los resultados en variables para mayor velocidad y poder
function peticiones() {
    //petición para los datos de leyendas
    if (device.platform === "Android") {
        $.ajax({
            type: "POST",
            url: "scripts/leyendas.json",
            data: {},
            cache: false,
            success: function (data) {
                let array = JSON.parse(data);
                leyendas = array.leyendas;
            },
            error: function () {
                console.log("¡¡NO SE PUDO OBTENER LOS DATOS DEL MODAL DE LEYENDAS!!");
            }
        })
    }
    else {
        fetch('scripts/leyendas.json')
            .then((response) => response.json())
            .then(function (array) {
                leyendas = array.leyendas;
            })

    }
}

function abrirLeyendas() {
    //limpiar el modal antes de colocar los datos de leyenda
    $("#modalLeyendasCuerpo").empty();
    //colocar dinámicamente las leyendas en el modal
    for (let index = 0; index < leyendas.length; index++) {
        $("#modalLeyendasCuerpo").append("<div class='modalLeyendasRow'> <img class='modalLeyendasRowIcon' src='" + leyendas[index].rutaIcono + "'> <p> <b>" + leyendas[index].Nombre + ": </b>" + leyendas[index].Descripcion + "</p> </div>");
    }
    $("#divLeyendas").slideDown();
}

function closeLeyendas() {
    $("#divLeyendas").slideUp();
}