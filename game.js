// --- ИСПРАВЛЕННЫЙ И УЛУЧШЕННЫЙ game.js ---

// Глобальные переменные для доступа из разных функций
let panorama;
let actualLocation; // Переименовал для ясности (было currentLocation)
let guessMap;
let guessMarker;

// Переменные состояния игры, которые будут сбрасываться
let stepCount;
let timeLeft;
let timerInterval;

// Шаг 1: Инициализация и обработчики кнопок
// Эта функция вызывается callback'ом из скрипта Google Maps
window.initGame = function() {
  console.log("Google Maps API загружен. Игра готова.");

  document.getElementById('start-btn').addEventListener('click', () => {
    // Показываем "загрузку" и начинаем поиск локации
    document.getElementById('start-btn').innerText = "Загрузка...";
    findRandomStreetViewLocation(startGame);
  });

  document.getElementById('play-again-btn').addEventListener('click', () => {
    // Сразу начинаем новую игру
    findRandomStreetViewLocation(startGame);
  });

  document.getElementById('submit-guess-btn').addEventListener('click', () => {
    // Проверяем, что маркер поставлен, и завершаем раунд
    if (!guessMarker) {
      alert("Пожалуйста, поставьте маркер на карте, чтобы сделать догадку!");
      return;
    }
    const guessedLocation = guessMarker.getPosition();
    calculateAndShowResults(actualLocation, guessedLocation);
  });
   // Обработчик для кнопки досрочного завершения раунда
    document.getElementById('guess-now-btn').addEventListener('click', () => {
        console.log("Игрок решил угадать досрочно. Завершаем раунд.");
        endRound(); // Вызываем уже существующую функцию!
    });  
};

// Функция для переключения между экранами
function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.style.display = 'none';
  });
  document.getElementById(screenId).style.display = 'block';
}

function findRandomStreetViewLocation(callback, attempt = 1) {
    console.log(`Попытка найти локацию №${attempt}...`);
    
    // --- НОВАЯ ЛОГИКА ---
    // 1. Случайно выбираем одну из зон поиска из файла config.js
    const randomZoneIndex = Math.floor(Math.random() * SEARCH_ZONES.length);
    const selectedZone = SEARCH_ZONES[randomZoneIndex];
    const bounds = selectedZone.bounds;
    console.log(`Выбрана зона поиска: ${selectedZone.name}`);

    // 2. Генерируем случайные координаты ВНУТРИ выбранной зоны
    const lat = bounds.sw.lat + Math.random() * (bounds.ne.lat - bounds.sw.lat);
    const lng = bounds.sw.lng + Math.random() * (bounds.ne.lng - bounds.sw.lng);
    // --- КОНЕЦ НОВОЙ ЛОГИКИ ---

    const randomLatLng = new google.maps.LatLng(lat, lng);
    const streetViewService = new google.maps.StreetViewService();

    streetViewService.getPanorama({
        location: randomLatLng,
        radius: 50000, // Используем большой радиус, т.к. некоторые зоны могут быть "пустыми"
        source: 'outdoor'
    }, (data, status) => {
        if (status === 'OK') {
            console.log("Успех! Локация найдена:", data.location.latLng.toString());
            callback(data.location.latLng);
        } else {
            if (attempt < 15) { // Увеличим число попыток, т.к. зон стало больше
                findRandomStreetViewLocation(callback, attempt + 1);
            } else {
                alert("Не удалось найти подходящую локацию. Попробуйте еще раз.");
                switchScreen('start-screen');
            }
        }
    });
}

// Шаг 3: Запуск основного игрового раунда
function startGame(location) {
  // Сброс всех переменных состояния перед новым раундом
  actualLocation = location;
  stepCount = 500;
  timeLeft = 100;
  if (timerInterval) clearInterval(timerInterval); // Очищаем старый таймер, если он был

  // Сброс маркера с предыдущей игры
  if (guessMarker) {
    guessMarker.setMap(null);
    guessMarker = null;
  }
  
  // Возвращаем кнопку Start в исходное состояние для "Play Again"
  document.getElementById('start-btn').innerText = "Начать игру";
  
  switchScreen('game-screen');
  updateUI(); // Первичное отображение UI (100 сек, 500 шагов)

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street-view"), {
      position: location,
      pov: { heading: Math.random() * 360, pitch: 0 }, // Случайный начальный обзор
      // ВАЖНЫЕ ОГРАНИЧЕНИЯ ИНТЕРФЕЙСА
      addressControl: false,
      linksControl: false,
      panControl: true, // Оставляем возможность крутить камерой
      zoomControl: false,
      disableDefaultUI: true,
      clickToGo: true,
      fullscreenControl: false,
      enableCloseButton: false,
    }
  );

  // ИСПРАВЛЕНИЕ: Правильное имя события 'pano_changed'
  panorama.addListener("pano_changed", () => {
    stepCount--;
    updateUI(); // Обновляем UI после каждого шага
    if (stepCount <= 0) {
      endRound();
    }
  });

  // Запуск таймера
  timerInterval = setInterval(() => {
    timeLeft--;
    updateUI(); // Обновляем UI каждую секунду
    if (timeLeft <= 0) {
      endRound();
    }
  }, 1000);
}

// ДОБАВЛЕНО: Функция для обновления всего игрового интерфейса
function updateUI() {
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('steps').innerText = stepCount;
}

// Шаг 4: Переход к угадыванию на карте
function endRound() {
  clearInterval(timerInterval); // Обязательно останавливаем таймер!
  console.log("Раунд окончен. Переход к карте для угадывания.");
  
  switchScreen('guess-screen');

  guessMap = new google.maps.Map(document.getElementById("guess-map"), {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    streetViewControl: false, // Отключаем иконку Street View на карте
    mapTypeControl: false    // Отключаем выбор типа карты
  });

  guessMap.addListener("click", (e) => {
    // Если маркер уже есть, перемещаем его. Если нет - создаем.
    if (!guessMarker) {
      guessMarker = new google.maps.Marker({
        position: e.latLng,
        map: guessMap,
        animation: google.maps.Animation.DROP,
        title: "Моя догадка"
      });
    } else {
      guessMarker.setPosition(e.latLng);
    }
  });
}

// Шаг 5: Расчет и показ результатов
function calculateAndShowResults(actual, guessed) {
    // Часть 1: Расчеты (остаются прежними)
    const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(actual, guessed);
    const distanceInKm = distanceInMeters / 1000;

    let score = 0;
    if (distanceInKm <= 10) {
        score = 1000;
    } else if (distanceInKm < 500) {
        score = Math.round(1000 * (1 - (distanceInKm - 10) / (500 - 10)));
    }

    // Обновляем текст с очками и расстоянием
    document.getElementById("distance-result").innerText = distanceInKm.toFixed(1);
    document.getElementById("score-result").innerText = score;
    
    // Переключаемся на экран результатов
    switchScreen('result-screen');

    // --- Часть 2: Создание карты результатов (НОВАЯ ЛОГИКА) ---

    // 1. Создаем объект карты в нашем новом div'е
    const resultsMap = new google.maps.Map(document.getElementById("result-map"), {
        // Настройки, чтобы пользователь не мог ее двигать
        gestureHandling: 'none',
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false
    });

    // 2. Создаем маркер для ПРАВИЛЬНОГО места (зеленый)
    const actualMarker = new google.maps.Marker({
        position: actual,
        map: resultsMap,
        title: "Настоящее место",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" // Стандартная зеленая иконка Google
        }
    });

    // 3. Создаем маркер для ДОГАДКИ игрока (красный)
    const guessedMarker = new google.maps.Marker({
        position: guessed,
        map: resultsMap,
        title: "Твоя догадка",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Стандартная красная иконка Google
        }
    });

    // 4. Рисуем линию между двумя точками
    const flightPath = new google.maps.Polyline({
        path: [actual, guessed],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    flightPath.setMap(resultsMap);

    // 5. Автоматически масштабируем карту, чтобы ОБА маркера были видны
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(actual);
    bounds.extend(guessed);
    resultsMap.fitBounds(bounds);
}