package com.oliver.thelper.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonInclude;

public class Player implements WithTimestamp {
  private int id = -1;
  private Integer tid;
  private String slot;
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private String name;
  @JsonFormat(shape = Shape.NUMBER_INT)
  private Date lastModified;

  public Player() {}
  public Player(int tid, String slot) {
    this.tid = tid;
    this.slot = slot;
  }
  public int getId() { return id; }
  public Integer getTid() { return tid; }
  public String getSlot() { return slot; }
  public Date getLastModified() { return lastModified; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
}
