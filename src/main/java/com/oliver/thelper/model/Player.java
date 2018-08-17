package com.oliver.thelper.model;

public class Player {
  private int id;
  private int tid;
  private String slot;
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
