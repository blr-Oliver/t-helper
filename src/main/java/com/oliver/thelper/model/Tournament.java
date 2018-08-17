package com.oliver.thelper.model;

import java.util.Date;
import java.util.Set;

public class Tournament {
  private int id;
  private int sid;
  private String name;
  private String description;
  private Date dateCreated;
  private String status;

  private Schedule schedule;
  private Set<Player> players;
  private Set<Protocol> protocols;

  public Tournament() {}
  public Tournament(int sid) { this.sid = sid; }

  public int getId() { return id; }
  public int getSid() { return sid; }
  public String getName() { return name; }
  public String getDescription() { return description; }
  public Date getDateCreated() { return dateCreated; }
  public String getStatus() { return status; }

  public void setSid(int sid) { this.sid = sid; }
  public void setName(String name) { this.name = name; }
  public void setDescription(String description) { this.description = description; }
  public void setStatus(String status) { this.status = status; }

  public Schedule getSchedule() { return schedule; }
  public Set<Player> getPlayers() { return players; }
  public Set<Protocol> getProtocols() { return protocols; }
}
