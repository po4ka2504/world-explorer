const GOOGLE_API_KEY = "AIzaSyBI6VvqQVGyvhaPS5YX4XrnVLrrUJsdcqM";

const SEARCH_ZONES = [
    // --- ЕВРОПА ---
    {
        name: "Western Europe",
        bounds: {
            sw: { lat: 36.0, lng: -10.0 }, // Юго-запад
            ne: { lat: 60.0, lng: 20.0 }  // Северо-восток
        }
    },
    {
        name: "Eastern Europe (including Ukraine)",
        bounds: {
            sw: { lat: 43.0, lng: 20.0 }, // Юго-запад (Балканы)
            ne: { lat: 60.0, lng: 40.0 }  // Северо-восток (включая Прибалтику и Украину)
        }
    },
    {
        name: "UK & Ireland",
        bounds: {
            sw: { lat: 49.0, lng: -11.0 },
            ne: { lat: 59.0, lng: 2.0 }
        }
    },

    // --- СЕВЕРНАЯ АМЕРИКА ---
    {
        name: "USA & Canada",
        bounds: {
            // От Аляски до Флориды
            sw: { lat: 25.0, lng: -125.0 }, // Юго-запад (Калифорния/Флорида)
            ne: { lat: 60.0, lng: -65.0 }   // Северо-восток (Квебек/Ньюфаундленд)
        }
    },
    {
        name: "Mexico",
        bounds: {
            sw: { lat: 16.0, lng: -117.0 },
            ne: { lat: 32.0, lng: -87.0 }
        }
    },

    // --- ЮЖНАЯ АМЕРИКА ---
    {
        name: "South America",
        bounds: {
            // От Колумбии до Патагонии
            sw: { lat: -55.0, lng: -80.0 }, // Юго-запад (Чили)
            ne: { lat: 12.0,  lng: -35.0 }  // Северо-восток (Бразилия/Колумбия)
        }
    }
];