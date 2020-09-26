var elem = document.getElementById('divContainerMapa');

var panzoom = Panzoom(elem, {
    maxScale: 7
});
panzoom.zoom(5, {animate: true});

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

        $("#divLeyendas").slideDown();

    }

    function closeLeyendas() {

        $("#divLeyendas").slideUp();

    }

    function zoom() {

        panzoom.zoom(panzoom.getScale() + 1, {animate: true});

    }

    function unzoom() {

        panzoom.zoom(panzoom.getScale() - 1, {animate: true});

    }

})();