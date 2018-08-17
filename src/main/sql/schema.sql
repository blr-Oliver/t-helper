DROP TABLE IF EXISTS protocol;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS tournament;
DROP TABLE IF EXISTS game_slot;
DROP TABLE IF EXISTS player_slot;
DROP TABLE IF EXISTS schedule;

CREATE TABLE schedule (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name NVARCHAR(511) NOT NULL,
  totalPairs SMALLINT NOT NULL,
  totalTours SMALLINT NOT NULL,
  totalTables SMALLINT NOT NULL
);

CREATE TABLE player_slot (
  sid INT NOT NULL,
  idx SMALLINT NOT NULL,
  value NVARCHAR(127) NOT NULL,
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
  player_N NVARCHAR(127) NOT NULL,
  player_E NVARCHAR(127) NOT NULL,
  player_S NVARCHAR(127) NOT NULL,
  player_W NVARCHAR(127) NOT NULL,
  UNIQUE KEY u_game_slot (sid, tour, tbl),
  FOREIGN KEY (sid) REFERENCES schedule (id)
);

CREATE TABLE tournament (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sid INT NOT NULL,
  name NVARCHAR(511) NOT NULL,
  description NVARCHAR(2047),
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  status NVARCHAR(127) NOT NULL DEFAULT 'unknown',
  FOREIGN KEY (sid) REFERENCES schedule (id)
);

CREATE TABLE PLAYER (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tid INT NOT NULL,
  slot NVARCHAR(127) NOT NULL,
  name NVARCHAR(255),
  UNIQUE KEY u_player (tid, slot),
  FOREIGN KEY (tid) REFERENCES tournament (id)
);

CREATE TABLE PROTOCOL (
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