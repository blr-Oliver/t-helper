package com.oliver.thelper.model;

public class Protocol {
  private int id;
  private int tid;
  private int gid;
  private Suit suit;
  private PairPosition owner;
  private Integer level;
  private Integer tricks;

  public Protocol() {}
  public Protocol(int tid, int gid) {
    this.tid = tid;
    this.gid = gid;
  }

  public int getId() { return id; }
  public int getTid() { return tid; }
  public int getGid() { return gid; }

  public Suit getSuit() { return suit; }
  public PairPosition getOwner() { return owner; }
  public Integer getLevel() { return level; }
  public Integer getTricks() { return tricks; }

  public void setSuit(Suit suit) { this.suit = suit; }
  public void setOwner(PairPosition owner) { this.owner = owner; }
  public void setLevel(Integer level) { this.level = level; }
  public void setTricks(Integer tricks) { this.tricks = tricks; }
}
