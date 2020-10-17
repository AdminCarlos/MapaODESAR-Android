document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('divBody').style.display = "";
    document.getElementById('navbarHome').addEventListener('click',(e)=>{
        window.location = "index.html";
    });
    document.getElementById('navbarMapa').addEventListener('click',(e)=>{
        window.location = "mapa.html";
    });
}