package com.oliver.thelper.model;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;

public class Tournament implements WithTimestamp {
  @JsonView(Views.ShortView.class) private int id = -1;
  @JsonView(Views.ShortView.class) private Integer sid;
  @JsonView(Views.ShortView.class) private String name;
  @JsonView(Views.ShortView.class) private String description;
  @JsonView(Views.ShortView.class) private Date dateCreated;
  @JsonView(Views.ShortView.class) private String status;
  @JsonFormat(shape = Shape.NUMBER_INT)
  @JsonView(Views.ShortView.class) private Date lastModified;
  @JsonIgnore
  @JsonView(Views.ShortView.class) private Date childrenLastModified;

  private Schedule schedule;
  private Set<Player> players;
  private Set<Protocol> protocols;

  public Tournament() {}
  public Tournament(int sid) { this.sid = sid; }

  public int getId() { return id; }
  public Integer getSid() { return sid; }
  public String getName() { return name; }
  public String getDescription() { return description; }
  public Date getDateCreated() { return dateCreated; }
  public String getStatus() { return status; }
  public Date getLastModified() { return lastModified; }
  public Date getChildrenLastModified() { return childrenLastModified; }

  public void setSid(Integer sid) { this.sid = sid; }
  public void setName(String name) { this.name = name; }
  public void setDescription(String description) { this.description = description; }
  public void setStatus(String status) { this.status = status; }

  public Schedule getSchedule() { return schedule; }
  public Set<Player> getPlayers() { return players; }
  public Set<Protocol> getProtocols() { return protocols; }
  
  public void setSchedule(Schedule schedule) { this.schedule = schedule; }
  public void setPlayers(Set<Player> players) { this.players = players; }
  public void setProtocols(Set<Protocol> protocols) { this.protocols = protocols; }
}
