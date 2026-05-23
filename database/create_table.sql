CREATE DATABASE IF NOT EXISTS music_db;

USE music_db;

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    language_type VARCHAR(50),
    genre VARCHAR(50),
    era VARCHAR(50),
    mood VARCHAR(50),
    youtube_link VARCHAR(300),
    melon_link VARCHAR(300),
    apple_music_link VARCHAR(300),
    spotify_link VARCHAR(300)
);
