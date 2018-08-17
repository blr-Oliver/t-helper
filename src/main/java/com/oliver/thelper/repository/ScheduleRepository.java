package com.oliver.thelper.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oliver.thelper.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
}
