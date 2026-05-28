# 노래 추천 프로그램 
## 프로젝트 개요 
본 프로젝트는 사용자의 현재 기분, 상황, 에너지 정도, 시간, 날씨 정보를 바탕으로 어울리는 노래
를 추천하는 웹 기반 음악 추천 프로그램이다. 
사용자는 전체 곡 목록을 확인할 수 있으며, 언어별·장르별·시대별 기준으로 노래를 탐색할 수 있
다. 또한 사용자가 선택한 현재 상태와 환경 정보를 반영하여 지금 상황에 어울리는 노래 3곡을 
추천받을 수 있다. 
본 프로젝트는 Python Flask를 이용해 웹 서버를 구성하였고, HTML, CSS, JavaScript를 이용해 사용
자 화면과 주요 동작을 구현하였다. 또한 Docker를 적용하여 Flask 웹 애플리케이션을 컨테이너 환
경에서 실행할 수 있도록 구성하였다. 이를 통해 실행 환경 차이에 따른 문제를 줄이고, 다른 PC에
서도 동일한 방식으로 프로그램을 실행할 수 있도록 하였다. 
현재 노래 데이터는 `database/songs.sql` 파일에 저장되어 있으며, JavaScript가 해당 SQL 파일을 
불러와 노래 목록 출력과 추천 기능에 활용한다. 
## 주요 기능 - 전체 곡 목록 조회 - 언어, 장르, 시대별 노래 탐색 - 사용자의 기분, 상황, 에너지 정도 선택 기반의 음악 추천 - 현재 시간대 및 날씨 정보를 반영한 음악 추천 - YouTube, Melon, Apple Music, Spotify 링크 제공 - Docker를 이용한 컨테이너 기반 실행 환경 제공 
## 프로젝트 구조 
```text 
Linux_Project/ 
│ 
├─ app.py 
├─ requirements.txt 
├─ README.md 
├─ Dockerfile 
├─ .dockerignore 
├─ .gitignore 
│ 
├─ database/ 
│   ├─ create_table.sql 
│   └─ songs.sql 
│ 
├─ static/ 
│   ├─ style.css 
│   └─ script.js 
│ 
└─ templates/ 
└─ index.html 
``` 
