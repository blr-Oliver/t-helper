DROP TABLE IF EXISTS protocol;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS tournament;
DROP TABLE IF EXISTS game_slot;
DROP TABLE IF EXISTS player_slot;
DROP TABLE IF EXISTS schedule;

CREATE TABLE schedule (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(511) NOT NULL,
  pairs SMALLINT NOT NULL,
  tours SMALLINT NOT NULL,
  tables SMALLINT NOT NULL
);

CREATE TABLE player_slot (
  sid INT NOT NULL,
  idx SMALLINT NOT NULL,
  value VARCHAR(127) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (sid, idx),
  UNIQUE KEY u_player_slot (sid, value),
  FOREIGN KEY (sid) REFERENCES schedule (id)
);

CREATE TABLE game_slot (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sid INT NOT NULL,
  tour SMALLINT NOT NULL,
  tbl SMALLINT NOT NULL,
  deal SMALLINT NOT NULL,
  dealer NCHAR(1),
  player_N VARCHAR(127) NOT NULL,
  player_E VARCHAR(127) NOT NULL,
  player_S VARCHAR(127) NOT NULL,
  player_W VARCHAR(127) NOT NULL,
  UNIQUE KEY u_game_slot (sid, tour, tbl),
  FOREIGN KEY (sid) REFERENCES schedule (id)
);

CREATE TABLE tournament (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sid INT NOT NULL,
  name VARCHAR(511) NOT NULL,
  description VARCHAR(2047),
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(127) NOT NULL DEFAULT 'unknown',
  FOREIGN KEY (sid) REFERENCES schedule (id)
);

CREATE TABLE player (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tid INT NOT NULL,
  slot VARCHAR(127) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  name VARCHAR(255),
  UNIQUE KEY u_player (tid, slot),
  FOREIGN KEY (tid) REFERENCES tournament (id)
);

CREATE TABLE protocol (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tid INT NOT NULL,
  gid INT NOT NULL,
  suit NCHAR(1),
  owner NCHAR(2),
  level TINYINT,
  tricks TINYINT,
  UNIQUE KEY u_protocol (tid, gid),
  FOREIGN KEY (tid) REFERENCES tournament (id),
  FOREIGN KEY (gid) REFERENCES game_slot (id)
);