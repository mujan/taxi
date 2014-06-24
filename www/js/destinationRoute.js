var userComand = function() {
    initialize();
};

var rendererOptions = {
    draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
;
var directionsService = new google.maps.DirectionsService();
var map;

var australia = new google.maps.LatLng(-25.274398, 133.775136);

function initialize() {

    var mapOptions = {
        zoom: 7,
        center: australia
    };
    map = new google.maps.Map(document.getElementById('route_map'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
    });

    calcRoute();
}

function calcRoute() {
    _user_lat_ = $("#lat").val();
    _user_lng_ = $("#lng").val();
    var ant_lat = $("#antlat").val();
    var ant_lng = $("#antlng").val();
    var request = {
        origin: _user_lat_+','+ _user_lng_,
        destination: ant_lat+','+ ant_lng,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            user_start_address_ = response.routes[0].legs[0].start_address
            directionsDisplay.setDirections(response);
        }
    });
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000.0;
    document.getElementById('total').innerHTML = total + ' km';
    //kmDB(total, numcar,namecar,user_start_address_,_user_lat_,_user_lng_);
}
/**************************************
 *
 *      map.setCenter(myCenter);
 * 
 *************************************/

var _userComand = function() {
    _initialize();
};

var _rendererOptions = {
    draggable: true
};
var _directionsDisplay = new google.maps.DirectionsRenderer(_rendererOptions);

var _directionsService = new google.maps.DirectionsService();
var _map;

var serbia = new google.maps.LatLng(44.09154, 20.12562);

function _initialize() {

    var _mapOptions = {
        zoom: 7,
        center: serbia
    };
    _map = new google.maps.Map(document.getElementById('route_map5'), _mapOptions);
    _directionsDisplay.setMap(_map);
    _directionsDisplay.setPanel(document.getElementById('directionsPanel5'));

    google.maps.event.addListener(_directionsDisplay, 'directions_changed', function() {
        _computeTotalDistance(_directionsDisplay.getDirections());
    });

    _calcRoute();
}

function _calcRoute() {
    console.log(taxi_lat);
    console.log(taxi_lng);
    console.log(client_lat);
    console.log(client_lng);
    
    var request = {
        origin: taxi_lat+','+ taxi_lng,
        destination: client_lat +','+ client_lng,
        travelMode: google.maps.TravelMode.DRIVING
    };
    _directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            _directionsDisplay.setDirections(response);
        }
    });
}

function _computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000.0;
    document.getElementById('total').innerHTML = total + ' km';
}