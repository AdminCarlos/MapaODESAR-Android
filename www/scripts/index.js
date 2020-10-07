var elem = document.getElementById('divContainerMapa');

var panzoom = Panzoom(elem, {
    maxScale: 10,
    minScale: 3,
    step: 0.3,
    startScale: 3,
    startX: 7.333333333333334,
    startY: 83.55557250976562
});

$("#divContainerMapa").width($("#imgMapa").width());
$("#divContainerMapa").height($("#imgMapa").height());


var oldScale = panzoom.getScale();

console.log("Current pan position X: " + panzoom.getPan().x);
console.log("Current pan position Y: " + panzoom.getPan().y);

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        // document.getElementById("buttonScan").addEventListener("click", scanToVerify);
        setControls();

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.


    };

    function onResume() {

    };

    function setControls() {

        showInicio();

        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown(e) {
            e.preventDefault();

            if ($("#paginaInicio").css("display") != "none") {

                console.log("Adios");
                navigator.app.exitApp();

            }

            else if ($("#paginaMapa").css("display") != "none" && $("#divLeyendas").css("display") === "none" && $("#divDescripcion").css("display") === "none") {

                showInicio();

            }

            else if ($("#divLeyendas").css("display") != "none" || $("#divDescripcion").css("display") != "none") {

                closeLeyendas();
                closeDescription();

            }
        }

        elem.addEventListener('panzoomzoom', (event) => {

            console.log("Panzoom Scale Level: " + panzoom.getScale());

            /* if (panzoom.getScale() >= 5 && panzoom.getScale() <= 7) {

                $("#imgMapa").attr("src", "img/mapahdpi.png");
                console.log("Mapa HDPI loaded!");

            }

            else if (panzoom.getScale() >= 3 && panzoom.getScale() <= 5) {

                $("#imgMapa").attr("src", "img/mapamdpi.png");
                console.log("Mapa MDPI loaded!");

            }

            else {

                $("#imgMapa").attr("src", "img/mapaldpi.png");
                console.log("Mapa LDPI loaded!");
            } */


        });

        elem.addEventListener('panzoompan', (event) => {

            console.log(event.detail) // => { x: 0, y: 0, scale: 1 }

        });

        $(document).on("click", ".mapIcon", function () {

            openDescripcion();

        });

        putElementsOnMap();

        $("#buttonGoToMap").click(function () {

            showMapa();

        });


        $("#buttonOpenLeyendas").click(function () {

            openLeyendas();

        });

        $("#buttonZoom").click(function () {

            panzoom.zoomIn();

        });

        $("#buttonUnzoom").click(function () {

            panzoom.zoomOut();

        });

        $(".divMainUI").click(function () {

            closeLeyendas();
            closeDescription();

        });

    }

    function showMapa() {

        $("#paginaInicio").hide();
        $("#paginaMapa").fadeIn();

    }

    function showInicio() {

        $("#paginaInicio").fadeIn();
        $("#paginaMapa").hide();

    }

    function openLeyendas() {

        if (device.platform === "Android") {

            $.ajax({
                type: "POST",
                url: "scripts/leyendas.json",
                data: {},
                cache: false,
                success: function (data) {

                    var array = JSON.parse(data);

                    $("#modalLeyendasCuerpo").empty();

                    for (var i = 0; i < array.leyendas.length; i++) {

                        $("#modalLeyendasCuerpo").append("<div class='modalLeyendasRow'> <img class='modalLeyendasRowIcon' src='" + array.leyendas[i].rutaIcono + "'> <p> <b>" + array.leyendas[i].Nombre + ": </b>" + array.leyendas[i].Descripcion + "</p> </div>");

                    }

                },
                error: function () {

                    alert("error");

                }
            })

        }

        else {

            fetch('scripts/leyendas.json')
                .then((response) => response.json())
                .then(function (array) {

                    $("#modalLeyendasCuerpo").empty();

                    for (var i = 0; i < array.leyendas.length; i++) {

                        $("#modalLeyendasCuerpo").append("<div class='modalLeyendasRow'> <img class='modalLeyendasRowIcon' src='" + array.leyendas[i].rutaIcono + "'> <p> <b>" + array.leyendas[i].Nombre + ": </b>" + array.leyendas[i].Descripcion + "</p> </div>");

                    }

                })

        }

        $("#divLeyendas").slideDown();

    }

    function closeLeyendas() {

        $("#divLeyendas").slideUp();

    }

    function openDescripcion() {

        $("#divDescripcion").slideDown();

    }

    function closeDescription() {

        $("#divDescripcion").slideUp();

    }

    function putElementsOnMap() {

        if (device.platform === "Android") {

            $.ajax({
                type: "POST",
                url: "scripts/lugares.json",
                data: {},
                cache: false,
                success: function (data) {

                    var array = JSON.parse(data);

                    // for (var i = 0; i < array.lugares.length; i++) {

                    //     $("#divContainerMapa").prepend("<img class='mapIcon' src='" + array.lugares[i].icono + "' style='position: absolute; top: " + ((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()) + "px; left: " + ((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()) + "px; width: " + ((0.4 / 100) * $("#divContainerMapa").width()) + "%; z-index: 100'>");
                    //     $("#divContainerMapa").prepend("<span class='spanIcon' style='position: absolute; top: " + ((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()) + "px; left: " + ((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()) + "px; width: " + ((0.4 / 100) * $("#divContainerMapa").width()) + "%; z-index: 101'>" + array.lugares[i].nombre + "</span>");
                    //     //$("#divContainerMapa").prepend("<div class='mapIconDiv' style='position: absolute; top: " + ((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()) + "px; left: " + ((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()) + "px; width: " + ((0.4 / 100) * $("#divContainerMapa").width()) + "%; height='" + ((0.4 / 100) * $("#divContainerMapa").width()) + "' z-index: 100'><img class='mapIcon' src='" + array.lugares[i].icono + "'> </div>");
                    //     console.log(((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()));
                    //     console.log(((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()));
                    // }
                    parserLugares(array.lugares);


                },
                error: function () {

                    alert("error");

                }
            })

        }

        else {

            fetch('scripts/lugares.json')
                .then((response) => response.json())
                .then(function (array) {
                    parserLugares(array.lugares);
                })

        }

        console.log("Container Width: " + $("#divContainerMapa").width());
        console.log("Container Height: " + $("#divContainerMapa").height());

        console.log("Map Width: " + $("#imgMapa").width());
        console.log("Map Height: " + $("#imgMapa").height());

    }

})();

function parserLugares(jsonLugares){
    jsonLugares.forEach(lugar => {
        //íconos del mapa
        let icono = document.createElement('img');
        icono.classList.add('mapIcon');
        icono.src = lugar.icono;
        icono.style.position = "absolute";
        icono.style.top = ((lugar.coordY / 100) * $("#divContainerMapa").height()) + 'px';
        icono.style.left = ((lugar.coordX / 100) * $("#divContainerMapa").width()) + 'px';
        icono.style.width = + ((0.4 / 100) * $("#divContainerMapa").width()) + "%";
        icono.style.zIndex = '100';
        document.getElementById('divContainerMapa').appendChild(icono);
        
        //nombres íconos
        let spanIcono = document.createElement('span');
        spanIcono.classList.add('spanIcon');
        spanIcono.style.position = "absolute";
        spanIcono.style.top = ((lugar.coordY / 100) * $("#divContainerMapa").height()) + 'px';
        spanIcono.style.left = ((lugar.coordX / 100) * $("#divContainerMapa").width()) + 'px';
        spanIcono.style.width = + ((0.4 / 100) * $("#divContainerMapa").width()) + "%";
        spanIcono.style.zIndex = '101';
        spanIcono.innerHTML = lugar.nombre;
        document.getElementById('divContainerMapa').appendChild(spanIcono);
        console.log(((lugar.coordY / 100) * $("#divContainerMapa").height()));
        console.log(((lugar.coordX / 100) * $("#divContainerMapa").width()));
    });
}