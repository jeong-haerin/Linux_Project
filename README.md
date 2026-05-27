# 노래 추천 프로그램

## 프로젝트 소개

사용자의 기분, 상황, 에너지, 현재 시간과 날씨를 기반으로 어울리는 노래를 추천하는 웹 프로그램이다.

사용자는 전체 곡 목록을 확인할 수 있고, 언어별·장르별·시대별로 노래를 탐색할 수 있다. 또한 현재 기분과 상황, 에너지 정도를 선택하면 시간과 날씨 정보를 함께 반영하여 어울리는 노래 3곡을 추천받을 수 있다.

## 주요 기능

- 전체 곡 목록 조회
- 언어별 노래 탐색
- 장르별 노래 탐색
- 시대별 노래 탐색
- 기분, 상황, 에너지 정도 선택 기반 곡 추천
- 현재 시간과 날씨 반영 추천
- YouTube, Melon, Apple Music, Spotify 링크 제공

## 사용 기술

- Frontend: HTML, CSS, JavaScript
- Backend: Python Flask
- Data: SQL 파일
- Collaboration: GitHub

## 데이터 처리 방식

노래 데이터는 `database/songs.sql` 파일에 저장되어 있으며, JavaScript에서 해당 SQL 파일을 직접 불러온 뒤 `VALUES` 부분을 파싱하여 화면에 표시한다.

## 프로젝트 구조

Linux_Project/
│
├─ app.py
├─ requirements.txt
├─ README.md
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
