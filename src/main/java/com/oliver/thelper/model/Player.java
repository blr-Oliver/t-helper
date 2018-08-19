package com.oliver.thelper.model;

import com.fasterxml.jackson.annotation.JsonInclude;

public class Player {
  private int id = -1;
  private int tid;
  private String slot;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private String name;

  public Player() {}
  public Player(int tid, String slot) {
    this.tid = tid;
    this.slot = slot;
  }
  public int getId() { return id; }
  public int getTid() { return tid; }
  public String getSlot() { return slot; }
  public String getName() { return name; }
  
  public void setName(String name) { this.name = name; }
  
}
