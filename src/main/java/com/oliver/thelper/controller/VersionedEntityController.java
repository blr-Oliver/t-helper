package com.oliver.thelper.controller;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

import com.oliver.thelper.model.WithTimestamp;

public abstract class VersionedEntityController<T extends WithTimestamp> {
  protected JpaRepository<T, Integer> repo;

  protected VersionedEntityController(JpaRepository<T, Integer> repo) {
    this.repo = repo;
  }

  public ResponseEntity<?> getResource(int id, WebRequest request) {
    Optional<T> found = repo.findById(id);
    if (!found.isPresent())
      return ResponseEntity.notFound().build();
    T existing = found.get();
    if (request.checkNotModified(existing.getLastModified().getTime()))
      return null;
    return ResponseEntity.ok(existing);
  }

  public ResponseEntity<?> putResource(int id, T item, String authToken, WebRequest request) {
    Optional<T> found = repo.findById(id);

    if (!found.isPresent())
      return ResponseEntity.notFound().build();

    T existing = found.get();

    if (!validateResource(existing, item))
      // TODO replace it with Exception and dispatcher-level handling
      return ResponseEntity.badRequest().build();

    if (request.checkNotModified(existing.getLastModified().getTime()))
      return null;

    copyData(existing, item);

    T saved = repo.save(existing);

    // this produces both Last-Modified and Date headers on the response - it's ok
    // in fact, the tiny possible difference can provide useful info for client
    return ResponseEntity.noContent().lastModified(saved.getLastModified().getTime()).build();
  }

  protected boolean validateResource(T existing, T incoming) {
    return true;
  }

  protected abstract void copyData(T existing, T incoming);

  public static boolean eq(Object existing, Object incoming, boolean required) {
    return required ? incoming != null && incoming.equals(existing) : (incoming == null || incoming.equals(existing));
  }
}
