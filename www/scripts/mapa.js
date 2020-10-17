document.addEventListener('deviceready', onDeviceReady, false);
let leyendas = null;
let lugares = null;
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    var elem = document.getElementById('divContainerMapa');

    var panzoom = Panzoom(elem, {
        maxScale: 9,
        minScale: 3,
        step: 0.4,
        startScale: 3,
        startX: 7.333333333333334,
        startY: 83.55557250976562
    });
    peticiones();
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

    //controles de zoom en el mapa
    $("#buttonZoom").click(function () {
        panzoom.zoom(panzoom.getScale() + 0.5);
    });

    $("#buttonUnzoom").click(function () {
        panzoom.zoom(panzoom.getScale() - 0.5);
    });

    if (device.platform.toLowerCase == 'browser') {
        //litener de clicks del título de modal de leyendas
        document.getElementById('tituloModalLeyendas').addEventListener('click', (e) => {
            closeLeyendas();
        });
    } else {
        //listener del botón de atrás
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
    
    if (device.platform === "Android") {
        //petición para los datos de leyendas
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
        //peticion para las coordenadas de íconos
        $.ajax({
            type: "POST",
            url: "scripts/lugares.json",
            data: {},
            cache: false,
            success: function (data) {
                var array = JSON.parse(data);
                lugares = array.lugares;
                colocarLugaresEnMapa();
            },
            error: function () {
                console.log("¡¡NO SE PUDO OBTENER LOS DATOS DE LOS LUGARES DEL MAPA!!");
            }
        })
    }
    else {
        //petición para los datos de leyendas
        fetch('scripts/leyendas.json')
            .then((response) => response.json())
            .then(function (array) {
                leyendas = array.leyendas;
            })
        //peticion de iconos
        fetch('scripts/lugares.json')
            .then((response) => response.json())
            .then(function (array) {
                lugares = array.lugares;
                colocarLugaresEnMapa();
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

function colocarLugaresEnMapa() {
    lugares.forEach(lugar => {
        //íconos del mapa
        let icono = document.createElement('img');
        icono.classList.add('mapIcon');
        icono.id = lugar.nombre;
        icono.src = lugar.icono;
        icono.style.position = "absolute";
        icono.style.top = ((lugar.coordY / 100) * $("#divContainerMapa").height()) + 'px';
        icono.style.left = ((lugar.coordX / 100) * $("#divContainerMapa").width()) + 'px';
        icono.style.width = ((0.4 / 100) * $("#divContainerMapa").width()) + "%";
        icono.style.zIndex = '100';
        document.getElementById('divContainerMapa').appendChild(icono);

        //nombres íconos
        /*  let spanIcono = document.createElement('span');
         spanIcono.classList.add('spanIcon');
         spanIcono.style.position = "absolute";
         spanIcono.style.top = ((lugar.coordY / 100) * $("#divContainerMapa").height()) + 'px';
         spanIcono.style.left = ((lugar.coordX / 100) * $("#divContainerMapa").width()) + 'px';
         spanIcono.style.width = + ((0.4 / 100) * $("#divContainerMapa").width()) + "%";
         spanIcono.style.zIndex = '101';
         spanIcono.innerHTML = lugar.nombre;
         document.getElementById('divContainerMapa').appendChild(spanIcono);
         console.log(((lugar.coordY / 100) * $("#divContainerMapa").height()));
         console.log(((lugar.coordX / 100) * $("#divContainerMapa").width())); */
    });
}