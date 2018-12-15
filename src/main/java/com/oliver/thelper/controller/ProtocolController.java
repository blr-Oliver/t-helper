package com.oliver.thelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import com.oliver.thelper.model.Protocol;
import com.oliver.thelper.repository.ProtocolRepository;

@RestController
@RequestMapping("/api/protocols")
public class ProtocolController extends VersionedEntityController<Protocol> {
  
  public ProtocolController(@Autowired ProtocolRepository repo) {
    super(repo, true);
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
      @RequestBody Protocol item,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String authToken,
      WebRequest request) {
    return super.putResource(id, item, authToken, request);
  }

  @Override
  protected void copyData(Protocol existing, Protocol incoming) {
    existing.setLevel(incoming.getLevel());
    existing.setSuit(incoming.getSuit());
    existing.setOwner(incoming.getOwner());
    existing.setTricks(incoming.getTricks());
  }

  @Override
  protected boolean validateResource(Protocol existing, Protocol incoming) {
    if(incoming.getId() != -1 && incoming.getId() != existing.getId()) return false;
    if (!eq(existing.getTid(), incoming.getTid(), false)) return false;
    if (!eq(existing.getGid(), incoming.getGid(), false)) return false;
    return true;
  }
}
