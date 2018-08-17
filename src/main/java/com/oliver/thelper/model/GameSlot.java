package com.oliver.thelper.model;
import com.fasterxml.jackson.annotation.JsonInclude;

public class GameSlot {
  private int id;
  private int sid;
  private short tour;
  private short table;
  private short deal;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private Position dealer;
  private Seating<String> players;
  
  public int getId() { return id; }
  public int getSid() { return sid; }
  public short getTour() { return tour; }
  public short getTable() { return table; }
  public short getDeal() { return deal; }
  public Position getDealer() { return dealer; }
  public Seating<String> getPlayers() { return players; }
}
