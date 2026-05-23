CREATE DATABASE IF NOT EXISTS music_db;

USE music_db;

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    language VARCHAR(50),
    genre VARCHAR(50),
    era VARCHAR(50),
    mood VARCHAR(50),
    youtube_link VARCHAR(300),
    melon_link VARCHAR(300)
);

INSERT INTO songs (title, artist, language, genre, era, mood, youtube_link, melon_link) VALUES
('심야영화', '하현상', 'KPOP', '일렉트로닉', '2020년대', '몽환적', '', ''),
('너란 바람 따라', 'IKON', 'KPOP', '발라드', '2020년대', '애절함', '', ''),
('幾分之幾', '盧廣仲', '기타', '발라드', '2010년대', '애절함', '', ''),
('Te Quiero', 'KISS OF LIFE', 'KPOP', '댄스', '2020년대', '몽환적', '', ''),
('혜성', '윤하', 'KPOP', '록', '2000년대', '강렬함', '', ''),
('OUTSIDE', 'ENHYPEN', 'KPOP', '힙합', '2020년대', '서정적', '', ''),
('이제 안녕', '조유리', 'KPOP', '팝', '2020년대', '서정적', '', ''),
('기억을 걷는 시간', '넬', 'KPOP', '발라드', '2000년대', '애절함', '', ''),
('This Love', 'BIGBANG', 'KPOP', '힙합', '2000년대', '애절함', '', ''),
('쏟아져오는 바람처럼', '도영', 'KPOP', '발라드', '2020년대', '밝음', '', ''),
('20', '세븐틴', 'KPOP', '댄스', '2010년대', '밝음', '', ''),
('다시 사랑할 수 있을까', '그리즐리', 'KPOP', '록', '2020년대', '애절함', '', ''),
('nostalgia', '우디', 'KPOP', '일렉트로닉', '2020년대', '서정적', '', '');