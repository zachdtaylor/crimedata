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
            '<p><b>Date:</b> '+ info.date+
            '<p><b>Address:</b> '+ info.address+
            '</div>'+
            '</div>';  
    
        marker.addListener('click', function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
            theMap.setCenter(marker.position);
        });
}

$(document).ready(function(){
    $("#search-button").click(function(e){
        e.preventDefault();
        var city = $("#city");
        $.ajax({
            url:"https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyAbctiVD5bPxsqajS2wh8ynAfljGsjI4qg",
            dataType: "json"
            complete: function(response){
                console.log(response);
                
                var lat = response.geometry.location.lat;
                var lon = response.geometry.location.lng;
                theMap.setCenter(new google.maps.LatLng(lat,lon));
                theMap.setZoom(12);
                $.ajax({
                url:'https://api.spotcrime.com/crimes.json?lat='+lat+'&lon='+lon+'&radius=0.0&callback=jsonp1507087119154&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607',
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
    }
});
        
        