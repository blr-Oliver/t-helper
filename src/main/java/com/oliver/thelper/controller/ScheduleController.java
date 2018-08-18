package com.oliver.thelper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.oliver.thelper.annotation.Views;
import com.oliver.thelper.model.Schedule;
import com.oliver.thelper.repository.ScheduleRepository;

@RestController
@RequestMapping(value = "/api/schedules")
public class ScheduleController {
  @Autowired
  private ScheduleRepository scheduleRepo;

  @JsonView(Views.ShortView.class) 
  @RequestMapping(method = RequestMethod.GET)
  public List<Schedule> getAll() {
    return this.scheduleRepo.findAll();
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Schedule getOne(@PathVariable Integer id) {
    return this.scheduleRepo.findById(id).get();
  }

}
