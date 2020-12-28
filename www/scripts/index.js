var elem = document.getElementById('divContainerMapa');

/* var panzoom = Panzoom(elem, {
    maxScale: 15,
    minScale: 1,
    step: 1,
    startScale: 1
}); */

var instance = panzoom(elem, {onTouch: function(e) {
    // `e` - is current touch event.
 
    return false; // tells the library to not preventDefault.
  },
  smoothScroll: true,
  maxZoom: 4,
  minZoom: 0.2,
  initialX: -210.09,
  initialY: 9.40,
  initialZoom: 0.2
});

var zoomLevel = 0.2;

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
                resetMap();

            }

            else if ($("#divLeyendas").css("display") != "none" || $("#divDescripcion").css("display") != "none" || $("#divBuscar").css("display") != "none") {

                closeLeyendas();
                closeDescription();
                closeBuscar();
                //closeFiltrar();

            }
        }

        instance.on("pan", function(e) {

            console.log(instance.getTransform());
            console.log($(".divMapIcon").width());
            console.log($(".divMapIcon").height());

        });

        instance.on("transform", function(e) {

            /* if (instance.getTransform().scale >= 1 || instance.getTransform().scale < 2) {

                console.log("Condicion #1");
                $(".divMapIcon").css("width", "2%");
                $(".divMapIcon").css("height", "4%");

            }

            else if (instance.getTransform().scale >= 1 || instance.getTransform().scale < ) {

                console.log("Condicion #2");
                $(".divMapIcon").css("width", "1.8%");
                $(".divMapIcon").css("height", "3.6%");

            } */

            if (instance.getTransform().scale === 0.2) {

                $(".divMapIcon").css("width", "2%");
                $(".divMapIcon").css("height", "4%");
                $(".spanIcon").hide();
            }

            else if (instance.getTransform().scale > 0.2 && instance.getTransform().scale <= 0.4) {

                $(".divMapIcon").css("width", "1.8%");
                $(".divMapIcon").css("height", "3.6%");
                $(".spanIcon").hide();

            }

            else if (instance.getTransform().scale > 0.4 && instance.getTransform().scale <= 0.6) {

                $(".divMapIcon").css("width", "1.62%");
                $(".divMapIcon").css("height", "3.24%");
                $(".spanIcon").hide();

            }

            else if (instance.getTransform().scale > 0.6 && instance.getTransform().scale <= 0.8) {

                $(".divMapIcon").css("width", "1.458%");
                $(".divMapIcon").css("height", "2.916%");
                $(".spanIcon").hide();

            }

            else if (instance.getTransform().scale > 0.8 && instance.getTransform().scale <= 1) {

                $(".divMapIcon").css("width", "1.3122%");
                $(".divMapIcon").css("height", "2.6244%");
                $(".spanIcon").hide();

            }

            else if (instance.getTransform().scale > 1 && instance.getTransform().scale <= 1.2) {

                $(".divMapIcon").css("width", "1.18098%");
                $(".divMapIcon").css("height", "2.36196%");
                $(".spanIcon").hide();

            }

            else if (instance.getTransform().scale > 1.2 && instance.getTransform().scale <= 1.4) {

                $(".divMapIcon").css("width", "1.062882%");
                $(".divMapIcon").css("height", "2.125764%");
                $(".spanIcon").hide();

            }

            else if (instance.getTransform().scale > 1.4 && instance.getTransform().scale <= 1.6) {

                $(".divMapIcon").css("width", "0.9565938%");
                $(".divMapIcon").css("height", "1.9131876%");
                $(".spanIcon").hide();

            }

            else if (instance.getTransform().scale > 1.6 && instance.getTransform().scale <= 1.8) {

                $(".divMapIcon").css("width", "0.86093442%");
                $(".divMapIcon").css("height", "1.72186884%");
                $(".spanIcon").hide();

            }

            else if (instance.getTransform().scale > 1.8 && instance.getTransform().scale <= 4) {

                $(".divMapIcon").css("width", "0.774840978%");
                $(".divMapIcon").css("height", "1.549681956%");
                $(".spanIcon").show();

            }

            /* else if (instance.getTransform().scale > 5.5 && instance.getTransform().scale <= 15) {

                $(".divMapIcon").css("width", "0.6973568802%");
                $(".divMapIcon").css("height", "1.3947137604%");
                //$(".spanIcon").show();

            } */

        });

        $(document).on("click", ".divMapIcon", function () {

            openDescripcion($(this).attr("id"));

        });

        $("#inputBuscar").on("input", function () {

            buscar($("#inputBuscar").val());

        });

        /* $(".checkboxFiltrar").on("change", function () {

            console.log($(this).attr("id"));

            if ($(this).is(":checked")) {

                filtrar($(this).attr("id"));
                //console.log($(this).attr("id") + " esta chequeado");

            }

            else {

                unfiltrar($(this).attr("id"));
                //console.log($(this).attr("id") + " esta chequeado");

            }

        }); */


        $("#buttonGoToMap").click(function () {

            showMapa();

        });

        $("#buttonSearch").click(function () {

            openBuscar();

        });

        /* $("#buttonFilter").click(function () {

            openFiltrar();

        }); */

        $("#buttonOpenLeyendas").click(function () {

            openLeyendas();

        });

        $("#buttonZoom").click(function () {

            zoomLevel = zoomLevel + 0.1;
            var parentBoundingBox = document.getElementById("paginaMapa").getBoundingClientRect();
            instance.smoothZoomAbs(parentBoundingBox.width / 2, parentBoundingBox.height / 2, zoomLevel);
            
            if (zoomLevel > instance.getMaxZoom()) {

                zoomLevel = instance.getMaxZoom();

            }

        });

        $("#buttonUnzoom").click(function () {

            zoomLevel = zoomLevel - 0.1;
            var parentBoundingBox = document.getElementById("paginaMapa").getBoundingClientRect();
            instance.smoothZoomAbs(parentBoundingBox.width / 2, parentBoundingBox.height / 2, zoomLevel);

            if (zoomLevel < instance.getMinZoom()) {

                zoomLevel = instance.getMinZoom();

            }

        });

        $("#imgLogoMapa").click(function () {

            resetMap();

        });

        $(".divMainUI").click(function () {

            closeLeyendas();
            closeDescription();
            closeBuscar();
            //closeFiltrar();

        });

    }

    function showMapa() {

        $("#paginaInicio").hide();
        $("#paginaMapa").show();
        $("#divContainerMapa").width($("#imgMapa").width());
        $("#divContainerMapa").height($("#imgMapa").height());
        putElementsOnMap();
        console.log(device.platform);
    }

    function showInicio() {

        $("#paginaInicio").show();
        $("#paginaMapa").hide();

    }

    function openLeyendas() {

        if (device.platform === "Android") {

            $.ajax({
                type: "POST",
                dataType: "json",
                url: "scripts/leyendas.json",
                data: {},
                cache: false,
                success: function (data) {

                    var array = data;

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

    function openDescripcion(iconID) {

        
        if (device.platform === "Android") {

            $.ajax({
                type: "POST",
                dataType: "json",
                url: "scripts/lugares.json",
                data: {},
                cache: false,
                success: function (data) {

                    var array = data;
                    setDescription(iconID,array.lugares);
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
                    setDescription(iconID, array.lugares);
                    parserLugares(array.lugares);
                })

        }

        $("#divDescripcion").slideDown();
        //console.log("Nombre del lugar: " + iconID + " Descripcion: " + placeDescription);
    }

    function setDescription(pIconID, pArrayLugares){
        /*for (let i = 0; i < pArrayLugares.length; i++) {

            if (pIconID === pArrayLugares[i].nombre) {

                $("#modalDescripcion .modalCuerpo").html(pArrayLugares[i].descripcion);

            }

        }*/
        let idArray=pIconID.split(" || ");
        $("#modalDescripcion .modalCuerpo").html(pArrayLugares[idArray[1]].descripcion);
        $("#modalDescripcion .modalTitulo span").text(idArray[0]);
    }

    function closeDescription() {

        $("#divDescripcion").slideUp();

    }

    function openBuscar() {

        $("#divBuscar").css("width", "85%");
        $("#inputBuscar").focus();

    }

    function closeBuscar() {

        if ($("#inputBuscar").val() === "") {

            $("#divBuscar").css("width", "0%");
            $("#inputBuscar").blur();

        }

        else {

            $("#inputBuscar").blur();

        }

    }

    /* function openFiltrar() {

        $("#divFiltrar").css("width", "20%");

    }

    function closeFiltrar() {

        $("#divFiltrar").css("width", "0%");

    } */

    function putElementsOnMap() {

        $(".mapIcon").remove();
        
        if (device.platform === "Android") {

            $.ajax({
                type: "POST",
                dataType: "json",
                url: "scripts/lugares.json",
                data: {},
                cache: false,
                success: function (data) {
    
                    /* try {
    
                        array = JSON.parse(data);
    
                    }
    
                    catch(err) {
    
                        array = data;
    
                    } */
    
                    // for (var i = 0; i < array.lugares.length; i++) {
    
                    //     $("#divContainerMapa").prepend("<img class='mapIcon' src='" + array.lugares[i].icono + "' style='position: absolute; top: " + ((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()) + "px; left: " + ((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()) + "px; width: " + ((0.4 / 100) * $("#divContainerMapa").width()) + "%; z-index: 100'>");
                    //     $("#divContainerMapa").prepend("<span class='spanIcon' style='position: absolute; top: " + ((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()) + "px; left: " + ((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()) + "px; width: " + ((0.4 / 100) * $("#divContainerMapa").width()) + "%; z-index: 101'>" + array.lugares[i].nombre + "</span>");
                    //     //$("#divContainerMapa").prepend("<div class='mapIconDiv' style='position: absolute; top: " + ((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()) + "px; left: " + ((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()) + "px; width: " + ((0.4 / 100) * $("#divContainerMapa").width()) + "%; height='" + ((0.4 / 100) * $("#divContainerMapa").width()) + "' z-index: 100'><img class='mapIcon' src='" + array.lugares[i].icono + "'> </div>");
                    //     console.log(((array.lugares[i].coordY / 100) * $("#divContainerMapa").height()));
                    //     console.log(((array.lugares[i].coordX / 100) * $("#divContainerMapa").width()));
                    // }
                    parserLugares(data.lugares);
    
    
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

    function buscar(stringToSearch) {

        $(".divMapIcon").each(function () {

            if ($(this).attr("id").toLowerCase().includes(stringToSearch.toLowerCase())) {

                $(this).css("opacity", "1");
                $(this).css("visibility", "visible");

            }

            else {

                $(this).css("opacity", "0");
                $(this).css("visibility", "hidden");

            }

        });

        /* $(".spanIcon").each(function () {

            if ($(this).attr("id").toLowerCase().includes(stringToSearch.toLowerCase())) {

                $(this).css("opacity", "1");
                $(this).css("visibility", "visible");

            }

            else {

                $(this).css("opacity", "0");
                $(this).css("visibility", "hidden");

            }

        }); */

    }

    /* function filtrar(categoryToFilter) {

        $(".mapIcon").each(function () {

            if ($(this).attr("class").split(" ")[1] != categoryToFilter) {

                $(this).css("opacity", "0");
                $(this).css("visibility", "hidden");

            }

            else {

                $(this).css("opacity", "1");
                $(this).css("visibility", "visible");

            }
        });

    } */

    /* function unfiltrar(categoryToUnfilter) {

        $(".mapIcon").each(function () {

            if ($(this).attr("class").split(" ")[1] != categoryToUnfilter) {

                $(this).css("opacity", "1");
                $(this).css("visibility", "visible");

            }

        });

    } */

})();

function parserLugares(jsonLugares) {
    let contador = 0;
    jsonLugares.forEach(lugar => {

        /* let iconoContainer = document.createElement("div");
        iconoContainer.style.display = "block"
        iconoContainer.classList.add("divContainerIcono");
        iconoContainer.id = lugar.nombre;
        iconoContainer.style.position = "absolute";
        iconoContainer.style.top = ((lugar.coordY / 100) * $("#divContainerMapa").height()) + 'px';
        iconoContainer.style.left = ((lugar.coordX / 100) * $("#divContainerMapa").width()) + 'px';
        iconoContainer.style.width = "2%";
        iconoContainer.style.height = "auto";
        console.log("Container Height: " + iconoContainer.offsetHeight);

        document.getElementById('divContainerMapa').appendChild(iconoContainer); */

        /* let icono = document.createElement('img');
        icono.style.position = "absolute";
        icono.style.top = "0";
        icono.classList.add('mapIcon');
        icono.id = lugar.nombre;
        icono.src = lugar.icono;
        icono.style.width = "100%";
        console.log("Icon height: " + icono.offsetHeight); */

        /* let spanIcono = document.createElement('canvas');
        spanIcono.style.display = "block";
        spanIcono.classList.add('spanIcon');
        let spanIconoCanvas = spanIcono.getContext("2d");
        spanIconoCanvas.font = "100% Arial";
        spanIconoCanvas.textAlign = "center";
        spanIconoCanvas.fillText(lugar.nombre, spanIcono.width / 2, spanIcono.height / 2);
        spanIcono.style.display = "none"
        spanIcono.style.width = "auto";
        spanIcono.style.height = "10px";
        spanIcono.style.zIndex = "1000"; */

        /* iconoContainer.appendChild(icono);
        iconoContainer.appendChild(spanIcono); */


        //íconos del mapa
        /* let icono = document.createElement('img');
        icono.classList.add('mapIcon');
        icono.classList.add(lugar.categoria);
        icono.id = lugar.nombre +' || '+contador;
        icono.src = lugar.icono;
        icono.style.position = "absolute";
        icono.style.top = ((lugar.coordY / 100) * $("#divContainerMapa").height()) + 'px';
        icono.style.left = ((lugar.coordX / 100) * $("#divContainerMapa").width()) + 'px';
        icono.style.width = "2%";
        icono.style.zIndex = '100';
        document.getElementById('divContainerMapa').appendChild(icono);
        console.log("Name: " + lugar.nombre + " Top: " + icono.offsetTop + " Left: " + icono.offsetLeft + " Height: " + icono.offsetWidth); */

        let divIcono = document.createElement("div");
        divIcono.classList.add("divMapIcon");
        divIcono.classList.add(lugar.categoria);
        divIcono.id = lugar.nombre + " || "+contador;
        divIcono.style.position = "absolute";
        divIcono.style.top = ((lugar.coordY / 100) * $("#divContainerMapa").height()) + 'px';
        divIcono.style.left = ((lugar.coordX / 100) * $("#divContainerMapa").width()) + 'px';
        divIcono.style.width = "2%";
        divIcono.style.height = "4%";
        divIcono.style.zIndex = '100';
        divIcono.style.display = "block";
        document.getElementById('divContainerMapa').appendChild(divIcono);

        let icono = document.createElement("img");
        icono.classList.add("mapIcon");
        icono.src = lugar.icono;
        icono.style.width = "100%";
        icono.style.height = "50%";
        divIcono.appendChild(icono);

        let spanIcono = document.createElement("p");
        let node = document.createTextNode(lugar.nombre);
        spanIcono.appendChild(node);
        spanIcono.classList.add('spanIcon');
        spanIcono.id = "span" + lugar.nombre;
        spanIcono.classList.add(lugar.categoria);
        spanIcono.style.width = "100%";
        spanIcono.style.zIndex = '99';
        spanIcono.style.textAlign = "center";
        spanIcono.style.verticalAlign = "middle";
        spanIcono.style.fontSize = "0.001px";
        spanIcono.style.marginLeft = "auto";
        spanIcono.style.marginRight = "auto";
        spanIcono.style.paddingTop = "5px";
        spanIcono.style.paddingBottom = "5px";
        spanIcono.style.paddingLeft = "2px";
        spanIcono.style.paddingRight = "2px";
        spanIcono.style.display = "none";
        divIcono.appendChild(spanIcono);

        console.log("Name: " + lugar.nombre + " Top: " + divIcono.offsetTop + " Left: " + divIcono.offsetLeft + " Width: " + divIcono.offsetWidth + " Height: " + divIcono.offsetHeight);

        //nombres íconos
        /* let spanIcono = document.createElement('canvas');
        spanIcono.classList.add('spanIcon');
        spanIcono.id = "span" + lugar.nombre;
        spanIcono.classList.add(lugar.categoria);
        let spanIconoCanvas = spanIcono.getContext("2d");
        spanIconoCanvas.font = "250% Arial bold";
        spanIconoCanvas.fillStyle = "black";
        spanIconoCanvas.shadowBlur = 7;
        spanIconoCanvas.shadowColor = "white"
        spanIconoCanvas.textAlign = "center";
        spanIconoCanvas.fillText(lugar.nombre, spanIcono.width / 2, 30);
        spanIcono.style.position = "absolute";
        spanIcono.style.width = "4%";
        spanIcono.style.height = "2%";
        spanIcono.style.top = icono.offsetTop + 2 + 'px';
        spanIcono.style.left = (icono.offsetLeft - (icono.offsetLeft * 0.04)) + 'px';
        spanIcono.style.zIndex = '99';
        spanIcono.style.display = "none";
        document.getElementById('divContainerMapa').append(spanIcono); */


        /* let spanIcono = document.createElement("p");
        let node = document.createTextNode(lugar.nombre);
        spanIcono.appendChild(node);
        spanIcono.classList.add('spanIcon');
        spanIcono.id = "span" + lugar.nombre;
        spanIcono.classList.add(lugar.categoria);
        spanIcono.style.position = "absolute";
        spanIcono.style.width = "2%";
        spanIcono.style.height = "2%";
        spanIcono.style.top = icono.offsetTop + icono.height + 'px';
        spanIcono.style.left = (icono.offsetLeft - (icono.offsetLeft * 0.04)) + 'px';
        spanIcono.style.zIndex = '99';
        //spanIcono.style.display = "none";
        document.getElementById('divContainerMapa').append(spanIcono); */

        +contador++;
    });
}