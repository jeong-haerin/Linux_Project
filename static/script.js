let songs = [];

let selectedMood = "";
let selectedSituation = "";
let currentWeather = "알 수 없음";
let currentTemperature = "";
let currentHour = new Date().getHours();

const sqlFileUrls = [
    "/database/songs.sql"
];

function normalizeLanguage(languageType) {
    if (languageType === "KPOP") {
        return "KPOP";
    }

    if (languageType === "POP") {
        return "POP";
    }

    return "기타";
}

function normalizeGenre(genre) {
    if (genre === "락") {
        return "록";
    }

    if (genre === "알앤비") {
        return "R&B";
    }

    if (genre === "댄") {
        return "댄스";
    }

    return genre;
}

function normalizeMood(mood) {
    if (mood === "밝고 경쾌") {
        return "밝음";
    }

    if (mood === "쓸쓸함" || mood === "아련함" || mood === "외로움") {
        return "애절함";
    }

    if (mood === "몽환적, 나른") {
        return "몽환적";
    }

    return mood;
}

function parseSqlValues(sqlText) {
    const valuesIndex = sqlText.indexOf("VALUES");

    if (valuesIndex === -1) {
        return [];
    }

    const valuesText = sqlText.slice(valuesIndex + 6);
    const rows = [];

    let row = null;
    let value = "";
    let inQuote = false;

    for (let i = 0; i < valuesText.length; i++) {
        const char = valuesText[i];
        const nextChar = valuesText[i + 1];

        if (char === "'") {
            if (inQuote && nextChar === "'") {
                value += "'";
                i++;
            } else {
                inQuote = !inQuote;
            }
            continue;
        }

        if (row === null) {
            if (char === "(") {
                row = [];
                value = "";
            }
            continue;
        }

        if (inQuote) {
            value += char;
            continue;
        }

        if (char === ",") {
            row.push(value.trim());
            value = "";
            continue;
        }

        if (char === ")") {
            row.push(value.trim());

            if (row.length >= 10) {
                rows.push(row.slice(0, 10));
            }

            row = null;
            value = "";
            continue;
        }

        value += char;
    }

    return rows;
}

function convertRowToSong(row) {
    const languageType = row[2];
    const genre = normalizeGenre(row[3]);
    const mood = normalizeMood(row[5]);

    return {
        title: row[0],
        artist: row[1],
        originalLanguage: languageType,
        language: normalizeLanguage(languageType),
        genre: genre,
        era: row[4],
        mood: mood,
        youtube_link: row[6],
        melon_link: row[7],
        apple_music_link: row[8],
        spotify_link: row[9]
    };
}

function loadSongsFromSql() {
    const allSongList = document.getElementById("allSongList");

    if (allSongList) {
        allSongList.innerHTML = "<p>노래 목록을 불러오는 중입니다.</p>";
    }

    Promise.all(
        sqlFileUrls.map(function(url) {
            return fetch(url).then(function(response) {
                return response.text();
            });
        })
    )
        .then(function(sqlTexts) {
            let loadedSongs = [];

            sqlTexts.forEach(function(sqlText) {
                const rows = parseSqlValues(sqlText);

                rows.forEach(function(row) {
                    loadedSongs.push(convertRowToSong(row));
                });
            });

            songs = loadedSongs;

            showSongs("allSongList", songs);
        })
        .catch(function(error) {
            console.log("SQL 파일을 불러오지 못했습니다.", error);

            if (allSongList) {
                allSongList.innerHTML = "<p>노래 데이터를 불러오지 못했습니다.</p>";
            }
        });
}

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

    if (!target) {
        return;
    }

    if (songArray.length === 0) {
        target.innerHTML = "<p>해당 조건의 노래가 없습니다.</p>";
        return;
    }

    let html = "";

    songArray.forEach(function(song) {
        html += `
            <div class="song-card">
                <h3>${song.title} - ${song.artist}</h3>

                <p class="song-info">
                    ${song.language} / ${song.genre} / ${song.era} / ${song.mood}
                </p>

                <div class="song-links">
                    ${song.youtube_link ? `<a href="${song.youtube_link}" target="_blank">YouTube</a>` : ""}
                    ${song.melon_link ? `<a href="${song.melon_link}" target="_blank">Melon</a>` : ""}
                    ${song.apple_music_link ? `<a href="${song.apple_music_link}" target="_blank">Apple Music</a>` : ""}
                    ${song.spotify_link ? `<a href="${song.spotify_link}" target="_blank">Spotify</a>` : ""}
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

    let result = [];

    if (category === "era" && (value === "이전" || value === "1990년대 이전")) {
    result = songs.filter(function(song) {
        return song.era !== "2020년대" &&
               song.era !== "2010년대" &&
               song.era !== "2000년대";
    });
} else {
    result = songs.filter(function(song) {
        return song[category] === value;
    });
}

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

    if (!energyRange || !energyValue) {
        return;
    }

    const value = energyRange.value;
    energyValue.innerText = `에너지 단계 ${value}`;

    const percent = (value / 5) * 100;
    
    energyRange.style.background = "#7b70d7";
}

function updateTime() {
    const now = new Date();

    currentHour = now.getHours();

    const timeString = now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const timeText = document.getElementById("timeText");

    if (timeText) {
        timeText.innerText = timeString;
    }
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

            const weatherText = document.getElementById("weatherText");

            if (weatherText) {
                weatherText.innerText = currentWeather + " " + currentTemperature;
            }
        })
        .catch(function() {
            currentWeather = "흐림";
            currentTemperature = "정보 없음";

            const weatherText = document.getElementById("weatherText");

            if (weatherText) {
                weatherText.innerText = "날씨 정보를 불러오지 못했습니다";
            }
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
    if (songs.length === 0) {
        alert("노래 목록을 아직 불러오는 중입니다.");
        return;
    }

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

        if (selectedSituation === "공부 / 작업" && (song.mood === "서정적" || song.mood === "몽환적")) {
            score += 2;
        }

        if (selectedSituation === "산책 / 운동" && (song.mood === "밝음" || song.mood === "강렬함")) {
            score += 2;
        }

        if (selectedSituation === "이동 중" && (song.genre === "팝" || song.genre === "댄스" || song.genre === "힙합")) {
            score += 2;
        }

        if (selectedSituation === "집 / 휴식" && (song.mood === "서정적" || song.mood === "애절함")) {
            score += 2;
        }

        if (energy >= 4 && (song.mood === "밝음" || song.mood === "강렬함")) {
            score += 2;
        }

        if (energy <= 2 && (song.mood === "몽환적" || song.mood === "서정적" || song.mood === "애절함")) {
            score += 2;
        }

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
        <h2>추천 결과</h2>
        <p>현재 선택한 기분은 ${selectedMood}, 상황은 ${selectedSituation}입니다.</p>
        <p>현재 에너지는 ${energy} 단계입니다.</p>
        <p>현재 시간대 기준 분위기는 ${moodFromTime}, 날씨 기준 분위기는 ${moodFromWeather}로 판단했습니다.</p>
        <p>이 조건을 바탕으로 어울리는 노래 3곡을 추천합니다.</p>
    `;

    recommended.forEach(function(item, index) {
        const song = item.song;

        html += `
            <div class="song-card">
                <h3>${index + 1}. ${song.title} - ${song.artist}</h3>
                <p>${song.language} / ${song.genre} / ${song.era} / ${song.mood}</p>
                <span>${song.mood}</span>
                <div class="song-links">
                    ${song.youtube_link ? `<a href="${song.youtube_link}" target="_blank">YouTube</a>` : ""}
                    ${song.melon_link ? `<a href="${song.melon_link}" target="_blank">Melon</a>` : ""}
                    ${song.apple_music_link ? `<a href="${song.apple_music_link}" target="_blank">Apple Music</a>` : ""}
                    ${song.spotify_link ? `<a href="${song.spotify_link}" target="_blank">Spotify</a>` : ""}
                </div>
            </div>
        `;
    });

    const resultBox = document.getElementById("recommendResult");

    resultBox.innerHTML = html;
    resultBox.style.display = "block";
}

loadSongsFromSql();
updateTime();
updateEnergyBar();
