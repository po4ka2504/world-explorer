// =================================================================================
// LOCALIZATION DATA
// All text strings for different languages are stored here.
// =================================================================================

const translations = {
    // Existing Languages
    en: {
        startGame: "Start Game", settings: "Settings", loading: "Finding an interesting place...", gameSettings: "Game Settings", roundTimer: "Round Timer:", searchZones: "Search Zones:", save: "Save", backToMenu: "Back to Menu", select_all: "Select All", time: "Time", moves: "Moves", quitGame: "Main Menu", guessNow: "Guess!", whereAreYou: "Where do you think you are?", confirmGuess: "Confirm Guess", roundComplete: "Round Complete!", distance: "Distance", roundScore: "Round Score", targetLocation: "Target Location:", yourGuess: "Your Guess:", sessionFor: "Session for", totalScore: "Total Score:", roundHistory: "Round History", playAnotherRound: "Play Another Round", endSession: "End Session & Return to Menu", round: "Round", placeMarkerPrompt: "Please place a marker on the map to make a guess!", selectZonePrompt: "Please select at least one search zone in the Settings!", locationNotFound: "Could not find a suitable location. Please try again.", settingsSaved: "Settings saved!", loadingLocation: "Loading...", locationNotFound_Geocode: "Location not found",
        hint: "Hint",
        hintTooltip: "Pressing this button will decrease the overall time by 30%!",
        countryHint: "The country is: ",
        countryNotFound: "Could not determine the country.",
        geocodeError: "Hint unavailable due to a geocoding error.",
        enterYourName: "Enter Your Name",
        continue: "Continue",
        nameRequired: "Please enter a name to continue."
    },
    de: {
        startGame: "Spiel starten", settings: "Einstellungen", loading: "Suche einen interessanten Ort...", gameSettings: "Spieleinstellungen", roundTimer: "Runden-Timer:", searchZones: "Suchzonen:", save: "Speichern", backToMenu: "Zurück zum Menü", select_all: "Alle auswählen", time: "Zeit", moves: "Züge", quitGame: "Hauptmenü", guessNow: "Raten!", whereAreYou: "Wo glaubst du, bist du?", confirmGuess: "Vermutung bestätigen", roundComplete: "Runde abgeschlossen!", distance: "Distanz", roundScore: "Runden-Punktzahl", targetLocation: "Zielort:", yourGuess: "Deine Vermutung:", sessionFor: "Sitzung für", totalScore: "Gesamtpunktzahl:", roundHistory: "Rundenverlauf", playAnotherRound: "Noch eine Runde spielen", endSession: "Sitzung beenden & zum Menü", round: "Runde", placeMarkerPrompt: "Bitte platziere eine Markierung auf der Karte, um zu raten!", selectZonePrompt: "Bitte wähle mindestens eine Suchzone in den Einstellungen aus!", locationNotFound: "Konnte keinen passenden Ort finden. Bitte versuche es erneut.", settingsSaved: "Einstellungen gespeichert!", loadingLocation: "Wird geladen...", locationNotFound_Geocode: "Ort nicht gefunden",
        enterYourName: "Gib deinen Namen ein",
        continue: "Weiter",
        nameRequired: "Bitte gib einen Namen ein, um fortzufahren."
    },
    fr: {
        startGame: "Commencer le jeu", settings: "Paramètres", loading: "Recherche d'un lieu intéressant...", gameSettings: "Paramètres du jeu", roundTimer: "Chronomètre :", searchZones: "Zones de recherche :", save: "Sauvegarder", backToMenu: "Retour au menu", select_all: "Tout sélectionner", time: "Temps", moves: "Déplacements", quitGame: "Menu principal", guessNow: "Deviner !", whereAreYou: "Où pensez-vous être ?", confirmGuess: "Confirmer la supposition", roundComplete: "Manche terminée !", distance: "Distance", roundScore: "Score de la manche", targetLocation: "Lieu cible :", yourGuess: "Votre supposition :", sessionFor: "Session pour", totalScore: "Score total :", roundHistory: "Historique des manches", playAnotherRound: "Jouer une autre manche", endSession: "Terminer la session et revenir au menu", round: "Manche", placeMarkerPrompt: "Veuillez placer un marqueur sur la carte pour deviner !", selectZonePrompt: "Veuillez sélectionner au moins une zone de recherche dans les paramètres !", locationNotFound: "Impossible de trouver un emplacement approprié. Veuillez réessayer.", settingsSaved: "Paramètres sauvegardés !", loadingLocation: "Chargement...", locationNotFound_Geocode: "Lieu non trouvé",
        enterYourName: "Entrez votre nom",
        continue: "Continuer",
        nameRequired: "Veuillez entrer un nom pour continuer."
    },
    uk: {
        startGame: "Почати гру", settings: "Налаштування", loading: "Шукаємо цікаве місце...", gameSettings: "Налаштування гри", roundTimer: "Таймер раунду:", searchZones: "Зони пошуку:", save: "Зберегти", backToMenu: "До меню", select_all: "Обрати всі", time: "Час", moves: "Кроки", quitGame: "Головне меню", guessNow: "Вгадати!", whereAreYou: "Як ви думаєте, де ви?", confirmGuess: "Підтвердити здогадку", roundComplete: "Раунд завершено!", distance: "Відстань", roundScore: "Очки за раунд", targetLocation: "Цільова локація:", yourGuess: "Ваша здогадка:", sessionFor: "Сесія для", totalScore: "Загальний рахунок:", roundHistory: "Історія раундів", playAnotherRound: "Зіграти ще раунд", endSession: "Завершити сесію і повернутися в меню", round: "Раунд", placeMarkerPrompt: "Будь ласка, поставте маркер на карті, щоб зробити припущення!", selectZonePrompt: "Будь ласка, оберіть хоча б одну зону пошуку в налаштуваннях!", locationNotFound: "Не вдалося знайти відповідне місце. Спробуйте ще раз.", settingsSaved: "Налаштування збережено!", loadingLocation: "Завантаження...", locationNotFound_Geocode: "Місце не знайдено",
        enterYourName: "Введіть ваше ім'я",
        continue: "Продовжити",
        nameRequired: "Будь ласка, введіть ім'я, щоб продовжити."
    },
    ru: {
        startGame: "Начать игру", settings: "Настройки", loading: "Ищем интересное место...", gameSettings: "Настройки игры", roundTimer: "Таймер раунда:", searchZones: "Зоны поиска:", save: "Сохранить", backToMenu: "В меню", select_all: "Выбрать все", time: "Время", moves: "Шаги", quitGame: "Главное меню", guessNow: "Угадать!", whereAreYou: "Как вы думаете, где вы?", confirmGuess: "Подтвердить догадку", roundComplete: "Раунд завершен!", distance: "Расстояние", roundScore: "Очки за раунд", targetLocation: "Целевая локация:", yourGuess: "Ваша догадка:", sessionFor: "Сессия для", totalScore: "Общий счет:", roundHistory: "История раундов", playAnotherRound: "Сыграть еще раунд", endSession: "Завершить сессию и вернуться в меню", round: "Раунд", placeMarkerPrompt: "Пожалуйста, поставьте маркер на карте, чтобы сделать предположение!", selectZonePrompt: "Пожалуйста, выберите хотя бы одну зону поиска в настройках!", locationNotFound: "Не удалось найти подходящее место. Попробуйте еще раз.", settingsSaved: "Настройки сохранены!", loadingLocation: "Загрузка...", locationNotFound_Geocode: "Место не найдено",
        enterYourName: "Введите ваше имя",
        continue: "Продолжить",
        nameRequired: "Пожалуйста, введите имя, чтобы продолжить."
    },

    // --- NEW LANGUAGES ---
    es: { // Spanish
        startGame: "Iniciar Juego", settings: "Ajustes", loading: "Buscando un lugar interesante...", gameSettings: "Ajustes del Juego", roundTimer: "Temporizador:", searchZones: "Zonas de Búsqueda:", save: "Guardar", backToMenu: "Volver al Menú", select_all: "Seleccionar Todo", time: "Tiempo", moves: "Movimientos", quitGame: "Menú Principal", guessNow: "¡Adivinar!", whereAreYou: "¿Dónde crees que estás?", confirmGuess: "Confirmar Suposición", roundComplete: "¡Ronda Completa!", distance: "Distancia", roundScore: "Puntuación de Ronda", targetLocation: "Ubicación Real:", yourGuess: "Tu Suposición:", sessionFor: "Sesión de", totalScore: "Puntuación Total:", roundHistory: "Historial de Rondas", playAnotherRound: "Jugar Otra Ronda", endSession: "Finalizar Sesión", round: "Ronda", placeMarkerPrompt: "¡Por favor, coloca un marcador en el mapa para adivinar!", selectZonePrompt: "¡Por favor, selecciona al menos una zona de búsqueda en los Ajustes!", locationNotFound: "No se pudo encontrar una ubicación adecuada. Por favor, inténtalo de nuevo.", settingsSaved: "¡Ajustes guardados!", loadingLocation: "Cargando...", locationNotFound_Geocode: "Ubicación no encontrada",
        enterYourName: "Ingresa tu nombre",
        continue: "Continuar",
        nameRequired: "Por favor, ingresa un nombre para continuar."
    },
    pt: { // Portuguese
        startGame: "Começar Jogo", settings: "Configurações", loading: "A encontrar um lugar interessante...", gameSettings: "Configurações do Jogo", roundTimer: "Temporizador:", searchZones: "Zonas de Pesquisa:", save: "Salvar", backToMenu: "Voltar ao Menu", select_all: "Selecionar Tudo", time: "Tempo", moves: "Movimentos", quitGame: "Menu Principal", guessNow: "Adivinhar!", whereAreYou: "Onde você acha que está?", confirmGuess: "Confirmar Palpite", roundComplete: "Rodada Completa!", distance: "Distância", roundScore: "Pontuação da Rodada", targetLocation: "Localização Real:", yourGuess: "Seu Palpite:", sessionFor: "Sessão de", totalScore: "Pontuação Total:", roundHistory: "Histórico de Rodadas", playAnotherRound: "Jogar Outra Rodada", endSession: "Terminar Sessão", round: "Rodada", placeMarkerPrompt: "Por favor, coloque um marcador no mapa para dar um palpite!", selectZonePrompt: "Por favor, selecione pelo menos uma zona de pesquisa nas Configurações!", locationNotFound: "Não foi possível encontrar um local adequado. Por favor, tente novamente.", settingsSaved: "Configurações salvas!", loadingLocation: "A carregar...", locationNotFound_Geocode: "Localização não encontrada",
        enterYourName: "Digite seu nome",
        continue: "Continuar",
        nameRequired: "Por favor, digite um nome para continuar."
    },
    it: { // Italian
        startGame: "Inizia Gioco", settings: "Impostazioni", loading: "Sto cercando un posto interessante...", gameSettings: "Impostazioni di Gioco", roundTimer: "Timer:", searchZones: "Zone di Ricerca:", save: "Salva", backToMenu: "Torna al Menu", select_all: "Seleziona Tutto", time: "Tempo", moves: "Mosse", quitGame: "Menu Principale", guessNow: "Indovina!", whereAreYou: "Dove pensi di essere?", confirmGuess: "Conferma Ipotesi", roundComplete: "Round Completato!", distance: "Distanza", roundScore: "Punteggio del Round", targetLocation: "Posizione Reale:", yourGuess: "La Tua Ipotesi:", sessionFor: "Sessione di", totalScore: "Punteggio Totale:", roundHistory: "Cronologia Round", playAnotherRound: "Gioca un Altro Round", endSession: "Termina Sessione", round: "Round", placeMarkerPrompt: "Per favore, metti un indicatore sulla mappa per fare un'ipotesi!", selectZonePrompt: "Seleziona almeno una zona di ricerca nelle Impostazioni!", locationNotFound: "Impossibile trovare una posizione adatta. Riprova.", settingsSaved: "Impostazioni salvate!", loadingLocation: "Caricamento...", locationNotFound_Geocode: "Posizione non trovata",
        enterYourName: "Inserisci il tuo nome",
        continue: "Continua",
        nameRequired: "Inserisci un nome per continuare."
    },
    zh: { // Chinese (Simplified)
        startGame: "开始游戏", settings: "设置", loading: "正在寻找一个有趣的地方...", gameSettings: "游戏设置", roundTimer: "回合计时器:", searchZones: "搜索区域:", save: "保存", backToMenu: "返回菜单", select_all: "全选", time: "时间", moves: "步数", quitGame: "主菜单", guessNow: "猜测!", whereAreYou: "你认为你在哪里？", confirmGuess: "确认猜测", roundComplete: "回合完成!", distance: "距离", roundScore: "回合得分", targetLocation: "目标地点:", yourGuess: "你的猜测:", sessionFor: "会话:", totalScore: "总分:", roundHistory: "回合历史", playAnotherRound: "再玩一局", endSession: "结束会话", round: "回合", placeMarkerPrompt: "请在地图上放置一个标记进行猜测！", selectZonePrompt: "请在设置中至少选择一个搜索区域！", locationNotFound: "未能找到合适的地点。请再试一次。", settingsSaved: "设置已保存！", loadingLocation: "加载中...", locationNotFound_Geocode: "未找到位置",
        enterYourName: "输入你的名字",
        continue: "继续",
        nameRequired: "请输入名字以继续。"
    },
    ja: { // Japanese
        startGame: "ゲーム開始", settings: "設定", loading: "面白い場所を探しています...", gameSettings: "ゲーム設定", roundTimer: "ラウンドタイマー:", searchZones: "検索ゾーン:", save: "保存", backToMenu: "メニューに戻る", select_all: "すべて選択", time: "時間", moves: "移動回数", quitGame: "メインメニュー", guessNow: "推測する!", whereAreYou: "どこにいると思いますか？", confirmGuess: "推測を確定", roundComplete: "ラウンド完了！", distance: "距離", roundScore: "ラウンドスコア", targetLocation: "実際の場所:", yourGuess: "あなたの推測:", sessionFor: "セッション:", totalScore: "合計スコア:", roundHistory: "ラウンド履歴", playAnotherRound: "もう一度プレイ", endSession: "セッションを終了", round: "ラウンド", placeMarkerPrompt: "推測するには地図にマーカーを設置してください！", selectZonePrompt: "設定で少なくとも1つの検索ゾーンを選択してください！", locationNotFound: "適切な場所が見つかりませんでした。もう一度お試しください。", settingsSaved: "設定が保存されました！", loadingLocation: "読み込み中...", locationNotFound_Geocode: "場所が見つかりません",
        enterYourName: "あなたの名前を入力してください",
        continue: "続ける",
        nameRequired: "続け���には名前を入力してください。"
    },
    ko: { // Korean
        startGame: "게임 시작", settings: "설정", loading: "흥미로운 장소를 찾고 있습니다...", gameSettings: "게임 설정", roundTimer: "라운드 타이머:", searchZones: "검색 구역:", save: "저장", backToMenu: "메뉴로 돌아가기", select_all: "모두 선택", time: "시간", moves: "이동 횟수", quitGame: "메인 메뉴", guessNow: "추측!", whereAreYou: "어디라고 생각하세요?", confirmGuess: "추측 확인", roundComplete: "라운드 완료!", distance: "거리", roundScore: "라운드 점수", targetLocation: "실제 위치:", yourGuess: "내 추측:", sessionFor: "세션:", totalScore: "총 점수:", roundHistory: "라운드 기록", playAnotherRound: "다시 플레이", endSession: "세션 종료", round: "라운드", placeMarkerPrompt: "추측하려면 지도에 마커를 배치하세요!", selectZonePrompt: "설정에서 하나 이상의 검색 구역을 선택하세요!", locationNotFound: "적절한 위치를 찾을 수 없습니다. 다시 시도하십시오.", settingsSaved: "설정이 저장되었습니다!", loadingLocation: "로드 중...", locationNotFound_Geocode: "위치를 찾을 수 없음",
        enterYourName: "이름을 입력하세요",
        continue: "계속",
        nameRequired: "계속하려면 이름을 입력하십시오."
    },
    ar: { // Arabic
        startGame: "بدء اللعبة", settings: "الإعدادات", loading: "جاري البحث عن مكان مثير للاهتمام...", gameSettings: "إعدادات اللعبة", roundTimer: "مؤقت الجولة:", searchZones: "مناطق البحث:", save: "حفظ", backToMenu: "العودة إلى القائمة", select_all: "تحديد الكل", time: "الوقت", moves: "الحركات", quitGame: "القائمة الرئيسية", guessNow: "تخمين!", whereAreYou: "أين تعتقد أنك؟", confirmGuess: "تأكيد التخمين", roundComplete: "اكتملت الجولة!", distance: "المسافة", roundScore: "نقاط الجولة", targetLocation: "الموقع الفعلي:", yourGuess: "تخمينك:", sessionFor: "جلسة لـ", totalScore: "النتيجة الإجمالية:", roundHistory: "سجل الجولات", playAnotherRound: "العب جولة أخرى", endSession: "إنهاء الجلسة", round: "جولة", placeMarkerPrompt: "يرجى وضع علامة على الخريطة لتقديم تخمين!", selectZonePrompt: "يرجى تحديد منطقة بحث واحدة على الأقل في الإعدادات!", locationNotFound: "تعذر ��لعثور على موقع مناسب. يرجى المحاولة مرة أخرى.", settingsSaved: "تم حفظ الإعدادات!", loadingLocation: "جار التحميل...", locationNotFound_Geocode: "لم يتم العثور على الموقع",
        enterYourName: "أدخل اسمك",
        continue: "متابعة",
        nameRequired: "يرجى إدخال اسم للمتابعة."
    },
    hi: { // Hindi
        startGame: "खेल शुरू करें", settings: "सेटिंग्स", loading: "एक दिलचस्प जगह ढूंढ रहा है...", gameSettings: "खेल सेटिंग्स", roundTimer: "राउंड टाइमर:", searchZones: "खोज क्षेत्र:", save: "सहेजें", backToMenu: "मेनू पर वापस जाएं", select_all: "सभी का चयन करें", time: "समय", moves: "चालें", quitGame: "मुख्य मेनू", guessNow: "अनुमान लगाएं!", whereAreYou: "आपको क्या लगता है कि आप कहाँ हैं?", confirmGuess: "अनुमान की पुष्टि करें", roundComplete: "राउंड पूरा हुआ!", distance: "दूरी", roundScore: "राउंड स्कोर", targetLocation: "वास्तविक स्थान:", yourGuess: "आपका अनुमान:", sessionFor: "के लिए सत्र", totalScore: "कुल स्कोर:", roundHistory: "राउंड इतिहास", playAnotherRound: "एक और राउंड खेलें", endSession: "सत्र समाप्त करें", round: "राउंड", placeMarkerPrompt: "अनुमान लगाने के लिए कृपया मानचित्र पर एक मार्कर लगाएं!", selectZonePrompt: "कृपया सेटिंग्स में कम से कम एक खोज क्षेत्र चुनें!", locationNotFound: "एक उपयुक्त स्थान नहीं मिल सका। कृपया पुनः प्रयास करें।", settingsSaved: "सेटिंग्स सहेजी गईं!", loadingLocation: "लोड हो रहा है...", locationNotFound_Geocode: "स्थान नहीं मिला",
        enterYourName: "अपना नाम दर्ज करें",
        continue: "जारी रखें",
        nameRequired: "जारी रखने के लिए कृपया एक नाम दर्ज करें।"
    },
    pl: { // Polish
        startGame: "Rozpocznij grę", settings: "Ustawienia", loading: "Szukam interesującego miejsca...", gameSettings: "Ustawienia gry", roundTimer: "Licznik czasu:", searchZones: "Strefy wyszukiwania:", save: "Zapisz", backToMenu: "Powrót do menu", select_all: "Zaznacz wszystko", time: "Czas", moves: "Ruchy", quitGame: "Menu główne", guessNow: "Zgaduj!", whereAreYou: "Jak myślisz, gdzie jesteś?", confirmGuess: "Potwierdź zgadywanie", roundComplete: "Runda zakończona!", distance: "Dystans", roundScore: "Wynik rundy", targetLocation: "Rzeczywista lokalizacja:", yourGuess: "Twoje zgadnięcie:", sessionFor: "Sesja dla", totalScore: "Całkowity wynik:", roundHistory: "Historia rund", playAnotherRound: "Zagraj kolejną rundę", endSession: "Zakończ sesję", round: "Runda", placeMarkerPrompt: "Umieść znacznik na mapie, aby zgadnąć!", selectZonePrompt: "Wybierz co najmniej jedną strefę wyszukiwania w Ustawieniach!", locationNotFound: "Nie udało się znaleźć odpowiedniej lokalizacji. Spróbuj ponownie.", settingsSaved: "Ustawienia zapisane!", loadingLocation: "Ładowanie...", locationNotFound_Geocode: "Nie znaleziono lokalizacji",
        enterYourName: "Wpisz swoje imię",
        continue: "Kontynuuj",
        nameRequired: "Proszę wpisać imię, aby kontynuować."
    },
    tr: { // Turkish
        startGame: "Oyuna Başla", settings: "Ayarlar", loading: "İlginç bir yer bulunuyor...", gameSettings: "Oyun Ayarları", roundTimer: "Tur Zamanlayıcısı:", searchZones: "Arama Bölgeleri:", save: "Kaydet", backToMenu: "Menüye Dön", select_all: "Tümünü Seç", time: "Süre", moves: "Hamle", quitGame: "Ana Menü", guessNow: "Tahmin Et!", whereAreYou: "Nerede olduğunuzu düşünüyorsunuz?", confirmGuess: "Tahmini Onayla", roundComplete: "Tur Tamamlandı!", distance: "Mesafe", roundScore: "Tur Puanı", targetLocation: "Gerçek Konum:", yourGuess: "Tahmininiz:", sessionFor: "Oturum:", totalScore: "Toplam Puan:", roundHistory: "Tur Geçmişi", playAnotherRound: "Bir Tur Daha Oyna", endSession: "Oturumu Bitir", round: "Tur", placeMarkerPrompt: "Tahmin etmek için lütfen haritaya bir işaretçi yerleştirin!", selectZonePrompt: "Lütfen Ayarlar'da en az bir arama bölgesi seçin!", locationNotFound: "Uygun bir konum bulunamadı. Lütfen tekrar deneyin.", settingsSaved: "Ayarlar kaydedildi!", loadingLocation: "Yükleniyor...", locationNotFound_Geocode: "Konum bulunamadı",
        enterYourName: "Adınızı girin",
        continue: "Devam et",
        nameRequired: "Devam etmek için lütfen bir ad girin."
    },
    nl: { // Dutch
        startGame: "Start Spel", settings: "Instellingen", loading: "Een interessante plek zoeken...", gameSettings: "Spelinstellingen", roundTimer: "Rondetimer:", searchZones: "Zoekzones:", save: "Opslaan", backToMenu: "Terug naar Menu", select_all: "Alles selecteren", time: "Tijd", moves: "Zetten", quitGame: "Hoofdmenu", guessNow: "Raad!", whereAreYou: "Waar denk je dat je bent?", confirmGuess: "Gok bevestigen", roundComplete: "Ronde voltooid!", distance: "Afstand", roundScore: "Rondescore", targetLocation: "Echte locatie:", yourGuess: "Jouw gok:", sessionFor: "Sessie voor", totalScore: "Totaalscore:", roundHistory: "Rondegeschiedenis", playAnotherRound: "Nog een ronde spelen", endSession: "Sessie beëindigen", round: "Ronde", placeMarkerPrompt: "Plaats een marker op de kaart om een gok te wagen!", selectZonePrompt: "Selecteer ten minste één zoekzone in de Instellingen!", locationNotFound: "Kon geen geschikte locatie vinden. Probeer het opnieuw.", settingsSaved: "Instellingen opgeslagen!", loadingLocation: "Laden...", locationNotFound_Geocode: "Locatie niet gevonden",
        enterYourName: "Voer je naam in",
        continue: "Doorgaan",
        nameRequired: "Voer een naam in om door te gaan."
    },
    sv: { // Swedish
        startGame: "Starta spel", settings: "Inställningar", loading: "Letar efter en intressant plats...", gameSettings: "Spelinställningar", roundTimer: "Rundtimer:", searchZones: "Sökzoner:", save: "Spara", backToMenu: "Tillbaka till menyn", select_all: "Välj alla", time: "Tid", moves: "Drag", quitGame: "Huvudmeny", guessNow: "Gissa!", whereAreYou: "Var tror du att du är?", confirmGuess: "Bekräfta gissning", roundComplete: "Runda avklarad!", distance: "Avstånd", roundScore: "Rundpoäng", targetLocation: "Verklig plats:", yourGuess: "Din gissning:", sessionFor: "Session för", totalScore: "Totalpoäng:", roundHistory: "Rundhistorik", playAnotherRound: "Spela en runda till", endSession: "Avsluta session", round: "Runda", placeMarkerPrompt: "Placera en markör på kartan för att gissa!", selectZonePrompt: "Välj minst en sökzon i Inställningar!", locationNotFound: "Kunde inte hitta en lämplig plats. Försök igen.", settingsSaved: "Inställningar sparade!", loadingLocation: "Laddar...", locationNotFound_Gocode: "Platsen hittades inte",
        enterYourName: "Ange ditt namn",
        continue: "Fortsätt",
        nameRequired: "Ange ett namn för att fortsätta."
    }
};

let currentLanguage = 'en'; // Default language

const languageMap = {
    en: 'English',
    de: 'German',
    fr: 'French',
    uk: 'Ukrainian',
    ru: 'Russian',
    es: 'Spanish',
    pt: 'Portuguese',
    it: 'Italian',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
    ar: 'Arabic',
    hi: 'Hindi',
    pl: 'Polish',
    tr: 'Turkish',
    nl: 'Dutch',
    sv: 'Swedish'
};