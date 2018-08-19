package com.oliver.thelper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;
import com.oliver.thelper.model.Tournament;
import com.oliver.thelper.repository.TournamentRepository;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {
  @Autowired private TournamentRepository tournamentRepo;

  @JsonView(Views.ShortView.class)
  @RequestMapping(method = RequestMethod.GET)
  public List<Tournament> getAll() {
    return this.tournamentRepo.findAll();
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Tournament getOne(@PathVariable Integer id) {
    return this.tournamentRepo.findById(id).get();
  }
}
