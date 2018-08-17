CREATE SCHEMA `thelper` DEFAULT CHARACTER SET utf8 ;

CREATE USER 'thelper-api'@'localhost' IDENTIFIED BY 'RalTirTalSol';
GRANT select, insert, update, delete, execute ON thelper.* TO 'thelper-api'@'localhost';
