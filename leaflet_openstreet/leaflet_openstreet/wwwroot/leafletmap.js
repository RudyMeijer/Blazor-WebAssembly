export function load_map(raw) {
    console.log(JSON.parse(String(raw)));
    let map = L.map('map').setView({ lat: 52.263467, lon: 6.17359 }, 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    var geojson_layer = L.geoJSON().addTo(map);
    var geojson_data = JSON.parse(String(raw));
    for (var geojson_item of geojson_data) {
        geojson_layer.addData(geojson_item);
        var marker = new L.marker(
            [geojson_item.geometry.coordinates[1],
            geojson_item.geometry.coordinates[0]],
            { opacity: 0.01 }
        );
        marker.bindTooltip(geojson_item.properties.name,
            {
                permanent: true,
                className: "my-label",
                offset: [0, 0]
            }
        );
        marker.addTo(map);
    }
    //
    // Data
    //
    var popup = L.popup();
    //
    //  Handle mouse events.
    //
    function onMapClick(e) {
        console.log("Mouse:" + e.latlng.toString());
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    map.on('click', onMapClick);


    var polygon = L.polygon([
        [52.2509, 6.08],
        [52.2303, 6.06],
        [52.251, 6.047]
    ]).addTo(map);

    // FeatureGroup is to store editable layers
    var drawnItems =  new L.FeatureGroup();
    map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);
    return "";
}