function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

$(document).ready(function(){
    $("#search").click(function(e){
        e.preventDefault();
        var lat = $("#lat").val();
        var lon = $("#lon").val();
        var radius = $("#radius").val();
        $.ajax({
        url:"https://api.spotcrime.com/crimes.json?lat=" + lat +"lon="+lon+"&radius="+radius+"&callback=jsonp1507087119154&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607",
        dataType: "jsonp",
        complete: function (response) {
            //$('#output').html(response.responseText);
            console.log(response);
            jQuery.each(response, function() {
              console.log(this);
            });
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        },
    });
    return false;
    });
});