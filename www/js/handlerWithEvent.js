$(document).ready(function() {
    $("#tot").hide();
    $(".foo").animate({left: '100%'}, "slow");
    $("#anim").click(function() {
        $(".span11").hide();
        $("#directionsPanel").hide();
        $(".foo").show().animate({left: '0%'}, "slow");
    });
});

$(document).ready(function() {
    $(".foo ul:first-child").click(function() {
        $(".foo").animate({left: '100%'}, "slow");//class foo hide on left side window
        $("#anim").animate({left: '0'}, "slow", function() {
            $(".foo").hide();
        });//id anim folow class foo and go left with him
    });
});

$(document).ready(function() {
    $("#lookMap").click(function() {
        $("#instructions").empty();
        $("#tot").show();
        $(".span11").show();

        $(".foo").animate({left: '100%'}, "slow", function() {
            new userComand();
            $("#directionsPanel").show();
        });

    });
});

// data about caffe stored in DB
$(document).ready(function() {
    var i = 0;
    $("#remove_href_nerbyTaxi").click(function() {
        $(".foo").hide();
        stopAnimation();
        //start animation
        new imageLoader("css/images/sprites.gif", 'startAnimation(' + 2 + ')');
        if ($("#lat").val() === "null" || $("#lng").val() === "null") {//Ukoliko podazuje na BG id="lat" i id="lng" su iz nekog razloga setovani
            GEOlocation.getLocation();
        }
        var int = setInterval(function() {
            if ($("#lat").val() !== "null" && $("#lng").val() !== "null" && i === 0) {
                var lat = $("#lat").val();
                var lng = $("#lng").val();
                foo(lat, lng);
                clearInterval(int);
                i++;
            }
        }, 1000);
        function foo(lat, lng) {
            callAjax("http://taxi.lockernerd.co.uk/geolocation/getTaxi.php?lat=" + lat + "&lng=" + lng);
        }//http://http://taxi.lockernerd.co.uk/geolocation/getTaxi.php

    });
});

(function()
{
    setInterval(function() {
        $(".adp-legal").hide();
        var heig = $(window).height();
        var a = heig - 210;
        var b = heig - 178;
        $("#route_map").height(a + "px");
        $("#route_map5").height(a + "px");
        $("#routeMyhome").height(b + "px");
    }, 1000);
})();

$(document).ready(function() {
    $(document).on("pagecreate", "#address_position", function(event) {
        $("#address_map").css("height", "300px");
        $("#address_map").css("width", "100%");
    });
});
$(document).ready(function() {
    $("#form120").submit(function(event) {
        event.preventDefault();
        var inputs = document['form10'].getElementsByTagName("input");
        var input = [].slice.call(inputs, 0);
        var data = {};
        for (var key in input) {
            if (input[key].value == "") {
                alert('Morate popuniti oba polja');
            } else {
                data[input[key].id] = input[key].value
            }
        }
        register(data);
    });
});

$(document).ready(function() {
    $("#form11").submit(function(event) {
        event.preventDefault();
        var inputs = document['form11'].getElementsByTagName("input");
        var input = [].slice.call(inputs, 0);
        var data = {};
        for (var key in input) {
            if (input[key].value == "") {
                alert('Morate popuniti oba polja');
                return;
            } else {
                data[input[key].id] = input[key].value
            }
        }

        login(data);
    });
});

function logout() {
    clearLocalStorage();
    alert("Uspesno ste se izlogovali");
    window.location = "index.html";
}