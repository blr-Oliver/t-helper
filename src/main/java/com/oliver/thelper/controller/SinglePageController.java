package com.oliver.thelper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(method = RequestMethod.GET)
public class SinglePageController {
  @RequestMapping("/{path:[^\\.]+}/**")
  public String getApplicationPage() {
    return "forward:/";
  }
}
