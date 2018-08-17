package com.oliver.thelper;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module.Feature;

@Configuration
public class JacksonHbmConfig {
  @Bean
  public Module getHibernateModule() {
    Hibernate5Module module = new Hibernate5Module();
    module.configure(Feature.FORCE_LAZY_LOADING, true);
    return module;
  }
}
