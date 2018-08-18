package com.oliver.thelper.model;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;

public class Tournament {
  @JsonView(Views.ShortView.class) private int id;
  @JsonView(Views.ShortView.class) private int sid;
  @JsonView(Views.ShortView.class) private String name;
  @JsonView(Views.ShortView.class) private String description;
  @JsonView(Views.ShortView.class) private Date dateCreated;
  @JsonView(Views.ShortView.class) private String status;

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
