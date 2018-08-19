package com.oliver.thelper.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;
import com.oliver.thelper.model.Tournament;
import com.oliver.thelper.repository.TournamentRepository;
import com.oliver.thelper.service.TournamentService;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {
  @Autowired private TournamentRepository tournamentRepo;
  @Autowired private TournamentService tournamentService;

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
  public ResponseEntity<?> updateOne(@PathVariable Integer id, @RequestBody Tournament request) {
    this.tournamentService.update(id, request);
    return ResponseEntity.noContent().build();
  }

  @RequestMapping(value = "", method = RequestMethod.POST)
  public ResponseEntity<Tournament> createOne(@RequestBody Tournament request) throws URISyntaxException{
    Tournament result = this.tournamentService.create(request);
    return ResponseEntity.created(new URI("/api/tournaments/" + result.getId())).body(result);
  }
}
