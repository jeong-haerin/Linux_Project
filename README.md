# 노래 추천 프로그램

## 프로젝트 소개

사용자의 기분, 상황, 에너지, 현재 시간과 날씨를 기반으로 노래를 추천하는 웹 프로그램이다.

## 주요 기능

- 전체 곡 목록 조회
- 언어별 노래 탐색
- 장르별 노래 탐색
- 시대별 노래 탐색
- 기분, 상황, 에너지 기반 곡 추천
- 현재 시간 및 날씨 정보 반영 추천

## 사용 기술

- Frontend: HTML, CSS, JavaScript
- Backend: Python Flask
- Database: MariaDB
- Collaboration: GitHub

## 프로젝트 구조

```text
Linux_Project/
│
├─ app.py
├─ requirements.txt
├─ README.md
├─ .gitignore
│
├─ database/
│   └─ songs.sql
│
├─ static/
│   ├─ style.css
│   └─ script.js
│
└─ templates/
    └─ index.html