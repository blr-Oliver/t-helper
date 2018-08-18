package com.oliver.thelper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.oliver.thelper.model.Schedule;
import com.oliver.thelper.repository.ScheduleRepository;

@RestController
@RequestMapping(value = "/api/schedule")
public class ScheduleController {
  @Autowired
  private ScheduleRepository scheduleRepo;

  @RequestMapping(method = RequestMethod.GET)
  public List<Schedule> getAll() {
    return this.scheduleRepo.findAll();
  }

}
