package com.oliver.thelper.service;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oliver.thelper.model.Player;
import com.oliver.thelper.model.Protocol;
import com.oliver.thelper.model.Schedule;
import com.oliver.thelper.model.Tournament;
import com.oliver.thelper.repository.PlayerRepository;
import com.oliver.thelper.repository.ProtocolRepository;
import com.oliver.thelper.repository.ScheduleRepository;
import com.oliver.thelper.repository.TournamentRepository;

@Service
public class TournamentService {
  @Autowired private TournamentRepository tournamentRepo;
  @Autowired private ScheduleRepository scheduleRepo;
  @Autowired private PlayerRepository playerRepo;
  @Autowired private ProtocolRepository protocolRepo;
  
  
  public Tournament update(int id, Tournament request) {
    Tournament existing = tournamentRepo.findById(id).get();
    validateForUpdate(existing, request);
    
    existing.setName(request.getName());
    existing.setDescription(request.getDescription());
    existing.setStatus(request.getStatus());

    return tournamentRepo.save(existing);
  }
  
  public Tournament create(Tournament request) {
    // TODO this should be atomic operation (transaction) 
    Schedule schedule = scheduleRepo.findById(request.getSid()).get();

    request.setStatus("unknown");
    request = tournamentRepo.save(request); // now it has id
    final int id = request.getId();
    
    protocolRepo.saveAll(
      schedule.getGames().stream().map(slot -> new Protocol(id, slot.getId())).collect(Collectors.toList())
    );

    playerRepo.saveAll(
        Arrays.asList(schedule.getPlayers()).stream().map(slot -> new Player(id, slot)).collect(Collectors.toList())
    );

    return tournamentRepo.findById(id).get();
  }
  
  private void validateForUpdate(Tournament existing, Tournament request) {
    // TODO check same id, status options and correct schedule id
  }
}
