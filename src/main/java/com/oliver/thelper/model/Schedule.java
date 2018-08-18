package com.oliver.thelper.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;

public class Schedule {
  @JsonView(Views.ShortView.class) private int id;
  @JsonView(Views.ShortView.class) private String name;
  @JsonView(Views.ShortView.class) private short totalPairs;
  @JsonView(Views.ShortView.class) private short totalTours;
  @JsonView(Views.ShortView.class) private short totalTables;

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
