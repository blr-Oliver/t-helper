DROP TRIGGER IF EXISTS tournament_last_modified;
DROP TRIGGER IF EXISTS protocol_last_modified;
DROP TRIGGER IF EXISTS player_last_modified;

delimiter |

CREATE TRIGGER player_last_modified BEFORE UPDATE ON player
  FOR EACH ROW
  BEGIN
    SET NEW.last_modified = NOW();
    UPDATE tournament SET children_last_modified = NOW() where id = NEW.tid;
  END;
|

CREATE TRIGGER protocol_last_modified BEFORE UPDATE ON protocol
  FOR EACH ROW
  BEGIN
    SET NEW.last_modified = NOW();
    UPDATE tournament SET children_last_modified = NOW() where id = NEW.tid;
  END;
|

CREATE TRIGGER tournament_last_modified BEFORE UPDATE ON tournament
  FOR EACH ROW
  BEGIN
    IF OLD.children_last_modified >= NEW.children_last_modified THEN
      SET NEW.last_modified = NOW(), NEW.children_last_modified = NOW();
    END IF;
  END;
|

delimiter ;