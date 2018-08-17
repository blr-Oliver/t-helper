package com.oliver.thelper.model;

public enum PairPosition {
  NS, EW;

  PairPosition cross() {
    switch (this) {
    case NS: return EW;
    case EW: return NS;
    }
    throw new RuntimeException();
  }
}
