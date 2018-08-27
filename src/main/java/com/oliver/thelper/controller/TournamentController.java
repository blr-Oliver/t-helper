package com.oliver.thelper.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;
import com.oliver.thelper.model.Tournament;
import com.oliver.thelper.model.TournamentPatchRequest;
import com.oliver.thelper.repository.TournamentRepository;
import com.oliver.thelper.service.TournamentService;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {
  @Autowired
  private TournamentRepository tournamentRepo;
  @Autowired
  private TournamentService tournamentService;

  @JsonView(Views.ShortView.class)
  @RequestMapping(method = RequestMethod.GET)
  public List<Tournament> getAll() {
    return this.tournamentRepo.findAll();
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Tournament getOne(@PathVariable Integer id) {
    return this.tournamentRepo.findById(id).get();
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  public ResponseEntity<?> updateOne(
      @PathVariable Integer id,
      @RequestBody Tournament request,
      @RequestHeader(value = Constants.HEADER_TOURNAMENT_TOKEN, required = false) String token) {
    this.tournamentService.update(id, request, null, null, token);
    return ResponseEntity.noContent().build();
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
  
}
