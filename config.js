const GOOGLE_API_KEY = "GOOGLE_API_KEY";

const SEARCH_ZONES = [
    {
        name: "Western Europe",
        bounds: { // Границы примерно от Португалии до Германии/Италии
            sw: { lat: 36.0, lng: -10.0 }, // Юго-запад
            ne: { lat: 60.0, lng: 20.0 }  // Северо-восток
        }
    },
    {
        name: "Eastern Europe (including Ukraine)",
        bounds: { // Границы от Польши/Балкан до западных границ России
            sw: { lat: 43.0, lng: 20.0 }, // Юго-запад (Балканы)
            ne: { lat: 60.0, lng: 40.0 }  // Северо-восток (включая Прибалтику и Украину)
        }
    },
    {
        name: "UK & Ireland",
        bounds: { // Отдельная зона для островов для лучшего распределения
            sw: { lat: 49.0, lng: -11.0 },
            ne: { lat: 59.0, lng: 2.0 }
        }
    }
];
