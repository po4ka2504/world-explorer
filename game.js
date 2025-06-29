

// Global variables accessible from different functions
let panorama;
let actualLocation; // Renamed for clarity (was currentLocation)
let guessMap;
let guessMarker;

// Game state variables that will be reset
let stepCount;
let timeLeft;
let timerInterval;
let leaderboard = [];

// Step 1: Initialization and button handlers
// This function is called as a callback from the Google Maps script
window.initGame = function() {
  console.log("Google Maps API loaded. Game is ready.");

  document.getElementById('start-btn').addEventListener('click', () => {
    // Show "loading" and start searching for a location
    document.getElementById('start-btn').innerText = "Loading...";
    findRandomStreetViewLocation(startGame);
  });

const savedLeaderboard = sessionStorage.getItem('leaderboard');
  if (savedLeaderboard) {
    leaderboard = JSON.parse(savedLeaderboard);
    console.log("Loaded leaderboard from sessionStorage:", leaderboard);
  } else {
    console.log("No leaderboard found in sessionStorage. Starting fresh.");
  }


  document.getElementById('play-again-btn').addEventListener('click', () => {
    // Immediately start a new game
    findRandomStreetViewLocation(startGame);
  });

  document.getElementById('submit-guess-btn').addEventListener('click', () => {
    // Check that the marker is placed, and end the round
    if (!guessMarker) {
      alert("Please place a marker on the map to make a guess!");
      return;
    }
    const guessedLocation = guessMarker.getPosition();
    calculateAndShowResults(actualLocation, guessedLocation);
  });
   // Handler for the "guess now" button to end the round early
    document.getElementById('guess-now-btn').addEventListener('click', () => {
        console.log("Player decided to guess early. Ending the round.");
        endRound(); // Calling the existing function!
    });  
};

// Function to switch between screens
function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.style.display = 'none';
  });
  document.getElementById(screenId).style.display = 'block';
}

function findRandomStreetViewLocation(callback, attempt = 1) {
    console.log(`Attempting to find location #${attempt}...`);
    
    
    // 1. Randomly select one of the search zones from the config.js file
    const randomZoneIndex = Math.floor(Math.random() * SEARCH_ZONES.length);
    const selectedZone = SEARCH_ZONES[randomZoneIndex];
    const bounds = selectedZone.bounds;
    console.log(`Selected search zone: ${selectedZone.name}`);

    // 2. Generate random coordinates INSIDE the selected zone
    const lat = bounds.sw.lat + Math.random() * (bounds.ne.lat - bounds.sw.lat);
    const lng = bounds.sw.lng + Math.random() * (bounds.ne.lng - bounds.sw.lng);
  

    const randomLatLng = new google.maps.LatLng(lat, lng);
    const streetViewService = new google.maps.StreetViewService();

    streetViewService.getPanorama({
        location: randomLatLng,
        radius: 10000, // Use a large radius, as some zones might be "empty"
        source: 'outdoor'
    }, (data, status) => {
        if (status === 'OK') {
            console.log("Success! Location found:", data.location.latLng.toString());
            callback(data.location.latLng);
        } else {
            if (attempt < 15) { // Increase the number of attempts, as there are more zones
                findRandomStreetViewLocation(callback, attempt + 1);
            } else {
                alert("Could not find a suitable location. Please try again.");
                switchScreen('start-screen');
            }
        }
    });
}

// Step 3: Starting the main game round
function startGame(location) {
  // Reset all state variables before a new round
  actualLocation = location;
  stepCount = 100;
  timeLeft = 100;
  if (timerInterval) clearInterval(timerInterval); // Clear the old timer if it existed

  // Reset the marker from the previous game
  if (guessMarker) {
    guessMarker.setMap(null);
    guessMarker = null;
  }
  
  // Return the Start button to its initial state for "Play Again"
  document.getElementById('start-btn').innerText = "Start Game";
  
  switchScreen('game-screen');
  updateUI(); // Initial UI display (100 sec, 100 steps)

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street-view"), {
      position: location,
      pov: { heading: Math.random() * 360, pitch: 0 }, // Random initial point of view
      // IMPORTANT INTERFACE RESTRICTIONS
      addressControl: false,
      linksControl: false,
      panControl: true, // Keep the ability to rotate the camera
      zoomControl: false,
      disableDefaultUI: true,
      clickToGo: true,
      fullscreenControl: false,
      enableCloseButton: false,
    }
  );

  // FIX: Correct event name 'pano_changed'
  panorama.addListener("pano_changed", () => {
    stepCount--;
    updateUI(); // Update the UI after each step
    if (stepCount <= 0) {
      endRound();
    }
  });

  // Start the timer
  timerInterval = setInterval(() => {
    timeLeft--;
    updateUI(); // Update the UI every second
    if (timeLeft <= 0) {
      endRound();
    }
  }, 1000);
}

// ADDED: Function to update the entire game interface
function updateUI() {
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('steps').innerText = stepCount;
}

// Step 4: Proceeding to guess on the map
function endRound() {
  clearInterval(timerInterval); // Be sure to stop the timer!
  console.log("Round over. Proceeding to the guess map.");
  
  switchScreen('guess-screen');

  guessMap = new google.maps.Map(document.getElementById("guess-map"), {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    streetViewControl: false, // Disable the Street View icon on the map
    mapTypeControl: false    // Disable map type selection
  });

  guessMap.addListener("click", (e) => {
    // If the marker already exists, move it. If not, create it.
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

// Step 5: Calculating and displaying results
function calculateAndShowResults(actual, guessed) {
    // Part 1: Calculations (remain the same)
    const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(actual, guessed);
    const distanceInKm = distanceInMeters / 1000;

    let score = 0;
    if (distanceInKm <= 10) {
        score = 1000;
    } else if (distanceInKm < 5000) {
        // Original formula: Math.round(5000 * (1 - (distanceInKm - 10) / (500 - 10)));
        // This formula seems to give negative scores for distance > 500km.
        // Let's adjust the formula or cap the score at 0.
        // A common approach is inverse linear scaling up to a certain distance, then 0.
        // Let's use 5000km as the max distance for any points, and scale from 10km (1000 pts) to 5000km (0 pts).
        const maxDistanceForPoints = 5000;
        const minDistanceForMaxPoints = 10;

        if (distanceInKm <= minDistanceForMaxPoints) {
            score = 1000;
        } else if (distanceInKm < maxDistanceForPoints) {
             // Scale score linearly from 1000 down to 0 as distance goes from 10 to 5000
            score = Math.round(1000 * (1 - (distanceInKm - minDistanceForMaxPoints) / (maxDistanceForPoints - minDistanceForMaxPoints)));
            // Ensure score doesn't go below 0 due to rounding
            score = Math.max(0, score);
        } else {
            score = 0; // No points for guesses beyond 5000km
        }
    }

    // Update the text with points and distance
    document.getElementById("distance-result").innerText = distanceInKm.toFixed(1);
    document.getElementById("score-result").innerText = score;
    
     // --- NEW: Add score to leaderboard, sort, save, and display ---
    leaderboard.push({ score: score, distance: parseFloat(distanceInKm.toFixed(1)) }); // Store score and rounded distance
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score descending
    // Optional: Keep only the top N scores
    // leaderboard = leaderboard.slice(0, 10); // Keep top 10

    sessionStorage.setItem('leaderboard', JSON.stringify(leaderboard)); // Save to sessionStorage
    displayLeaderboard(); // Call function to display the updated leaderboard
    // --- END NEW ---
    
    
    // Switch to the results screen
    switchScreen('result-screen');

    
    
    // --- Part 2: Creating the results map (NEW LOGIC) ---

    // 1. Create a map object in our new div
    const resultsMap = new google.maps.Map(document.getElementById("result-map"), {
        // Settings to prevent the user from moving it
        gestureHandling: 'none',
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false
    });

    // 2. Create a marker for the CORRECT location (green)
    const actualMarker = new google.maps.Marker({
        position: actual,
        map: resultsMap,
        title: "Actual Location",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" // Standard Google green icon
        }
    });

    // 3. Create a marker for the player's GUESS (red)
    const guessedMarker = new google.maps.Marker({
        position: guessed,
        map: resultsMap,
        title: "Your Guess",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Standard Google red icon
        }
    });

    // 4. Draw a line between the two points
    const flightPath = new google.maps.Polyline({
        path: [actual, guessed],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    flightPath.setMap(resultsMap);

    // 5. Automatically scale the map so that BOTH markers are visible
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(actual);
    bounds.extend(guessed);
    resultsMap.fitBounds(bounds);
}

function displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list'); // You'll need to add this element in your HTML
    if (!leaderboardList) {
        console.error("Leaderboard list element not found!");
        return;
    }

    // Clear current list
    leaderboardList.innerHTML = '';

    // Populate list with current leaderboard data
    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `#${index + 1}: Score: ${entry.score} (Distance: ${entry.distance} km)`;
        leaderboardList.appendChild(listItem);
    });
}