package com.oliver.thelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oliver.thelper.model.Protocol;
import com.oliver.thelper.repository.ProtocolRepository;

@RestController
@RequestMapping("/api/protocols")
public class ProtocolController {
  @Autowired private ProtocolRepository protocolRepo;

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Protocol getOne(@PathVariable Integer id) {
    return protocolRepo.findById(id).get();
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  public ResponseEntity<?> updateOne(
      @PathVariable Integer id,
      @RequestBody Protocol item,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String token) {
    Protocol existing = protocolRepo.findById(id).get();
    validateProtocol(existing, item, token);

    existing.setLevel(item.getLevel());
    existing.setSuit(item.getSuit());
    existing.setOwner(item.getOwner());
    existing.setTricks(item.getTricks());

    protocolRepo.save(existing);
    return ResponseEntity.noContent().build();
  }

  private void validateProtocol(Protocol existing, Protocol item, String token) {
    // TODO validate for same tournament and game slot
  }
}
