package com.oliver.thelper.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
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

// TODO implement token usage
// TODO implement atomicity 
@Service
public class TournamentService {
  @Autowired private TournamentRepository tournamentRepo;
  @Autowired private ScheduleRepository scheduleRepo;
  @Autowired private PlayerRepository playerRepo;
  @Autowired private ProtocolRepository protocolRepo;
  
  public Tournament update(int tournamentId, Tournament tournament, List<Player> players, List<Protocol> protocols, String token) {
    Tournament existingTournament = tournamentRepo.findById(tournamentId).get();
    validate(existingTournament, tournament, players, protocols, token);

    if (tournament != null) {
      existingTournament.setName(tournament.getName());
      existingTournament.setDescription(tournament.getDescription());
      existingTournament.setStatus(tournament.getStatus());

      tournamentRepo.save(existingTournament);
    }

    if (players != null) {
      Map<Integer, Player> playerMap = players.stream().collect(Collectors.toMap(Player::getId, Function.identity()));
      List<Player> existingPlayers = playerRepo.findAllById(playerMap.keySet()).stream().map(player -> {
        player.setName(playerMap.get(player.getId()).getName());
        return player;
      }).collect(Collectors.toList());

      playerRepo.saveAll(existingPlayers);
    }

    if (protocols != null) {
      Map<Integer, Protocol> protocolMap = protocols.stream().collect(Collectors.toMap(Protocol::getId, Function.identity()));
      List<Protocol> existingProtocols = protocolRepo.findAllById(protocolMap.keySet()).stream().map(protocol -> {
        final Protocol update = protocolMap.get(protocol.getId());

        protocol.setOwner(update.getOwner());
        protocol.setLevel(update.getLevel());
        protocol.setSuit(update.getSuit());
        protocol.setTricks(update.getTricks());

        return protocol;
      }).collect(Collectors.toList());

      protocolRepo.saveAll(existingProtocols);
    }

    return tournamentRepo.findById(tournamentId).get();
  }

  public Tournament create(Tournament request, String token) {
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

  public void delete(int tournamentId, String token) {
    Tournament tournament = tournamentRepo.findById(tournamentId).get();
    validate(tournament, null, null, null, token);

    tournamentRepo.delete(tournament);
  }

  private void validate(Tournament existing, Tournament tournament, List<Player> players, List<Protocol> protocols, String token) {
    // TODO check same id, status options and correct schedule id
  }
}
