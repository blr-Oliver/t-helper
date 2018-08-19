package com.oliver.thelper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oliver.thelper.model.Tournament;
import com.oliver.thelper.repository.TournamentRepository;

@Service
public class TournamentService {
  @Autowired private TournamentRepository tournamentRepo;
  
  public Tournament update(int id, Tournament request) {
    Tournament existing = tournamentRepo.findById(id).get();
    validateForUpdate(existing, request);
    
    existing.setName(request.getName());
    existing.setDescription(request.getDescription());
    existing.setStatus(request.getStatus());

    return tournamentRepo.save(existing);
  }
  
  public Tournament create(Tournament request) {
    // TODO
    return null;
  }
  
  private void validateForUpdate(Tournament existing, Tournament request) {
    // TODO check same id, status options and correct schedule id
  }
}
