package com.oliver.thelper.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonInclude;

public class Protocol implements WithTimestamp {
  private int id = -1;
  private Integer tid;
  private Integer gid;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private Suit suit;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private PairPosition owner;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private Integer level;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private Integer tricks;
  @JsonFormat(shape = Shape.NUMBER_INT)
  private Date lastModified;

  public Protocol() {}
  public Protocol(int tid, int gid) {
    this.tid = tid;
    this.gid = gid;
  }

  public int getId() { return id; }
  public Integer getTid() { return tid; }
  public Integer getGid() { return gid; }

  public Suit getSuit() { return suit; }
  public PairPosition getOwner() { return owner; }
  public Integer getLevel() { return level; }
  public Integer getTricks() { return tricks; }
  public Date getLastModified() { return lastModified; }

  public void setSuit(Suit suit) { this.suit = suit; }
  public void setOwner(PairPosition owner) { this.owner = owner; }
  public void setLevel(Integer level) { this.level = level; }
  public void setTricks(Integer tricks) { this.tricks = tricks; }
}
