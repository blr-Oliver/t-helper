package com.oliver.thelper.model;

public enum Position {
  N, E, S, W;

  Position opposite() {
    switch (this) {
    case N: return S;
    case E: return W;
    case S: return N;
    case W: return E;
    }
    throw new RuntimeException();
  }
}
