package com.oliver.thelper.model;

import java.util.Set;

public class Schedule {
  private int id;
  private String name;
  private short totalPairs;
  private short totalTours;
  private short totalTables;

  private String[] players;
  private Set<GameSlot> games;

  public int getId() { return id; }
  public String getName() { return name; }
  public short getTotalPairs() { return totalPairs; }
  public short getTotalTours() { return totalTours; }
  public short getTotalTables() { return totalTables; }
  public String[] getPlayers() { return players; }
  public Set<GameSlot> getGames() { return games; }
}
