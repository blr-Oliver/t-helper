package com.oliver.thelper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;
import com.oliver.thelper.model.GameSlot;
import com.oliver.thelper.model.Protocol;
import com.oliver.thelper.model.Tournament;
import com.oliver.thelper.repository.GameSlotRepository;
import com.oliver.thelper.repository.ProtocolRepository;
import com.oliver.thelper.repository.TournamentRepository;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {
  @Autowired private TournamentRepository tournamentRepo;
  @Autowired private GameSlotRepository gameSlotRepo;
  @Autowired private ProtocolRepository protocolRepo;

  @JsonView(Views.ShortView.class)
  @RequestMapping(method = RequestMethod.GET)
  public List<Tournament> getAll() {
    return this.tournamentRepo.findAll();
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Tournament getOne(@PathVariable Integer id) {
    return this.tournamentRepo.findById(id).get();
  }

  @RequestMapping(value = "/{tid}/protocols/{tour}/{table}", method = RequestMethod.GET)
  public Protocol getProtocol(@PathVariable Integer tid, @PathVariable Short tour, @PathVariable Short table) {
    Tournament tournament = this.tournamentRepo.findById(tid).get();
    GameSlot game = gameSlotRepo.findInScheduleByTourAndTable(tournament.getSid(), tour, table).get();
    return protocolRepo.findByTournamentAndGameSlot(tid, game.getId()).get();
  }
}
