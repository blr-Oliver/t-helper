package com.oliver.thelper.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

public class GameSlot {
  private int id;
  private int sid;
  private short tour;
  private short table;
  private short deal;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private Position dealer;
  private Seating<String> players = new Seating<>();
  
  public int getId() { return id; }
  public int getSid() { return sid; }
  public short getTour() { return tour; }
  public short getTable() { return table; }
  public short getDeal() { return deal; }
  public Position getDealer() { return dealer; }
  public Seating<String> getPlayers() { return players; }
  
  @JsonIgnore public String getPlayerN() { return this.players.get(Position.N); }
  @JsonIgnore public String getPlayerE() { return this.players.get(Position.E); }
  @JsonIgnore public String getPlayerS() { return this.players.get(Position.S); }
  @JsonIgnore public String getPlayerW() { return this.players.get(Position.W); }

  public void setPlayerN(String value) { this.players.put(Position.N, value); }
  public void setPlayerE(String value) { this.players.put(Position.E, value); }
  public void setPlayerS(String value) { this.players.put(Position.S, value); }
  public void setPlayerW(String value) { this.players.put(Position.W, value); }
}
