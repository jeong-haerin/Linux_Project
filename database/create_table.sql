CREATE DATABASE IF NOT EXISTS music_db;

USE music_db;

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    artist VARCHAR(200) NOT NULL,
    language_type VARCHAR(50),
    genre VARCHAR(100),
    era VARCHAR(50),
    mood VARCHAR(100),
    youtube_link VARCHAR(500),
    melon_link VARCHAR(500),
    apple_music_link VARCHAR(500),
    spotify_link VARCHAR(500)
);
