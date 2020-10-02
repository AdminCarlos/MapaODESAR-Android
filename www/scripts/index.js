var elem = document.getElementById('divContainerMapa');

var panzoom = Panzoom(elem, {
    maxScale: 5,
    minScale: 1,
    step: 0.5,
    startScale: 1
});

$("#divContainerMapa").width($("#imgMapa").width());
$("#divContainerMapa").height($("#imgMapa").height());


var oldScale = panzoom.getScale();

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

         elem.addEventListener('panzoomzoom', (event) => {

            console.log("Panzoom Scale Level: " + panzoom.getScale());
        
            if (panzoom.getScale() >= 5 &&  panzoom.getScale() <= 7) {
        
                $("#imgMapa").attr("src", "img/mapahdpi.png");
                console.log("Mapa HDPI loaded!");
        
            }
        
            else if (panzoom.getScale() >= 3 &&  panzoom.getScale() <= 5) {
        
                $("#imgMapa").attr("src", "img/mapamdpi.png");
                console.log("Mapa MDPI loaded!");
        
            }
        
            else {
        
                $("#imgMapa").attr("src", "img/mapaldpi.png");
                console.log("Mapa LDPI loaded!");
            }
        });

        $(document).on("click", ".mapIcon", function() {

            openDescripcion();

        });

        putElementsOnMap();
        
        
        $("#buttonOpenLeyendas").click(function() {

            openLeyendas();

        });

        $("#buttonZoom").click(function() {

            zoom();
            
        });

        $("#buttonUnzoom").click(function() {

            unzoom();

        });

        $(".divMainUI").click(function() {

            closeLeyendas();

        });

    }

    function openLeyendas() {

        if (device.platform === "Android") {

            $.ajax({
                type: "POST",
                url: "/scripts/leyendas.json",
                data: {},
                cache: false,
                success: function (data) {
    
                    var array = JSON.parse(data);
    
                    $("#modalLeyendasCuerpo").empty();
    
                    for(var i = 0; i < array.leyendas.length; i++) {
    
                        $("#modalLeyendasCuerpo").append("<div class='modalLeyendasRow'> <img class='modalLeyendasRowIcon' src='" + array.leyendas[i].rutaIcono + "'> <p>" + array.leyendas[i].Descripcion + "</p> </div>");
    
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
            .then(function(array) {

                $("#modalLeyendasCuerpo").empty();
    
                    for(var i = 0; i < array.leyendas.length; i++) {
    
                        $("#modalLeyendasCuerpo").append("<div class='modalLeyendasRow'> <img class='modalLeyendasRowIcon' src='" + array.leyendas[i].rutaIcono + "'> <p>" + array.leyendas[i].Descripcion + "</p> </div>");
    
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

    function zoom() {

        panzoom.zoom(panzoom.getScale() + 0.5, {animate: true});

    }

    function unzoom() {

        panzoom.zoom(panzoom.getScale() - 0.5, {animate: true});

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
    
                    for(var i = 0; i < array.lugares.length; i++) {
    
                        $("#divContainerMapa").prepend("<img class='mapIcon' src='" + array.lugares[i].icono +"' style='position: absolute; top: " + ((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()) + "px; left: " + ((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()) + "px; width: " + ((0.3 / 100) * $("#divContainerMapa").width()) + "%; z-index: 100'>");
                        console.log(((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()));
                        console.log(((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()));
                    }
    
                },
                error: function () {
    
                    alert("error");
    
                }
            })

        }

        else {

            fetch('scripts/lugares.json')
            .then((response) => response.json())
            .then(function(array) {

                for(var i = 0; i < array.lugares.length; i++) {
    
                    $("#divContainerMapa").prepend("<img class='mapIcon' src='" + array.lugares[i].icono +"' style='position: absolute; top: " + ((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()) + "px; left: " + ((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()) + "px; width: " + ((0.5 / 100) * $("#divContainerMapa").width()) + "%; z-index: 100'>");
                    console.log(((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()));
                    console.log(((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()));
                }

            })

        }
        
    console.log("Container Width: " + $("#divContainerMapa").width());
    console.log("Container Height: " + $("#divContainerMapa").height());

    console.log("Map Width: " + $("#imgMapa").width());
    console.log("Map Height: " + $("#imgMapa").height());

    }

})();