package com.oliver.thelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import com.oliver.thelper.model.Player;
import com.oliver.thelper.repository.PlayerRepository;

@RestController
@RequestMapping("/api/players")
public class PlayerController extends VersionedEntityController<Player> {
  public PlayerController(@Autowired PlayerRepository repo) {
    super(repo);
  }

  @Override
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> getResource(@PathVariable("id") int id, WebRequest request) {
    return super.getResource(id, request);
  }

  @Override
  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  public ResponseEntity<?> putResource(
      @PathVariable("id") int id,
      @RequestBody Player item,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String authToken,
      WebRequest request) {
    return super.putResource(id, item, authToken, request);
  }

  @Override
  protected void copyData(Player existing, Player incoming) {
    existing.setName(incoming.getName());
  }
  
  @Override
  protected boolean validateResource(Player existing, Player incoming) {
    if (incoming.getId() != -1 && incoming.getId() != existing.getId()) return false;
    if (!eq(existing.getTid(), incoming.getTid(), false)) return false;
    if (!eq(existing.getSlot(), incoming.getSlot(), false)) return false;
    return true;
  }

}
