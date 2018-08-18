package com.oliver.thelper.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.oliver.thelper.model.GameSlot;

public interface GameSlotRepository extends JpaRepository<GameSlot, Integer> {
  @Query("from GameSlot g where g.sid = :sid and g.tour = :tour and g.table = :table")
  Optional<GameSlot> findInScheduleByTourAndTable(@Param("sid") int scheduleId, @Param("tour") short tour, @Param("table") short table);
}
