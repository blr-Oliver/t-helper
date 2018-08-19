package com.oliver.thelper.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oliver.thelper.model.Player;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
}
