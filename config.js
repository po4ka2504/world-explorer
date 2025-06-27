const GOOGLE_API_KEY = "AIzaSyBI6VvqQVGyvhaPS5YX4XrnVLrrUJsdcqM";

const SEARCH_ZONES = [
    { name: "Western Europe", bounds: { sw: { lat: 36.0, lng: -10.0 }, ne: { lat: 60.0, lng: 20.0 } } },
    { name: "Eastern Europe", bounds: { sw: { lat: 43.0, lng: 20.0 }, ne: { lat: 60.0, lng: 40.0 } } },
    { name: "UK & Ireland", bounds: { sw: { lat: 49.0, lng: -11.0 }, ne: { lat: 59.0, lng: 2.0 } } },
    { name: "USA & Canada", bounds: { sw: { lat: 25.0, lng: -125.0 }, ne: { lat: 60.0, lng: -65.0 } } },
    { name: "Mexico", bounds: { sw: { lat: 16.0, lng: -117.0 }, ne: { lat: 32.0, lng: -87.0 } } },
    { name: "South America", bounds: { sw: { lat: -55.0, lng: -80.0 }, ne: { lat: 12.0,  lng: -35.0 } } }
];