package com.oliver.thelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oliver.thelper.model.Player;
import com.oliver.thelper.repository.PlayerRepository;

@RestController
@RequestMapping("/api/players")
public class PlayerController {
  @Autowired private PlayerRepository playerRepo;

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Player getOne(@PathVariable Integer id) {
    return playerRepo.findById(id).get();
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  public ResponseEntity<?> updateOne(
      @PathVariable Integer id,
      @RequestBody Player item,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String token) {
    Player existing = playerRepo.findById(id).get();
    validatePlayer(existing, item, token);

    existing.setName(item.getName());

    playerRepo.save(existing);
    return ResponseEntity.noContent().build();
  }

  private void validatePlayer(Player existing, Player item, String token) {
    // TODO validate for same tournament and game slot
  }

}
