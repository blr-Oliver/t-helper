package com.oliver.thelper.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oliver.thelper.model.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Integer> {
}
