var elem = document.getElementById('divContainerMapa');

var panzoom = Panzoom(elem, {
    maxScale: 15,
    minScale: 3,
    step: 0.4,
    startScale: 3,
    startX: 31.300050099690754,
    startY: 45.95204671223958
});

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

            else if ($("#divLeyendas").css("display") != "none" || $("#divDescripcion").css("display") != "none" || $("#divBuscar").css("display") != "none") {

                closeLeyendas();
                closeDescription();
                closeBuscar();

            }
        }

        elem.addEventListener('panzoomzoom', (event) => {

            /* $(".mapIcon").css("width", ((0.3 / 100) * ($("#divContainerMapa").width() / panzoom.getScale())) + "%");

            if (panzoom.getScale() < 4 && panzoom.getScale() >= 3) {

                $(".mapIcon").css("width", ((0.4 / 100) * $("#divContainerMapa").width()) + "%");

            } */

            if (panzoom.getScale() === 3) {

                $(".mapIcon").css("width", "2%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 3 && panzoom.getScale() <= 3.5) {

                $(".mapIcon").css("width", "1.8%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 3.5 && panzoom.getScale() <= 4) {

                $(".mapIcon").css("width", "1.6%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 4 && panzoom.getScale() <= 4.5) {

                $(".mapIcon").css("width", "1.4%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 4.5 && panzoom.getScale() <= 5) {

                $(".mapIcon").css("width", "1.2%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 5 && panzoom.getScale() <= 5.5) {

                $(".mapIcon").css("width", "1%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 5.5 && panzoom.getScale() <= 6) {

                $(".mapIcon").css("width", "0.8%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 6 && panzoom.getScale() <= 6.5) {

                $(".mapIcon").css("width", "0.6%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 6.5 && panzoom.getScale() <= 7) {

                $(".mapIcon").css("width", "0.4%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 7 && panzoom.getScale() <= 7.5) {

                $(".mapIcon").css("width", "0.2%");
                $(".spanIcon").hide();

            }

            else if (panzoom.getScale() > 7.5 && panzoom.getScale() <= 15) {

                $(".mapIcon").css("width", "0.09%");
                $(".spanIcon").show();

            }

            else if (panzoom.getScale() === 9) {

                $(".mapIcon").css("width", "0.5%");
                //$(".spanIcon").show();

            }

            console.log("Nivel de Escala: " + panzoom.getScale() + " Icon size: " + $(".mapIcon").css("width"));

        });

        elem.addEventListener('panzoompan', (event) => {

            console.log(event.detail) // => { x: 0, y: 0, scale: 1 }

        });

        $(document).on("click", ".mapIcon", function () {

            openDescripcion($(this).attr("id"));

        });

        $("#inputBuscar").on("input", function () {

            buscar($("#inputBuscar").val());

        });


        $("#buttonGoToMap").click(function () {

            showMapa();

        });

        $("#buttonSearch").click(function () {

            openBuscar();
            buscar();

        });

        $("#buttonOpenLeyendas").click(function () {

            openLeyendas();

        });

        $("#buttonZoom").click(function () {

            panzoom.zoom(panzoom.getScale() + 0.5);

        });

        $("#buttonUnzoom").click(function () {

            panzoom.zoom(panzoom.getScale() - 0.5);

        });

        $(".divMainUI").click(function () {

            closeLeyendas();
            closeDescription();
            closeBuscar();

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

    function openDescripcion(iconID) {

        $("#modalDescripcion .modalTitulo span").text(iconID);

        if (device.platform === "Android") {

            $.ajax({
                type: "POST",
                url: "scripts/lugares.json",
                data: {},
                cache: false,
                success: function (data) {

                    var array = JSON.parse(data);

                    for (var i = 0; i < array.lugares.length; i++) {

                        if (iconID === array.lugares[i].nombre) {

                            $("#modalDescripcion .modalCuerpo").html(array.lugares[i].descripcion);

                        }

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
                .then(function (array) {
                    parserLugares(array.lugares);
                })

        }

        $("#divDescripcion").slideDown();
        //console.log("Nombre del lugar: " + iconID + " Descripcion: " + placeDescription);
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

    function putElementsOnMap() {

        $(".mapIcon").remove();

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

    function buscar(stringToSearch) {

        $(".mapIcon").each(function () {

            if ($(this).attr("id").toLowerCase().includes(stringToSearch.toLowerCase())) {

                $(this).css("opacity", "1");
                $(this).css("visibility", "visible");

            }

            else {

                $(this).css("opacity", "0");
                $(this).css("visibility", "hidden");

            }

        });

    }

})();

function parserLugares(jsonLugares) {
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
        let icono = document.createElement('img');
        icono.classList.add('mapIcon');
        icono.id = lugar.nombre;
        icono.src = lugar.icono;
        icono.style.position = "absolute";
        icono.style.top = ((lugar.coordY / 100) * $("#divContainerMapa").height()) + 'px';
        icono.style.left = ((lugar.coordX / 100) * $("#divContainerMapa").width()) + 'px';
        icono.style.width = "2%";
        icono.style.zIndex = '100';
        document.getElementById('divContainerMapa').appendChild(icono);
        console.log("Name: " + lugar.nombre + " Top: " + icono.offsetTop + " Left: " + icono.offsetLeft + " Height: " + icono.offsetWidth);

        //nombres íconos
        let spanIcono = document.createElement('canvas');
        spanIcono.classList.add('spanIcon');
        let spanIconoCanvas = spanIcono.getContext("2d");
        spanIconoCanvas.font = "250% Arial bold";
        spanIconoCanvas.fillStyle = "white";
        spanIconoCanvas.textAlign = "center";
        spanIconoCanvas.fillText(lugar.nombre, spanIcono.width / 2, 30);
        spanIcono.style.position = "absolute";
        spanIcono.style.width = "4%";
        spanIcono.style.height = "2%";
        spanIcono.style.top = icono.offsetTop + 2 + 'px';
        spanIcono.style.left = (icono.offsetLeft - (icono.offsetLeft * 0.04)) + 'px';
        spanIcono.style.zIndex = '99';
        spanIcono.style.display = "none";
        document.getElementById('divContainerMapa').append(spanIcono);
    });
}