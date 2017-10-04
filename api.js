function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

$(document).ready(function(){
            $("#search").click(function(e){
                $.ajax({
                    url:'https://api.spotcrime.com/crimes.json?lat=40.2338438&lon=-111.65853370000002&radius=0.02&callback=jsonp1507087119154&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607',
                    dataType: "jsonp",
                    complete: function (response) {
                        //$('#output').html(response.responseText);
                        console.log(response);
                    },
                    error: function () {
                        $('#output').html('Bummer: there was an error!');
                    },
                });
                return false;
                });
            });