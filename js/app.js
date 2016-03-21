
 function appViewModel() {

    var self = this;

    self.markers = ko.observableArray([
            {name: 'Sammy’s Neighborhood Pub', lat: 35.2414025, lon: -81.03791130000002, address: '25 S Main St, Belmont, NC 28012'},
            {name: 'River’s Edge Bar & Grill', lat: 35.2725889, lon: -81.00531569999998, address: '5000 Whitewater Center Pkwy, Charlotte, NC 28214'},
            {name: 'Sports Page Food & Spirits', lat: 35.3038033, lon: -80.9366445, address: '8400 Bellhaven Blvd # H, Charlotte, NC 28216'},
            {name: 'Planet Fitness - Charlotte', lat: 35.2451844, lon: -80.89506440000002, address: '3301 Freedom Dr #600, Charlotte, NC 28208'},
            {name: 'CrossFit SouthEnd', lat: 35.222195, lon: -80.855435, address: '1115 S Mint St, Charlotte, NC 28203'},
            {name: 'ULTIMATE GYM', lat: 35.2458253, lon: -80.7826842, address: '1224 Commercial Ave, Charlotte, NC 28205'}
        ]);

    function initialize() {
        var map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            mapTypeId: 'roadmap'
        };
                        
        // Display a map on the page
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.setTilt(45);
            
        // Multiple Markers
                       
        // Info Window Content
        var infoWindowContent = [
            ['<div class="info_content">' +
            '<h3>Sammy’s Neighborhood Pub</h3>' +
            '<p>25 S Main St, Belmont, NC 28012</p>' + '</div>'],

            ['<div class="info_content">' +
            '<h3>River’s Edge Bar & Grill</h3>' +
            '<p>5000 Whitewater Center Pkwy, Charlotte, NC 28214</p>' + '</div>'],

            ['<div class="info_content">' +
            '<h3>Sports Page Food & Spirits</h3>' +
            '<p>8400 Bellhaven Blvd # H, Charlotte, NC 28216</p>' + '</div>'],

            ['<div class="info_content">' +
            '<h3>Planet Fitness - Charlotte</h3>' +
            '<p>3301 Freedom Dr #600, Charlotte, NC 28208</p>' + '</div>'],

            ['<div class="info_content">' +
            '<h3>CrossFit SouthEnd</h3>' +
            '<p>1115 S Mint St, Charlotte, NC 28203</p>' + '</div>'],
            
            ['<div class="info_content">' +
            '<h3>ULTIMATE GYM</h3>' +
            '<p>1224 Commercial Ave, Charlotte, NC 28205</p>' + '</div>']
        ];
            
        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;
        
        // Loop through our array of markers & place each one on the map  
        for( i = 0; i < markers().length; i++ ) {
            var position = new google.maps.LatLng(self.markers()[i].lat, self.markers()[i].lon);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: self.markers()[i].name
            });
            
            // Allow each marker to have an info window    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        }

        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
            this.setZoom(12);
            google.maps.event.removeListener(boundsListener);
        });
        
    }

  initialize();
}


ko.applyBindings(new appViewModel());
