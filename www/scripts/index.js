var el = document.getElementById("divMainPage");
new PinchZoom.default(el, {});

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
    document.getElementById("closeModalButton").addEventListener('click',Event =>{
        $("#divLeyendas").css("display","none");
    })
var zoomLevel= 100;
var viewportX = document.documentElement.clientWidth;
var viewportY = document.documentElement.clientHeight;

    function setControls() {



        
        $("#buttonOpenLeyendas").click(function() {

            openLeyendas();

        });

        $("#buttonZoom").click(function() {

            
            
        });

        $("#buttonUnzoom").click(function() {

            

        });

    }

    function openLeyendas() {

        $("#divLeyendas").css("display","block");

    }

    

})();