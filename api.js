var theMap;
var infowindow; 

function initMap() {
    // Create a map object and specify the DOM element for display.
    theMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    infowindow = new google.maps.InfoWindow();
}



function makeMarker(marker,info){
    
    var marker = new google.maps.Marker({
          position: marker.position,
          map: theMap,
          title: marker.title
        });
    
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+marker.title+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Address</b>:'+ info.address+ 
            '<p><b>Link</b>:'+ info.link+ 
            '</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';  
    
        marker.addListener('click', function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
            theMap.setCenter(marker.position.lat, marker.position.lng);
        });
}

$(document).ready(function(){
    $("#search-button").click(function(e){
        e.preventDefault();
        var lat = $("#lat").val();
        var lon = $("#lon").val();
        var radius = $("#radius").val();
        theMap.setCenter(new google.maps.LatLng(lat,-lon));
        theMap.setZoom(15);
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
                    title: this.type,
                };
                var info = {
                    link: this.link,
                    address: this.address
                }
                console.log("TESTS: " + marker.link);
                makeMarker(marker,info);
            });
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        },
        });
        return false;
    });
});