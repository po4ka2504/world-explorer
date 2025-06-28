// config.js
// This file contains the NEW, upgraded game configuration.

const SEARCH_ZONES = [
    { 
        name: "Europe (West & Central)",
        type: "single_box", // Simple zone, one large box is enough
        bounds: { sw: { lat: 36.0, lng: -10.0 }, ne: { lat: 60.0, lng: 20.0 } }
    },
    { 
        name: "Europe (East)",
        type: "single_box",
        bounds: { sw: { lat: 43.0, lng: 20.0 }, ne: { lat: 60.0, lng: 40.0 } }
    },
    { 
        name: "UK & Ireland",
        type: "single_box",
        bounds: { sw: { lat: 49.0, lng: -11.0 }, ne: { lat: 59.0, lng: 2.0 } }
    },
    {
        name: "USA & Canada",
        type: "multi_box", // Complex zone with multiple targeted sub-zones
        sub_zones: [
            { name: "Northeast Megalopolis (NYC, Boston, Philly)", bounds: { sw: { lat: 39.0, lng: -80.0 }, ne: { lat: 44.0, lng: -70.0 } } },
            { name: "West Coast (California, Cascadia)", bounds: { sw: { lat: 32.0, lng: -124.0 }, ne: { lat: 49.0, lng: -117.0 } } },
            { name: "Midwest (Chicago & Great Lakes)", bounds: { sw: { lat: 40.0, lng: -90.0 }, ne: { lat: 45.0, lng: -82.0 } } },
            { name: "Florida & Southeast", bounds: { sw: { lat: 25.0, lng: -85.0 }, ne: { lat: 34.0, lng: -79.0 } } },
            { name: "Texas Triangle", bounds: { sw: { lat: 29.0, lng: -99.0 }, ne: { lat: 33.0, lng: -94.0 } } },
            { name: "Quebec-Windsor Corridor (Canada)", bounds: { sw: { lat: 42.0, lng: -83.0 }, ne: { lat: 47.0, lng: -70.0 } } }
        ]
    },
    {
        name: "South America",
        type: "multi_box", // Also benefits from targeted zones
        sub_zones: [
            { name: "Southeast Brazil (São Paulo, Rio)", bounds: { sw: { lat: -25.0, lng: -50.0 }, ne: { lat: -21.0, lng: -42.0 } } },
            { name: "Buenos Aires Region", bounds: { sw: { lat: -36.0, lng: -60.0 }, ne: { lat: -33.0, lng: -57.0 } } },
            { name: "Colombia & Andes", bounds: { sw: { lat: 1.0, lng: -79.0 }, ne: { lat: 11.0, lng: -72.0 } } },
            { name: "Central Chile", bounds: { sw: { lat: -35.0, lng: -72.0 }, ne: { lat: -32.0, lng: -70.0 } } }
        ]
    },
    { 
        name: "Mexico",
        type: "single_box", // Mexico is dense enough for one box
        bounds: { sw: { lat: 16.0, lng: -117.0 }, ne: { lat: 32.0, lng: -87.0 } }
    }
];