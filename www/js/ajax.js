function callAjax(url_string) {
    var url_to_call = url_string + "&callback=successCallback";
    console.log(url_to_call);
    $.ajax({
        url: url_to_call,
        data: "dataSend",
        dataType: 'jsonp',
        jsonpCallback: "successCallback",
        async: true,
        beforeSend: function() {

        },
        complete: function(data) {
        },
        success: function(result) {
          parseJsonp(result);
          //console.log(result)
        },
        error: function(request, error) {
            alert("Doslo je do greske na serveru prilikom ucitavanja podataka");
        },
        successCallback: function(result) {
        }
    });
    return true;
}

function parseJsonp(result) {
    $(".name").remove();
    $(".address").remove();
    $(".distance").remove();
    $(".type").remove();
    $("#anim").append("<ul><li class=\"name\">" + result.name + "</li></ul>");
    $("#address").append("Ulica: " + result.street);
    //$("#distance").append("Udaljenost: " + result.distance + " m");
    $("#type").append("Broj kola: " + result.num_car);
    $("#antlat").val(result.lat);
    $("#antlng").val(result.lng);
    stopAnimation();
    $("#loaderImage2").hide();
    numcar = result.num_car;
    namecar = result.name;

}

function check_user_name(url_name, callback) {
    var url_to_call = url_name + "&callback=successCallback";
    $.ajax({
        url: url_to_call,
        data: "dataSend",
        dataType: 'jsonp',
        type: "get",
        jsonpCallback: "successCallback",
        async: true,
        beforeSend: function(xhr) {

        },
        complete: function(jqXHR, textStatus) {

        },
        success: function(data, textStatus, jqXHR) {
            callback(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Doslo je do greske na serveru prilikom ucitavanja podataka");
        }
    });
    return "true";
}
$(document).ready(function() {
    $("#user_data").submit(function(event) {
        var imv = new Array();
// Stop form from submitting normally
        event.preventDefault();
// Get some values from elements on the page:
        var inputMapVar = $('input[name*="_r"]');
        inputMapVar.each(function(index) {
            imv[index] = ($(this).val());
        });
        var self = this;
        entires_user(imv, self);
    });
});

function entires_user(user_data, self) {
    var fname = user_data[0];
    var lname = user_data[1];
    var user_name = user_data[2];
    var address = user_data[3];
    //callback function ajax.js
    var ret = converteAddress_to_latlng(address, function(lat, lng) {
        var url_name = "http://taxi.lockernerd.co.uk/geolocation/check_userdata.php?fname=" + fname + "&lname=" + lname + "&lat=" + lat + "&lng=" + lng + "&user_name=" + user_name;
        var url_to_call = url_name + "&successCallback";
        
        var response = "";
        $.ajax({
            url: url_to_call,
            data: "dataSend",
            dataType: 'jsonp',
            type: "get",
            jsonpCallback: "successCallback",
            async: true,
            beforeSend: function(xhr) {
            },
            complete: function(jqXHR, textStatus) {

            },
            success: function(data, textStatus, jqXHR) {
                if (data === "exist") {
                    alert("Korisnicko ime vec postoji!");
                } else if (data === "empty") {
                    alert("Morate popuniti sva polja");
                } else {
                    alert("Uspesno ste se uclanili");
                    $('#user_data')[0].reset();
                    window.location = location.pathname + "#myhome";
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });

        return "true";

    });
}