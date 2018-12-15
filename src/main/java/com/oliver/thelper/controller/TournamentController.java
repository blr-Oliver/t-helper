package com.oliver.thelper.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;
import com.oliver.thelper.model.Tournament;
import com.oliver.thelper.model.TournamentPatchRequest;
import com.oliver.thelper.repository.TournamentRepository;
import com.oliver.thelper.service.TournamentService;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController extends VersionedEntityController<Tournament> {
  @Autowired
  private TournamentService tournamentService;
  
  public TournamentController(@Autowired TournamentRepository repo) {
    super(repo, true);
  }

  @JsonView(Views.ShortView.class)
  @RequestMapping(method = RequestMethod.GET)
  public List<Tournament> getAll() {
    return this.repo.findAll();
  }

  @Override
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> getResource(@PathVariable("id") int id, WebRequest request) {
    return super.getResource(id, request);
  }
  
  @Override
  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  public ResponseEntity<?> putResource (
      @PathVariable int id,
      @RequestBody Tournament item,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String token,
      WebRequest request) {
    return super.putResource(id, item, token, request);
  }
  
  @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
  public Tournament batchUpdate(
      @PathVariable Integer id,
      @RequestBody TournamentPatchRequest request,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String token) {
    return this.tournamentService.update(id,
        request.update.tournament,
        request.update.players,
        request.update.protocols,
        token);
  }

  @RequestMapping(value = "", method = RequestMethod.POST)
  public ResponseEntity<Tournament> createOne(
      @RequestBody Tournament request,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String token) throws URISyntaxException {
    Tournament result = this.tournamentService.create(request, token);
    return ResponseEntity.created(new URI("/api/tournaments/" + result.getId())).body(result);
  }
  
  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<?> deleteOne(
      @PathVariable Integer id,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String token) {
    this.tournamentService.delete(id, token);
    return ResponseEntity.noContent().build(); 
  }

  @Override
  protected long getLastModified(Tournament existing, boolean readOnly) {
    return (readOnly ? existing.getChildrenLastModified() : existing.getLastModified()).getTime();
  }

  @Override
  protected boolean validateResource(Tournament existing, Tournament incoming) {
    if (incoming.getId() != -1 && incoming.getId() != existing.getId()) return false;
    if (!eq(existing.getSid(), incoming.getSid(), false)) return false;
    return true;
  }

  @Override
  protected void copyData(Tournament existing, Tournament incoming) {
    existing.setName(incoming.getName());
    existing.setDescription(incoming.getDescription());
    existing.setStatus(incoming.getStatus());
  }

}
