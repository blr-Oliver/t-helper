package com.oliver.thelper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.oliver.thelper.model.Tournament;
import com.oliver.thelper.repository.TournamentRepository;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {
  @Autowired
  private TournamentRepository tournamentRepo;

  @RequestMapping(method = RequestMethod.GET)
  public List<Tournament> getAll() {
    return this.tournamentRepo.findAll();
  }
}
