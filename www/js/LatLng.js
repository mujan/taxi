GEOlocation = {
    getLocation: function()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    },
    showPosition: function(position)
    {
        $("#lat").val(position.coords.latitude);//Nerby coffe set curren lat and lng of user line:138
        $("#lng").val(position.coords.longitude);
    }
};


$(document).on("pagecreate", function(event) {
    if (event.target.id == 'secondpage') {
        getLatLng();
        set_interval();
    } else if(event.target.id == 'taxyAccepClient'){
        new _userComand;
    }
});


$(document).on("pagebeforechange", function(event, data) {
    if (typeof data.toPage === 'object') {
        if (data.toPage[0].id == 'index') {
            if (getLocalStorage()['localStorage']['name'] || getLocalStorage()['localStorage']['num'])
                window.location = "index.html#secondpage";
        }
    }
});

function set_interval() {
    setInterval(function() {
        getLatLng();
    }, 15000);
}

function getLatLng() {

    navigator.geolocation.getCurrentPosition(latlng);
    function latlng(position) {
        taxi_lat = position.coords.latitude;
        taxi_lng = position.coords.longitude;
        xmlhttp(taxi_lat, taxi_lng);
    }
}

function xmlhttp(lat, lng) {

    var directionsService = new google.maps.DirectionsService();

    var request = {
        origin: lat + ',' + lng,
        destination: 44.0200 + ',' + 20.091548,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var _addr = response.routes[0].legs[0].start_address;
            callback(_addr);
        }
    });

    function callback(_addr) {
        var oData = new FormData(),
                taxi_name = getLocalStorage()['localStorage']['name'],
                taxi_num = getLocalStorage()['localStorage']['num'],
                url = "http://taxi.lockernerd.co.uk/geolocation/insertRecord.php";//"http://taxi.lockernerd.co.uk/geolocation/insertRecord.php";//http://localhost/geoLocation/geoLocation/insertRecord.php
        var oReq = new XMLHttpRequest();
        oData.append("akcija", 'setInterval');
        oData.append("lat", lat);
        oData.append("lng", lng);
        oData.append("address", _addr);
        oData.append("taxi_name", taxi_name);
        oData.append("taxi_num", taxi_num);
        oReq.open("POST", url, true);
        oReq.onload = function(oEvent) {
            if (oReq.status == 200) {
                console.log(oEvent.target.responseText)
                var obj = JSON.parse(oEvent.target.responseText);
                for (var key in obj) {
                    if (key == 'hava_a_call' && obj[key] == 'true') {
                        //console.log(obj['user_lat']);console.log(obj['user_lng'])
                        var r = confirm("Imate musteriju u ulici " + obj['address'] + "\n\tDa li zelie da idete po nju?");
                        if (r == true)
                        {
                            client_lat = obj['user_lat'];
                            client_lng = obj['user_lng'];
                            window.location = "index.html#taxyAccepClient";
                        }
                        else
                        {
                            x = "You pressed Cancel!";
                        }
                    } else if (key == 'insert' && obj[key] == 'false') {
                        alert("Doslo je do greske pri upisivanju podataka");
                    } else if (key == 'delete' && obj[key] == 'false') {
                        alert("Doslo je do greske pri brisanju podataka podataka");
                    }
                }
            } else {
                alert("Error " + oReq.status + " occurred uploading your file.<br \/>");
            }
        };
        oReq.send(oData);
    }
}

function kmDB(total, numCar, NameCar, user_start_address, userLat, userLng) {
    var oData = new FormData(),
            url = "http://taxi.lockernerd.co.uk/geolocation/insertRecord.php";//"http://taxi.lockernerd.co.uk/geolocation/insertRecord.php";//http://localhost/geoLocation/geoLocation/insertRecord.php
    var oReq = new XMLHttpRequest();
    oData.append("akcija", 'km');
    oData.append("total", total);
    oData.append("numCar", numCar);
    oData.append("nameCar", NameCar);
    oData.append("userLat", userLat);
    oData.append("userLng", userLng);
    oData.append("user_start_address", user_start_address);
    oReq.open("POST", url, true);
    oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
            console.log(oEvent.target.responseText);
        } else {
            alert("Error " + oReq.status + " occurred uploading your file.<br \/>");
        }
    };
    oReq.send(oData);
}

function register(data) {
    var Data = new FormData(),
            url = "http://taxi.lockernerd.co.uk/geolocation/insertRecord.php";
    var Req = new XMLHttpRequest();
    Data.append("akcija", 'reg');
    Data.append("name", data.reg_name_taxi);
    Data.append("num", data.reg_num_taxi);
    Req.open("POST", url, true);
    Req.onload = function(oEvent) {
        if (Req.status == 200) {
            if (oEvent.target.responseText == 'false') {
                alert('Broj taksija mora biti "broj"');
            } else if (oEvent.target.responseText == 'true') {
                alert("Uspesno ste se registrovali");
                $("#form120").trigger("reset");
            }

        } else {
            alert("Error " + Req.status + " occurred uploading your file.<br \/>");
        }
    };
    Req.send(Data);
}

function login(data) {
    var Data = new FormData(),
            url = "http://taxi.lockernerd.co.uk/geolocation/insertRecord.php";
    var Req = new XMLHttpRequest();
    Data.append("akcija", 'login');
    Data.append("name", data.log_name_taxi);
    Data.append("num", data.log_num_taxi);
    Req.open("POST", url, true);
    Req.onload = function(oEvent) {
        if (Req.status == 200) {
            if (oEvent.target.responseText == 'false') {
                alert("Uneli ste neispravne podatke");
            } else if (oEvent.target.responseText == 'true') {
                if (typeof (Storage) !== "undefined")
                {
                    setLocalStorage(data.log_name_taxi, data.log_num_taxi);
                    alert("Uspesni ste se ulogovali");
                    window.location = "index.html#secondpage"
                }
                else
                {
                    alert("sory");
                }
            }
        } else {
            alert("Error " + Req.status + " occurred uploading your file.<br \/>");
        }
    };
    Req.send(Data);
}

setLocalStorage = function(name, num)
{
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("num", num);
};

getLocalStorage = function()
{
    var storage = [];
    storage['localStorage'] = [];
    var value = window.localStorage.getItem("key");
    storage['localStorage']['name'] = window.localStorage.getItem("name");
    storage['localStorage']['num'] = window.localStorage.getItem("num");
    return storage;
};

function clearLocalStorage() {
    window.localStorage.clear();
}