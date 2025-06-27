// game.js

// --- Global object to store game settings ---
let gameSettings = {
    timer: 60, // Default value, will be updated from UI
    zones: []  // Will be populated with all zones by default
};

// --- Global variables for game state ---
let panorama;
let actualLocation;
let guessMap;
let guessMarker;

// --- Round-specific state variables ---
let stepCount;
let timeLeft;
let timerInterval;


// --- Main initialization function, called by Google Maps API callback ---
window.initGame = function() {
    console.log("Google Maps API loaded. Game is ready.");

    // Dynamically create the options on the settings screen
    populateSettingsScreen();
    // Save default settings on first launch (this will select all zones by default)
    saveSettings();

    // --- Button Event Handlers ---
    document.getElementById('start-btn').addEventListener('click', () => {
        if (gameSettings.zones.length === 0) {
            alert("Please select at least one search zone in the Settings!");
            return;
        }
        switchScreen('loading-screen');
        findRandomStreetViewLocation(startGame);
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
        switchScreen('loading-screen');
        findRandomStreetViewLocation(startGame);
    });

    document.getElementById('submit-guess-btn').addEventListener('click', () => {
        if (!guessMarker) {
            alert("Please place a marker on the map to make a guess!");
            return;
        }
        const guessedLocation = guessMarker.getPosition();
        calculateAndShowResults(actualLocation, guessedLocation);
    });

    document.getElementById('guess-now-btn').addEventListener('click', () => {
        console.log("Player decided to guess early. Ending round.");
        endRound();
    });

    document.getElementById('quit-game-btn').addEventListener('click', () => {
        returnToMainMenu();
    });

    // --- Settings Screen Handlers ---
    document.getElementById('settings-btn').addEventListener('click', () => {
        switchScreen('settings-screen');
    });

    document.getElementById('save-settings-btn').addEventListener('click', () => {
        saveSettings();
        alert("Settings saved!");
        switchScreen('start-screen');
    });

    document.getElementById('back-to-main-btn').addEventListener('click', () => {
        switchScreen('start-screen');
    });
};

// --- Settings Management Functions ---

function populateSettingsScreen() {
    const container = document.getElementById('zone-checkboxes');
    if (!container) return;
    container.innerHTML = '';

    // Create "Select All" checkbox
    const allCheckboxHtml = `<label style="font-weight: bold;"><input type="checkbox" id="all-zones-checkbox" checked> Select All</label>`;
    container.insertAdjacentHTML('beforeend', allCheckboxHtml);

    // Create checkboxes for each zone from config.js, all checked by default
    SEARCH_ZONES.forEach(zone => {
        const checkboxHtml = `<label><input type="checkbox" class="zone-checkbox" value="${zone.name}" checked> ${zone.name}</label>`;
        container.insertAdjacentHTML('beforeend', checkboxHtml);
    });
    
    // Add logic for "Select All" checkbox
    document.getElementById('all-zones-checkbox').addEventListener('change', (e) => {
        document.querySelectorAll('.zone-checkbox').forEach(cb => {
            cb.checked = e.target.checked;
        });
    });
}

function saveSettings() {
    // Save timer setting
    const selectedTimer = document.querySelector('input[name="timer-setting"]:checked').value;
    gameSettings.timer = parseInt(selectedTimer, 10);

    // Save selected zones
    gameSettings.zones = [];
    document.querySelectorAll('.zone-checkbox:checked').forEach(checkbox => {
        gameSettings.zones.push(checkbox.value);
    });
    
    console.log("Settings updated:", gameSettings);
}

// --- Core Game Logic ---

// Function to switch between screens
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    const targetScreen = document.getElementById(screenId);
    if(targetScreen.classList.contains('active')) {
        targetScreen.style.display = 'flex';
    } else {
        targetScreen.style.display = 'block';
    }
}

// Function to cleanly return to the main menu
function returnToMainMenu() {
    console.log("Returning to main menu...");
    clearInterval(timerInterval); // Crucial: stop the timer!
    switchScreen('start-screen');
}

// Finds a random valid Street View location based on settings
function findRandomStreetViewLocation(callback, attempt = 1) {
    console.log(`Finding location, attempt #${attempt}...`);
    
    // 1. Filter all zones based on user settings
    const availableZones = SEARCH_ZONES.filter(zone => gameSettings.zones.includes(zone.name));

    // 2. Randomly pick one of the AVAILABLE zones
    const randomZoneIndex = Math.floor(Math.random() * availableZones.length);
    const selectedZone = availableZones[randomZoneIndex];
    const bounds = selectedZone.bounds;
    console.log(`Searching in zone: ${selectedZone.name}`);

    const lat = bounds.sw.lat + Math.random() * (bounds.ne.lat - bounds.sw.lat);
    const lng = bounds.sw.lng + Math.random() * (bounds.ne.lng - bounds.sw.lng);

    const randomLatLng = new google.maps.LatLng(lat, lng);
    const streetViewService = new google.maps.StreetViewService();

    streetViewService.getPanorama({
        location: randomLatLng,
        radius: 50000,
        source: 'outdoor'
    }, (data, status) => {
        if (status === 'OK') {
            console.log("Success! Location found:", data.location.latLng.toString());
            callback(data.location.latLng);
        } else {
            if (attempt < 15) {
                findRandomStreetViewLocation(callback, attempt + 1);
            } else {
                alert("Could not find a suitable location. Please try again.");
                returnToMainMenu();
            }
        }
    });
}

// Starts the main game round
function startGame(location) {
    // Reset all round-specific state variables
    actualLocation = location;
    stepCount = 500;
    timeLeft = gameSettings.timer; // <-- USING THE SETTING!
    
    if (timerInterval) clearInterval(timerInterval);
    if (guessMarker) {
        guessMarker.setMap(null);
        guessMarker = null;
    }
  
    switchScreen('game-screen');
    updateUI(); // Set the initial UI (timer, steps)

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"), {
            position: location,
            pov: { heading: Math.random() * 360, pitch: 0 }, // Random initial POV
            // IMPORTANT UI RESTRICTIONS
            addressControl: false,
            linksControl: false,
            panControl: true,
            zoomControl: false,
            disableDefaultUI: true,
            clickToGo: true,
            fullscreenControl: false,
            enableCloseButton: false,
        }
    );

    // Listener for player movement
    panorama.addListener("pano_changed", () => {
        if (stepCount > 0) {
            stepCount--;
            updateUI();
            if (stepCount <= 0) {
                endRound();
            }
        }
    });

    // Start the timer
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateUI();
            if (timeLeft <= 0) {
                endRound();
            }
        }
    }, 1000);
}

// Updates the in-game UI (timer and steps)
function updateUI() {
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('steps').innerText = stepCount;
}

// Ends the round and proceeds to the guessing map
function endRound() {
    clearInterval(timerInterval);
    console.log("Round ended. Proceeding to guess map.");
    switchScreen('guess-screen');

    guessMap = new google.maps.Map(document.getElementById("guess-map"), {
        center: { lat: 20, lng: 0 },
        zoom: 2,
        streetViewControl: false,
        mapTypeControl: false
    });

    guessMap.addListener("click", (e) => {
        if (!guessMarker) {
            guessMarker = new google.maps.Marker({
                position: e.latLng,
                map: guessMap,
                animation: google.maps.Animation.DROP,
                title: "My Guess"
            });
        } else {
            guessMarker.setPosition(e.latLng);
        }
    });
}

// Calculates score and shows the results screen with the map
function calculateAndShowResults(actual, guessed) {
    // Part 1: Calculations
    const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(actual, guessed);
    const distanceInKm = distanceInMeters / 1000;

    let score = 0;
    if (distanceInKm <= 10) {
        score = 1000;
    } else if (distanceInKm < 500) {
        score = Math.round(1000 * (1 - (distanceInKm - 10) / (500 - 10)));
    }

    // Update the text with score and distance
    document.getElementById("distance-result").innerText = distanceInKm.toFixed(1);
    document.getElementById("score-result").innerText = score;
    
    // Switch to the results screen
    switchScreen('result-screen');

    // Part 2: Create the results map
    const resultsMap = new google.maps.Map(document.getElementById("result-map"), {
        gestureHandling: 'none',
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false
    });

    // Green marker for the actual location
    const actualMarker = new google.maps.Marker({
        position: actual,
        map: resultsMap,
        title: "Actual Location",
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }
    });

    // Red marker for the user's guess
    const guessedMarker = new google.maps.Marker({
        position: guessed,
        map: resultsMap,
        title: "Your Guess",
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }
    });

    // Draw a line between the two points
    const flightPath = new google.maps.Polyline({
        path: [actual, guessed],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    flightPath.setMap(resultsMap);

    // Automatically zoom the map to show both markers
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(actual);
    bounds.extend(guessed);
    resultsMap.fitBounds(bounds);
}