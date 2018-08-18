package com.oliver.thelper.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.oliver.thelper.model.Protocol;

public interface ProtocolRepository extends JpaRepository<Protocol, Integer> {
  @Query("from Protocol p where p.tid = :tid and p.gid = :gid")
  Optional<Protocol> findByTournamentAndGameSlot(@Param("tid") int tournamentId, @Param("gid") int gameSlotId);
}
