// =================================================================================
// SECTION 1: GLOBAL STATE & SETTINGS
// All variables that store the game's state and settings are here.
// =================================================================================

// --- Game Settings (configurable by player) ---
let gameSettings = {
    timer: 60,
    zones: []
};

// --- Game State (reset every new session) ---
let sessionScores = [];
let totalSessionScore = 0;
const playerName = "@placeholdername@";

// --- Google Maps Objects (reset every round) ---
let panorama;
let actualLocation;
let guessMap;
let guessMarker;

// --- Round-Specific State (reset every round) ---
let stepCount;
let timeLeft;
let timerInterval;


// =================================================================================
// SECTION 2: INITIALIZATION
// The main entry point called by the Google Maps API. Sets up event listeners.
// =================================================================================

window.initGame = function() {
    console.log("Google Maps API loaded. Game is ready.");

    // Initial setup
    populateSettingsScreen();
    saveSettings(); // Save default settings on first launch

    // --- Main Menu & Session Control Button Handlers ---
    document.getElementById('start-btn').addEventListener('click', () => {
        // A new game from the main menu always starts a new session.
        console.log("Starting a new session. Resetting scores.");
        sessionScores = [];
        totalSessionScore = 0;

        if (gameSettings.zones.length === 0) {
            alert("Please select at least one search zone in the Settings!");
            return;
        }
        switchScreen('loading-screen');
        findRandomStreetViewLocation(startGame);
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
        // "Play Again" continues the current session.
        switchScreen('loading-screen');
        findRandomStreetViewLocation(startGame);
    });

    document.getElementById('quit-game-btn').addEventListener('click', returnToMainMenu);
    document.getElementById('end-session-btn').addEventListener('click', returnToMainMenu);

    // --- In-Game Action Button Handlers ---
    document.getElementById('submit-guess-btn').addEventListener('click', () => {
        if (!guessMarker) {
            alert("Please place a marker on the map to make a guess!");
            return;
        }
        const guessedLocation = guessMarker.getPosition();
        calculateAndShowResults(actualLocation, guessedLocation);
    });

    document.getElementById('guess-now-btn').addEventListener('click', endRound);

    // --- Settings Screen Handlers ---
    document.getElementById('settings-btn').addEventListener('click', () => switchScreen('settings-screen'));
    document.getElementById('back-to-main-btn').addEventListener('click', () => switchScreen('start-screen'));
    
    document.getElementById('save-settings-btn').addEventListener('click', () => {
        saveSettings();
        alert("Settings saved!");
        switchScreen('start-screen');
    });
};


// =================================================================================
// SECTION 3: SCREEN & UI MANAGEMENT
// Functions dedicated to controlling the UI, like switching screens.
// =================================================================================

// Switches the visible screen in the UI
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    const targetScreen = document.getElementById(screenId);
    // Use 'flex' for screens that need vertical centering, 'block' for others.
    targetScreen.style.display = targetScreen.classList.contains('active') ? 'flex' : 'block';
}

// Updates the in-game UI (timer and steps)
function updateUI() {
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('steps').innerText = stepCount;
}


// =================================================================================
// SECTION 4: GAME LIFECYCLE
// Functions that control the flow of the game (start, end, quit).
// =================================================================================

// Starts a new round with a given location
function startGame(location) {
    // Reset round-specific state
    actualLocation = location;
    stepCount = 100;
    timeLeft = gameSettings.timer;
    
    if (timerInterval) clearInterval(timerInterval);
    if (guessMarker) {
        guessMarker.setMap(null);
        guessMarker = null;
    }
  
    switchScreen('game-screen');
    updateUI();

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"), {
            position: location,
            pov: { heading: Math.random() * 360, pitch: 0 },
            addressControl: false,
            linksControl: false,
            panControl: true,
            zoomControl: false,
            disableDefaultUI: true,
            clickToGo: true,
            fullscreenControl: false,
            enableCloseButton: false,
            motionTracking: false,
        }
    );

    panorama.addListener("pano_changed", () => {
        if (stepCount > 0) {
            stepCount--;
            updateUI();
            if (stepCount <= 0) endRound();
        }
    });

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateUI();
            if (timeLeft <= 0) endRound();
        }
    }, 1000);
}

// Ends the current round and transitions to the guess map
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

// Cleanly returns to the main menu, stopping any active timers
function returnToMainMenu() {
    console.log("Returning to main menu...");
    clearInterval(timerInterval);
    switchScreen('start-screen');
}


// =================================================================================
// SECTION 5: SETTINGS MANAGEMENT
// Functions for populating and saving game settings.
// =================================================================================

function populateSettingsScreen() {
    const container = document.getElementById('zone-checkboxes');
    if (!container) return;
    container.innerHTML = '';

    const allCheckboxHtml = `<label style="font-weight: bold;"><input type="checkbox" id="all-zones-checkbox" checked> Select All</label>`;
    container.insertAdjacentHTML('beforeend', allCheckboxHtml);

    SEARCH_ZONES.forEach(zone => {
        const checkboxHtml = `<label><input type="checkbox" class="zone-checkbox" value="${zone.name}" checked> ${zone.name}</label>`;
        container.insertAdjacentHTML('beforeend', checkboxHtml);
    });
    
    document.getElementById('all-zones-checkbox').addEventListener('change', (e) => {
        document.querySelectorAll('.zone-checkbox').forEach(cb => cb.checked = e.target.checked);
    });
}

function saveSettings() {
    const selectedTimer = document.querySelector('input[name="timer-setting"]:checked').value;
    gameSettings.timer = parseInt(selectedTimer, 10);

    gameSettings.zones = [];
    document.querySelectorAll('.zone-checkbox:checked').forEach(checkbox => {
        gameSettings.zones.push(checkbox.value);
    });
    
    console.log("Settings updated:", gameSettings);
}


// =================================================================================
// SECTION 6: CORE GAMEPLAY LOGIC
// The main functions that drive the gameplay itself.
// =================================================================================

// Finds a random valid Street View location based on settings
function findRandomStreetViewLocation(callback, attempt = 1) {
    console.log(`Finding location, attempt #${attempt}...`);
    
    const availableZones = SEARCH_ZONES.filter(zone => gameSettings.zones.includes(zone.name));
    if (availableZones.length === 0) {
        alert("No search zones selected in settings!");
        returnToMainMenu();
        return;
    }

    const randomZoneIndex = Math.floor(Math.random() * availableZones.length);
    const selectedZone = availableZones[randomZoneIndex];
    console.log(`Searching in top-level zone: ${selectedZone.name}`);

    let bounds;
    if (selectedZone.type === "multi_box" && selectedZone.sub_zones) {
        const randomSubZoneIndex = Math.floor(Math.random() * selectedZone.sub_zones.length);
        const selectedSubZone = selectedZone.sub_zones[randomSubZoneIndex];
        bounds = selectedSubZone.bounds;
        console.log(`-> Picked high-density sub-zone: ${selectedSubZone.name}`);
    } else {
        bounds = selectedZone.bounds;
    }

    const lat = bounds.sw.lat + Math.random() * (bounds.ne.lat - bounds.sw.lat);
    const lng = bounds.sw.lng + Math.random() * (bounds.ne.lng - bounds.sw.lng);
    const randomLatLng = new google.maps.LatLng(lat, lng);
    const streetViewService = new google.maps.StreetViewService();

    streetViewService.getPanorama({ location: randomLatLng, radius: 50000, source: 'outdoor' }, (data, status) => {
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


// =================================================================================
// SECTION 7: RESULTS & SCORING
// Functions that calculate score, update leaderboards, and display results.
// =================================================================================

// **FIXED**: This function is now defined before it is called.
// Calculates score based on distance using an improved formula.
function calculateScore(distanceInKm) {
    const MAX_SCORE = 5000;
    const PERFECT_RADIUS_KM = 0.05; // 50 meters
    const ZERO_SCORE_RADIUS_KM = 2000;

    if (distanceInKm <= PERFECT_RADIUS_KM) return MAX_SCORE;
    if (distanceInKm >= ZERO_SCORE_RADIUS_KM) return 0;

    const score = MAX_SCORE * (1 - (distanceInKm / ZERO_SCORE_RADIUS_KM));
    return Math.round(score);
}

// **FIXED**: This function is also defined before it is called.
// Populates the session leaderboard on the results screen.
function updateLeaderboardUI() {
    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;
    
    leaderboardList.innerHTML = ''; 

    if (sessionScores.length === 0) {
        leaderboardList.innerHTML = '<li>Play a round to see your history!</li>';
        return;
    }
    
    const header = document.createElement('li');
    header.style.fontWeight = 'bold';
    header.style.borderBottom = '2px solid #555';
    header.innerHTML = `<div style="display: flex; justify-content: space-between; padding: 0 10px;"><span>Round</span><span>Distance</span><span>Score</span></div>`;
    leaderboardList.appendChild(header);

    sessionScores.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<div style="display: flex; justify-content: space-between; padding: 0 10px;"><span>#${item.round}</span><span>${item.distance} km</span><span>${item.score}</span></div>`;
        leaderboardList.appendChild(listItem);
    });
}

// Calculates score and shows the results screen with the map
function calculateAndShowResults(actual, guessed) {
    // Calculations
    const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(actual, guessed);
    const distanceInKm = distanceInMeters / 1000;
    const score = calculateScore(distanceInKm); // Now this works!

    // Update session state
    sessionScores.push({
        round: sessionScores.length + 1,
        score: score,
        distance: distanceInKm.toFixed(1)
    });
    totalSessionScore += score;
    
    // Update UI elements
    document.getElementById("distance-result").innerText = distanceInKm.toFixed(1);
    document.getElementById("score-result").innerText = score;
    document.getElementById("total-score-value").innerText = totalSessionScore;
    document.getElementById("player-name-display").innerText = playerName;
    
    // Show screen and populate leaderboard
    switchScreen('result-screen');
    updateLeaderboardUI();
    
    // Create the results map
    const resultsMap = new google.maps.Map(document.getElementById("result-map"), {
        gestureHandling: 'none',
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false
    });

    new google.maps.Marker({
        position: actual,
        map: resultsMap,
        title: "Actual Location",
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }
    });

    new google.maps.Marker({
        position: guessed,
        map: resultsMap,
        title: "Your Guess",
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }
    });

    new google.maps.Polyline({
        path: [actual, guessed],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
    }).setMap(resultsMap);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(actual);
    bounds.extend(guessed);
    resultsMap.fitBounds(bounds);
}