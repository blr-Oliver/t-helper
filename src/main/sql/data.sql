insert into schedule (id, name, pairs, tours, tables) values (1, 'Короткий турнир для 4 пар', 4, 12, 2);

insert into game_slot (sid, tour, tbl, deal, dealer, player_N, player_E, player_S, player_W) values
  (1, 1, 1, 1, 'N', 'A', 'B', 'a', 'b'),
  (1, 2, 1, 2, 'E', 'A', 'B', 'a', 'b'),
  (1, 3, 1, 3, 'S', 'A', 'B', 'a', 'b'),
  (1, 4, 1, 4, 'W', 'A', 'B', 'a', 'b'),
  (1, 1, 2, 2, 'E', 'C', 'D', 'c', 'd'),
  (1, 2, 2, 1, 'N', 'C', 'D', 'c', 'd'),
  (1, 3, 2, 4, 'W', 'd', 'c', 'D', 'C'),
  (1, 4, 2, 3, 'S', 'd', 'c', 'D', 'C'),
  (1, 5, 1, 5, 'N', 'A', 'C', 'a', 'c'),
  (1, 6, 1, 6, 'E', 'A', 'C', 'a', 'c'),
  (1, 7, 1, 7, 'S', 'A', 'C', 'a', 'c'),
  (1, 8, 1, 8, 'W', 'A', 'C', 'a', 'c'),
  (1, 5, 2, 6, 'E', 'd', 'B', 'D', 'b'),
  (1, 6, 2, 5, 'N', 'D', 'b', 'd', 'B'),
  (1, 7, 2, 8, 'W', 'B', 'D', 'b', 'd'),
  (1, 8, 2, 7, 'S', 'B', 'D', 'b', 'd'),
  (1, 9, 1, 9, 'N', 'A', 'D', 'a', 'd'),
  (1, 10, 1, 10, 'E', 'A', 'D', 'a', 'd'),
  (1, 11, 1, 11, 'S', 'A', 'D', 'a', 'd'),
  (1, 12, 1, 12, 'W', 'A', 'D', 'a', 'd'),
  (1, 9, 2, 10, 'E', 'B', 'C', 'b', 'c'),
  (1, 10, 2, 9, 'N', 'B', 'C', 'b', 'c'),
  (1, 11, 2, 12, 'W', 'c', 'B', 'C', 'b'),
  (1, 12, 2, 11, 'S', 'C', 'b', 'c', 'B');

insert into player_slot (sid, idx, value) values
  (1, 0, 'A'),
  (1, 1, 'a'),
  (1, 2, 'B'),
  (1, 3, 'b'),
  (1, 4, 'C'),
  (1, 5, 'c'),
  (1, 6, 'D'),
  (1, 7, 'd');