var theMap;

function initMap() {
    // Create a map object and specify the DOM element for display.
    theMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });

}

function makeMarker(marker){
    var marker = new google.maps.Marker({
          position: marker.position,
          map: theMap,
          title: marker.title
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
}

$(document).ready(function(){
    $("#search").click(function(e){
        e.preventDefault();
        var lat = $("#lat").val();
        var lon = $("#lon").val();
        var radius = $("#radius").val();
        theMap.setCenter(new google.maps.LatLng(lat,-lon));
        $.ajax({
        url:'https://api.spotcrime.com/crimes.json?lat='+lat+'&lon=-'+lon+'&radius=0.02&callback=jsonp1507087119154&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607',
        dataType: "jsonp",
        complete: function (response) {
            //$('#output').html(response.responseText);
            console.log(response);
            //console.log(response.responseJSON.crimes);
            $.each(response.responseJSON.crimes, function(){
                console.log(this);
                var marker ={
                    position: {lat: parseFloat(this.lat), lng: parseFloat(this.lon)},
                    title: this.type
                };
                makeMarker(marker);
            });
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        },
    });
    return false;
    });
});