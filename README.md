# 🌍 World Explorer - A Geo-Guessing Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<a href="https://buycoffee.to/po4ka2504" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

**World Explorer** is an exciting web-based game inspired by GeoGuessr. Players are shown a random Google Street View location and their mission is to guess where they are by placing a marker on a world map. The closer your guess is to the actual location, the more points you score!

This project is built with pure JavaScript, HTML, and CSS, making it a fantastic example of how to create interactive web applications using the Google Maps API.


> **[ GAMEPLAY ](https://github.com/user-attachments/assets/ca98a83c-50b1-4f81-bf57-db5d1d2a2120)**
> *This is the best way to instantly show what your project is all about.*

---

## 🎮 Key Features

-   **Random Locations:** Travel the world without leaving your home!
-   **Interactive Guessing Map:** Simply click on the map to make your guess.
-   **Scoring System:** Earn up to 1000 points per round based on your accuracy.
-   **Customizable Games:** Choose the timer duration and the geographical zones for location searching.
-   **Challenging Constraints:** The game gets trickier with a time limit and a step counter.
-   **Responsive Design:** Play comfortably on any device.

---

## 🛠️ Architecture and Project Structure

The project is built as a **Single-Page Application (SPA)** with a modular architecture. All components are clearly separated by their responsibilities.

> **📈 GRAPHIC 1: Application Architecture Overview**
> ![Application Architecture Overview](https://github.com/user-attachments/assets/1b991913-3558-44d7-bd54-12fafa856e15)

### 1. Configuration (`config.js`)

A central file for all settings. It contains:
-   `GOOGLE_API_KEY`: Your key for accessing the Google Maps API.
-   `SEARCH_ZONES`: An array of objects defining geographical zones (e.g., "Western Europe," "USA & Canada") with their coordinates.

### 2. Structure & Interface (`index.html` & `style.css`)

The UI is built on a "screen-based" system. Each game state (main menu, settings, game, results) is a separate `div` with a `.screen` class. The visibility of these screens is controlled by adding/removing the `.active` class via JavaScript.

> **📊 GRAPHIC 2: Screen Transition Flow**
> ![image](https://github.com/user-attachments/assets/f0f8b9e3-fbc6-4cf2-ae96-867fca87d0c5)


### 3. Game Logic (`game-test.js` / `game.js`)

This is the heart of the game, where all the mechanics are implemented.
-   **State Management:** Global variables track the current location (`actualLocation`), the panorama (`panorama`), and the step/time counters.
-   **Game Loop:** Finding a random location, starting the timer, tracking player movement, transitioning to the guess phase, and calculating the results.
-   **Scoring Algorithm:**
    -   **≤ 10 km:** 1000 points
    -   **10-500 km:** Linear interpolation from 1000 down to 0
    -   **> 500 km:** 0 points

> **🔄 GRAPHIC 3: Game Loop Flowchart**
> ![image](https://github.com/user-attachments/assets/6a876436-bb40-4192-b716-36fe3deb1ae9)


### 4. Google Maps API Integration

The project actively uses several Google Maps services:
-   **StreetViewService:** To find and validate panorama locations.
-   **StreetViewPanorama:** To display the interactive street view.
-   **Maps & Marker:** To create the guessing map and display results.
-   **Geometry Library:** For accurately calculating the distance between two points on a sphere.

---

### ⚖️ Implementation Variants

The repository contains two versions of the game logic:

| File            | Description                                                                     | UI Language |
| --------------- | ------------------------------------------------------------------------------- | ----------- |
| `game-test.js`  | **Primary version.** Fully featured, with settings, and robust error handling.  | English     |
| `game.js`       | **Alternative version.** A simpler implementation with Russian comments & UI.   | English     |

**It is recommended to use `game-test.js` as the main implementation.**

---

## 🚀 How to Get Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/po4ka2504/world-explorer.git
    cd world-explorer
    ```

2.  **Set up your Google Maps API Key:**
    *   Obtain your Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview).
    *   **Crucially, for the game to function, you must enable the following APIs in your Google Cloud project:**
        *   **Maps JavaScript API**
        *   **Street View API**
        *   **Geocoding API** (recommended for robust location finding)
    *   Create a file named `apiKey.js` in the root directory of the project.
    *   Inside `apiKey.js`, paste the following code, replacing `"YOUR_API_KEY_HERE"` with your actual Google Maps API key:
        ```javascript
        // apiKey.js
        const GOOGLE_API_KEY = "YOUR_API_KEY_HERE";
        ```
    > ⚠️ **Important:** Never commit your API key directly into version control. Add `apiKey.js` to your `.gitignore` file to prevent accidental exposure.

3.  **Run the game:**
    *   Open the `index.html` file in your web browser (e.g., Google Chrome, Firefox). The application will dynamically load the Google Maps API using the key from `apiKey.js`. No additional build tools are required!

---

## 🤖 Development Note

This game was created with the assistance of **Google's gemini-2.5-pro (as of June 29, 2025)** via **Google AI Studio**. The development process involved multiple iterations with the AI, using a high **temperature parameter of 1.2** to encourage creative and diverse code suggestions. The AI-generated code served as a strong foundation, which was then refined with minor manual fixes and adjustments to achieve the final, functional application.

---

## 📝 Future Plans (To-Do)

-   [ ] Add a backend to save scores and create a leaderboard.
-   [ ] Enhance the UI/UX with better animations and a polished design.
-   [ ] Implement new game modes (e.g., time attack, challenges).
-   [ ] Localize the interface into multiple languages.
-   [ ] Adjust the place randomization to focus on populated areas, such as towns and villages, rather than sparse, remote environments.

---

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more details.

