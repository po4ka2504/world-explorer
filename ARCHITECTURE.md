# World Explorer Application Architecture

This document outlines the architecture and functionality of the Geo Explorer game. It covers everything from initial loading and API key management to core gameplay mechanics.

---

## 1. Core Concept

The application is a geography guessing game. A player is dropped into a random Google Street View location and must guess where they are on a world map. Points are awarded based on the accuracy of the guess. The game includes features like a timer, move limits, and an AI-powered hint system.

---

## 2. File Structure Overview

-   `index.html`: The main entry point of the application. It contains the HTML structure for all screens and includes the critical JavaScript logic for loading APIs.
-   `game-test.js`: The primary game logic file. It manages game state, screen transitions, user interactions, and scoring.
-   `apiKey.js`: **(Local Development Only)** Stores API keys for local testing. This file is listed in `.gitignore` and should never be committed to version control.
-   `config.js`: Contains the configuration for geographic search zones used to find random locations.
-   `style.css`: Defines the visual styling for the application.
-   `netlify/functions/`: This directory holds the serverless functions that run on Netlify when the site is deployed.
    -   `get-key.js`: Securely provides the Google Maps API key to the browser.
    -   `get-gemini-key.js`: Securely provides the Gemini API key to the browser.
    -   `get-gemini-hint.js`: Acts as a secure proxy to get a hint from the Gemini API without exposing the key to the public.

---

## 3. API Key Management (Dual Environment Logic)

A critical feature of this application is its ability to work both locally and when deployed to Netlify, while keeping API keys secure.

### How it Works:

1.  **On Page Load (`index.html`)**: The script attempts to fetch keys from the Netlify functions (`/.netlify/functions/...`).
2.  **Production Environment (on Netlify)**:
    -   The fetch request succeeds. The Netlify functions read the API keys from secure **Environment Variables** set in the Netlify UI.
    -   The keys are sent to the browser.
    -   The `window.getHint` function is defined to call the `get-gemini-hint` Netlify function, which acts as a secure proxy.
3.  **Local Environment (on your PC)**:
    -   The fetch request fails (because the local server doesn't run Netlify's environment). This is expected.
    -   The code enters the `catch` block and falls back to using the keys defined in `apiKey.js`.
    -   The `window.getHint` function is defined to make a *direct* call from the browser to the Gemini API. This is less secure but necessary for local testing.

---

## 4. Key Functions and How They Work

### `loadApiAndInitialize()` (in `index.html`)

-   **Purpose**: To load the Google Maps API.
-   **Logic**: It follows the dual environment pattern described above, trying Netlify first and falling back to `apiKey.js` to fetch the `GOOGLE_API_KEY`. Once the key is retrieved, it dynamically creates a `<script>` tag to load the Google Maps library.

### `loadGeminiApi()` (in `index.html`)

-   **Purpose**: To configure the AI hint system.
-   **Logic**: This function also follows the dual environment pattern. It determines whether the app is running locally or on Netlify and defines a global `window.getHint(lat, lng)` function accordingly. This centralizes the logic for how hints are fetched.

### `initGame()` (in `game-test.js`)

-   **Purpose**: The main entry point for the game logic, called after the Google Maps script has successfully loaded.
-   **Logic**: It sets up all the initial event listeners for the game's buttons (Start, Settings, Quit, etc.).

### `findRandomStreetViewLocation(callback)` (in `game-test.js`)

-   **Purpose**: To find a valid starting location for a game round.
-   **Logic**:
    1.  It picks a random search zone from the `SEARCH_ZONES` defined in `config.js`.
    2.  It generates a random latitude and longitude within that zone's boundaries.
    3.  It uses the `StreetViewService` to check if a panorama exists near that point.
    4.  If a location is found, it calls the `callback` function (which is `startGame`). If not, it retries up to 15 times before showing an error.

### `showCountryHint()` (in `game-test.js`)

-   **Purpose**: To provide the player with a hint about their location.
-   **Logic**:
    1.  It disables the hint button and applies a time penalty.
    2.  It calls the globally defined `window.getHint(lat, lng)` function. It doesn't need to know *how* the hint is fetched, only that this function will return a hint string.
    3.  It displays the returned hint in an alert box. If any errors occur during the process, it shows a descriptive error message.

### `calculateAndShowResults(actual, guessed)` (in `game-test.js`)

-   **Purpose**: To end the round, calculate the score, and display the results screen.
-   **Logic**:
    1.  It uses the Google Maps Geometry Library to calculate the distance between the actual location and the player's guess.
    2.  It calculates a score based on this distance.
    3.  It updates the session history and total score.
    4.  It displays the results screen, showing the score, distance, and a map with both locations marked.
