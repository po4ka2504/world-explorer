// =================================================================================
// SECTION 1: GLOBAL STATE & SETTINGS
// All variables that store the game's state and settings are here.
// =================================================================================

// --- Game Settings (configurable by player) ---
let gameSettings = {
    timer: 100,
    zones: ["Europe (East)", "Europe (West & Central)"]
};

// --- Game State (reset every new session) ---
let sessionScores = [];
let totalSessionScore = 0;
let playerName = ""; // Changed from const to let, initialized as empty

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

    // --- Language Initialization ---
    // 1. Check for a language saved in localStorage.
    let savedLang = localStorage.getItem('geoGameLanguage');

    // 2. If no saved language, detect from browser settings.
    if (!savedLang) {
        const browserLang = navigator.language.split('-')[0]; // 'en-US' -> 'en'
        if (translations[browserLang]) {
            console.log(`No saved language. Detected browser language: ${browserLang}`);
            savedLang = browserLang;
        } else {
            console.log(`No saved language. Browser language '${browserLang}' not supported. Defaulting to English.`);
            savedLang = 'en'; // Default to English if browser language is not supported
        }
    }

    // 3. Set the determined language and update the dropdown to match.
    setLanguage(savedLang);
    document.getElementById('language-switcher').value = savedLang;

    // 4. Add an event listener to the switcher to update the language on change.
    document.getElementById('language-switcher').addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
    // --- End of Language Initialization ---

    // Initial setup
    populateSettingsScreen();
    saveSettings(); // Save default settings on first launch

    // --- Main Menu & Session Control Button Handlers ---
    document.getElementById('start-btn').addEventListener('click', () => {
        if (gameSettings.zones.length === 0) {
            showTranslatedAlert("selectZonePrompt");
            return;
        }
        // Show the name input screen instead of starting directly
        switchScreen('name-input-screen');
        document.getElementById('player-name-input').focus();
    });

    document.getElementById('confirm-name-btn').addEventListener('click', () => {
        const nameInput = document.getElementById('player-name-input');
        if (nameInput.value.trim() === "") {
            showTranslatedAlert("nameRequired"); // You'll need to add this key to translations.js
            return;
        }
        playerName = nameInput.value.trim();
        
        // A new game from the main menu always starts a new session.
        console.log(`Starting a new session for player: ${playerName}. Resetting scores.`);
        sessionScores = [];
        totalSessionScore = 0;

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
            showTranslatedAlert("placeMarkerPrompt");
            return;
        }
        const guessedLocation = guessMarker.getPosition();
        calculateAndShowResults(actualLocation, guessedLocation);
    });

    document.getElementById('guess-now-btn').addEventListener('click', endRound);

    // --- Hint Button Handler ---
    document.getElementById('hint-btn').addEventListener('click', showCountryHint);

    // --- Settings Screen Handlers ---
    document.getElementById('settings-btn').addEventListener('click', () => switchScreen('settings-screen'));
    document.getElementById('back-to-main-btn').addEventListener('click', () => switchScreen('start-screen'));
    
    document.getElementById('save-settings-btn').addEventListener('click', () => {
        saveSettings();
        showTranslatedAlert("settingsSaved");
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

// --- Localization Helpers ---

/**
 * Applies translations to all elements with a 'data-translate-key' attribute.
 */
function applyTranslations() {
    // Translate standard elements
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        element.innerText = translations[currentLanguage][key] || translations['en'][key];
    });

    // Translate elements that serve as placeholders (like "Loading...")
    document.querySelectorAll('[data-translate-key-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-key-placeholder');
        element.innerText = translations[currentLanguage][key] || translations['en'][key];
    });
    
    // Manually update parts of the UI that don't use data-attributes
    populateSettingsScreen();
    updateLeaderboardUI();
}

/**
 * Displays an alert with a translated message.
 * @param {string} key - The translation key for the alert message.
 */
function showTranslatedAlert(key) {
    const message = translations[currentLanguage][key] || translations['en'][key];
    alert(message);
}

/**
 * Sets the current language, saves the choice to localStorage, and applies the new translations.
 * @param {string} lang - The language code to set (e.g., 'en', 'de').
 */
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('geoGameLanguage', lang); // Save the user's choice
    applyTranslations(); // Update the UI with the new language
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
    
    // Re-enable the hint button for the new round
    const hintButton = document.getElementById('hint-btn');
    hintButton.disabled = false;
    
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
             showRoadLabels: false,
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
    // Reset player name for the next session
    playerName = "";
    document.getElementById('player-name-input').value = ""; // Clear the input field
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

    const selectAllText = translations[currentLanguage].select_all || translations['en'].select_all;
    const allCheckboxHtml = `<label style="font-weight: bold;"><input type="checkbox" id="all-zones-checkbox"> ${selectAllText}</label>`;
    container.insertAdjacentHTML('beforeend', allCheckboxHtml);

    SEARCH_ZONES.forEach(zone => {
        const checked = gameSettings.zones.includes(zone.name) ? 'checked' : '';
        const checkboxHtml = `<label><input type="checkbox" class="zone-checkbox" value="${zone.name}" ${checked}> ${zone.name}</label>`;
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
        showTranslatedAlert("selectZonePrompt");
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
                showTranslatedAlert("locationNotFound");
                returnToMainMenu();
            }
        }
    });
}

// --- Hint Functionality ---
async function showCountryHint() {
    if (!actualLocation) return;

    const hintButton = document.getElementById('hint-btn');
    hintButton.disabled = true;

    // Reduce time by 30%
    timeLeft = Math.floor(timeLeft * 0.7);
    updateUI();

    try {
        const languageName = languageMap[currentLanguage] || 'English'; // Convert code to full name
        const hint = await window.getHint(actualLocation.lat(), actualLocation.lng(), playerName, languageName);
        if (hint) {
            alert(hint);
        } else {
            showTranslatedAlert("countryNotFound");
        }
    } catch (error) {
        console.error("Failed to get hint:", error);
        // Display the actual error message from the API to the user for better debugging
        alert(`Error fetching hint: ${error.message}`);
    }
}


// =================================================================================
// SECTION 7: RESULTS & SCORING
// Functions that calculate score, update leaderboards, and display results.
// =================================================================================

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

// Populates the session leaderboard on the results screen.
function updateLeaderboardUI() {
    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;
    
    leaderboardList.innerHTML = ''; 

    if (sessionScores.length === 0) {
        // This part won't be visible on the first round, but is good for subsequent rounds
        return;
    }
    
    const header = document.createElement('li');
    header.style.fontWeight = 'bold';
    header.style.borderBottom = '2px solid #555';
    
    const roundText = translations[currentLanguage].round || translations['en'].round;
    const distanceText = translations[currentLanguage].distance || translations['en'].distance;
    const scoreText = translations[currentLanguage].roundScore || translations['en'].roundScore;

    header.innerHTML = `<div style="display: flex; justify-content: space-between; padding: 0 10px;"><span>${roundText}</span><span>${distanceText}</span><span>${scoreText}</span></div>`;
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
    const score = calculateScore(distanceInKm);

    // Update session state
    sessionScores.push({
        round: sessionScores.length + 1,
        score: score,
        distance: distanceInKm.toFixed(1)
    });
    totalSessionScore += score;
    
    // Geocode to get and display location names
    const geocoder = new google.maps.Geocoder();
    function setLocationName(elementId, latLng) {
        geocoder.geocode({ location: latLng }, (results, status) => {
            const element = document.getElementById(elementId);
            if (status === "OK" && results[0]) {
                let city = null, region = null, country = null;
                for (const comp of results[0].address_components) {
                    if (comp.types.includes("locality")) city = comp.long_name;
                    if (comp.types.includes("administrative_area_level_1")) region = comp.long_name;
                    if (comp.types.includes("country")) country = comp.long_name;
                }
                let displayParts = [];
                if (city) displayParts.push(city);
                if (region && city !== region) displayParts.push(region);
                if (country) displayParts.push(country);
                
                element.innerText = displayParts.length > 0 ? displayParts.join(', ') : (translations[currentLanguage].locationNotFound_Geocode || "Unknown Location");
            } else {
                element.innerText = translations[currentLanguage].locationNotFound_Geocode || "Location not found";
                console.error("Geocoder failed for " + elementId + " due to: " + status);
            }
        });
    }

    setLocationName("actual-coords", actual);
    setLocationName("guess-coords", guessed);

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