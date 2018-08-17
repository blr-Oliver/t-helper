package com.oliver.thelper.model;

import java.util.EnumMap;

public class Seating<T> extends EnumMap<Position, T> {
  private static final long serialVersionUID = 1L;

  public Seating() {
    super(Position.class);
  }
}
