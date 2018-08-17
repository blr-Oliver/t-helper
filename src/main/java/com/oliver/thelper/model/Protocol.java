package com.oliver.thelper.model;

public class Protocol {
  private int id;
  private int tid;
  private int gid;
  private Suit suit;
  private PairPosition owner;
  private byte level;
  private byte tricks;

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
  public byte getLevel() { return level; }
  public byte getTricks() { return tricks; }

  public void setSuit(Suit suit) { this.suit = suit; }
  public void setOwner(PairPosition owner) { this.owner = owner; }
  public void setLevel(int level) { this.level = (byte) level; }
  public void setTricks(int tricks) { this.tricks = (byte) tricks; }
}
