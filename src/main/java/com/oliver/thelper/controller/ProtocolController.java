package com.oliver.thelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<?> saveOne(@PathVariable Integer id, @RequestBody Protocol item) {
    Protocol existing = protocolRepo.findById(id).get();
    validateProtocol(existing, item);

    existing.setLevel(item.getLevel());
    existing.setSuit(item.getSuit());
    existing.setOwner(item.getOwner());
    existing.setTricks(item.getTricks());

    protocolRepo.save(existing);
    return ResponseEntity.noContent().build();
  }

  private void validateProtocol(Protocol existing, Protocol item) {
    // TODO validate for same tournament and game slot
  }
}
