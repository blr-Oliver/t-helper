package com.oliver.thelper.model;

import java.util.List;

public class TournamentPatchRequest {
  public int tid; // cannot be null, intentionally primitive
  public PatchBucket update;

  public static class PatchBucket {
    public Tournament tournament;
    public List<Player> players;
    public List<Protocol> protocols;
  }
}
