const songs = [
    { title: "심야영화", artist: "하현상", language: "KPOP", genre: "일렉트로닉", era: "2020년대", mood: "몽환적" },
    { title: "너란 바람 따라", artist: "IKON", language: "KPOP", genre: "발라드", era: "2020년대", mood: "애절함" },
    { title: "幾分之幾", artist: "盧廣仲", language: "기타", genre: "발라드", era: "2010년대", mood: "애절함" },
    { title: "Te Quiero", artist: "KISS OF LIFE", language: "KPOP", genre: "댄스", era: "2020년대", mood: "몽환적" },
    { title: "혜성", artist: "윤하", language: "KPOP", genre: "록", era: "2000년대", mood: "강렬함" },
    { title: "OUTSIDE", artist: "ENHYPEN", language: "KPOP", genre: "힙합", era: "2020년대", mood: "서정적" },
    { title: "이제 안녕", artist: "조유리", language: "KPOP", genre: "팝", era: "2020년대", mood: "서정적" },
    { title: "기억을 걷는 시간", artist: "넬", language: "KPOP", genre: "발라드", era: "2000년대", mood: "애절함" },
    { title: "This Love", artist: "BIGBANG", language: "KPOP", genre: "힙합", era: "2000년대", mood: "애절함" },
    { title: "쏟아져오는 바람처럼", artist: "도영", language: "KPOP", genre: "발라드", era: "2020년대", mood: "밝음" },
    { title: "20", artist: "세븐틴", language: "KPOP", genre: "댄스", era: "2010년대", mood: "밝음" },
    { title: "다시 사랑할 수 있을까", artist: "그리즐리", language: "KPOP", genre: "록", era: "2020년대", mood: "애절함" },
    { title: "nostalgia", artist: "우디", language: "KPOP", genre: "일렉트로닉", era: "2020년대", mood: "서정적" }
];

let selectedMood = "";
let selectedSituation = "";
let currentWeather = "알 수 없음";
let currentTemperature = "";
let currentHour = new Date().getHours();

function showPage(pageId) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    const pageNames = {
        home: "홈",
        list: "곡 목록",
        language: "언어별 탐색",
        genre: "장르별 탐색",
        era: "시대별 탐색",
        recommend: "곡 추천받기"
    };

    document.getElementById("currentPageName").innerText = pageNames[pageId];

    if (pageId === "list") {
        showSongs("allSongList", songs);
    }

    if (pageId === "recommend") {
        updateTime();
        loadWeather();
        updateEnergyBar();
    }
}

function showSongs(targetId, songArray) {
    const target = document.getElementById(targetId);

    if (songArray.length === 0) {
        target.innerHTML = "<p style='text-align:center;'>해당 조건의 노래가 없습니다.</p>";
        return;
    }

    let html = "";

    songArray.forEach(function(song) {
        html += `
            <div class="song-card">
                <div>
                    <div class="song-title">${song.title} - ${song.artist}</div>
                    <div class="song-info">
                        ${song.language} / ${song.genre} / ${song.era} / ${song.mood}
                    </div>
                </div>
                <div>
                    <span class="tag">${song.genre}</span>
                    <span class="tag">${song.mood}</span>
                </div>
            </div>
        `;
    });

    target.innerHTML = html;
}

function filterSongs(category, value, clickedButton) {
    const page = clickedButton.closest(".page");
    const buttons = page.querySelectorAll(".filter-buttons button");

    buttons.forEach(function(button) {
        button.classList.remove("selected");
    });

    clickedButton.classList.add("selected");

    const result = songs.filter(function(song) {
        return song[category] === value;
    });

    if (category === "language") {
        showSongs("languageSongList", result);
    } else if (category === "genre") {
        showSongs("genreSongList", result);
    } else if (category === "era") {
        showSongs("eraSongList", result);
    }
}

function selectMood(value, clickedButton) {
    selectedMood = value;

    const buttons = document.querySelectorAll(".mood-card");

    buttons.forEach(function(button) {
        button.classList.remove("selected");
    });

    clickedButton.classList.add("selected");
}

function selectSituation(value, clickedButton) {
    selectedSituation = value;

    const buttons = document.querySelectorAll(".situation-buttons button");

    buttons.forEach(function(button) {
        button.classList.remove("selected");
    });

    clickedButton.classList.add("selected");
}

function updateEnergyBar() {
    const energyRange = document.getElementById("energyRange");
    const energyValue = document.getElementById("energyValue");

    const value = energyRange.value;

    energyValue.innerText = value;

    energyRange.style.background = `linear-gradient(to right, #7b70d7 ${value}%, #e4e0f2 ${value}%)`;
}

function updateTime() {
    const now = new Date();

    currentHour = now.getHours();

    const timeString = now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("timeText").innerText = timeString;
}

setInterval(updateTime, 1000);

function weatherCodeToText(code) {
    if (code === 0) return "맑음";
    if (code >= 1 && code <= 3) return "흐림";
    if (code >= 45 && code <= 48) return "안개";
    if (code >= 51 && code <= 67) return "비";
    if (code >= 71 && code <= 77) return "눈";
    if (code >= 80 && code <= 82) return "소나기";
    if (code >= 95) return "천둥";
    return "알 수 없음";
}

function loadWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                getWeather(position.coords.latitude, position.coords.longitude);
            },
            function() {
                getWeather(37.5665, 126.9780);
            }
        );
    } else {
        getWeather(37.5665, 126.9780);
    }
}

function getWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const temp = data.current.temperature_2m;
            const code = data.current.weather_code;

            currentWeather = weatherCodeToText(code);
            currentTemperature = temp + "°C";

            document.getElementById("weatherText").innerText = currentWeather + " " + currentTemperature;
        })
        .catch(function() {
            currentWeather = "흐림";
            currentTemperature = "정보 없음";

            document.getElementById("weatherText").innerText = "날씨 정보를 불러오지 못했습니다";
        });
}

function getTimeMood() {
    if (currentHour >= 5 && currentHour < 12) {
        return "밝음";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "강렬함";
    } else if (currentHour >= 18 && currentHour < 23) {
        return "서정적";
    } else {
        return "몽환적";
    }
}

function getUserMoodToSongMood() {
    if (selectedMood === "평온해요") return "서정적";
    if (selectedMood === "우울해요") return "애절함";
    if (selectedMood === "설레요") return "밝음";
    if (selectedMood === "신나요") return "강렬함";
    if (selectedMood === "지쳤어요") return "몽환적";
    return getTimeMood();
}

function getWeatherMood() {
    if (currentWeather === "비") return "애절함";
    if (currentWeather === "눈") return "서정적";
    if (currentWeather === "맑음") return "밝음";
    if (currentWeather === "흐림") return "몽환적";
    return getTimeMood();
}

function shuffleArray(array) {
    return array.sort(function() {
        return Math.random() - 0.5;
    });
}

function recommendSongs() {
    if (selectedMood === "") {
        alert("기분을 선택해주세요.");
        return;
    }

    if (selectedSituation === "") {
        alert("상황을 선택해주세요.");
        return;
    }

    const energy = Number(document.getElementById("energyRange").value);

    const moodFromUser = getUserMoodToSongMood();
    const moodFromWeather = getWeatherMood();
    const moodFromTime = getTimeMood();

    let scoredSongs = songs.map(function(song) {
        let score = 0;

        if (song.mood === moodFromUser) score += 4;
        if (song.mood === moodFromWeather) score += 3;
        if (song.mood === moodFromTime) score += 2;

        if (selectedSituation === "공부 / 작업" && (song.mood === "서정적" || song.mood === "몽환적")) score += 2;
        if (selectedSituation === "산책 / 운동" && (song.mood === "밝음" || song.mood === "강렬함")) score += 2;
        if (selectedSituation === "이동 중" && (song.genre === "팝" || song.genre === "댄스" || song.genre === "힙합")) score += 2;
        if (selectedSituation === "집 / 휴식" && (song.mood === "서정적" || song.mood === "애절함")) score += 2;

        if (energy >= 70 && (song.mood === "밝음" || song.mood === "강렬함")) score += 2;
        if (energy <= 30 && (song.mood === "몽환적" || song.mood === "서정적" || song.mood === "애절함")) score += 2;

        return {
            song: song,
            score: score
        };
    });

    scoredSongs.sort(function(a, b) {
        return b.score - a.score;
    });

    const topScore = scoredSongs[0].score;

    let candidates = scoredSongs.filter(function(item) {
        return item.score >= topScore - 2;
    });

    candidates = shuffleArray(candidates);

    const recommended = candidates.slice(0, 3);

    let html = `
        <h2 style="text-align:center;">추천 결과</h2>

        <div class="recommend-reason">
            현재 선택한 기분은 <strong>${selectedMood}</strong>, 상황은 <strong>${selectedSituation}</strong>입니다.<br>
            현재 에너지는 <strong>${energy}%</strong>입니다.<br>
            현재 시간대 기준 분위기는 <strong>${moodFromTime}</strong>, 날씨 기준 분위기는 <strong>${moodFromWeather}</strong>로 판단했습니다.<br>
            이 조건을 바탕으로 어울리는 노래 3곡을 추천합니다.
        </div>
    `;

    recommended.forEach(function(item, index) {
        const song = item.song;

        html += `
            <div class="song-card">
                <div>
                    <div class="song-title">${index + 1}. ${song.title} - ${song.artist}</div>
                    <div class="song-info">
                        ${song.language} / ${song.genre} / ${song.era} / ${song.mood}
                    </div>
                </div>
                <div>
                    <span class="tag">${song.mood}</span>
                </div>
            </div>
        `;
    });

    const resultBox = document.getElementById("recommendResult");

    resultBox.innerHTML = html;
    resultBox.style.display = "block";
}

showSongs("allSongList", songs);
updateTime();
updateEnergyBar();