package com.oliver.thelper.controller;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

import com.oliver.thelper.model.WithTimestamp;

public abstract class VersionedEntityController<T extends WithTimestamp> {
  private boolean explicitReload;
  protected JpaRepository<T, Integer> repo;

  protected VersionedEntityController(JpaRepository<T, Integer> repo, boolean explicitReload) {
    this.repo = repo;
    this.explicitReload = explicitReload;
  }

  public ResponseEntity<?> getResource(int id, WebRequest request) {
    Optional<T> found = repo.findById(id);
    if (!found.isPresent())
      return ResponseEntity.notFound().build();
    T existing = found.get();
    if (request.checkNotModified(getLastModified(existing, true)))
      return null;
    return ResponseEntity.ok(existing);
  }

  public ResponseEntity<?> putResource(int id, T item, String authToken, WebRequest request) {
    Optional<T> found = repo.findById(id);

    if (!found.isPresent())
      return ResponseEntity.notFound().build();

    T existing = found.get();

    // force version info to be present either as header or in body
    // header value takes precedence over body value
    if (request.getHeader("If-Unmodified-Since") != null) {
      if (request.checkNotModified(getLastModified(existing, false)))
        return null;
    } else {
      Date lastModified = item.getLastModified();
      if (lastModified == null || lastModified.getTime() < getLastModified(existing, false))
        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).build();
    }

    if (!validateResource(existing, item))
      // TODO replace it with Exception and dispatcher-level handling
      return ResponseEntity.badRequest().build();

    copyData(existing, item);

    T saved = repo.save(existing);

    if (this.explicitReload)
      saved = repo.findById(id).get();
    // this produces both Last-Modified and Date headers on the response - it's ok
    // in fact, the tiny possible difference can provide useful info for client
    return ResponseEntity.noContent().lastModified(saved.getLastModified().getTime()).build();
  }

  protected long getLastModified(T existing, boolean readOnly) {
    return existing.getLastModified().getTime();
  }

  protected boolean validateResource(T existing, T incoming) {
    return true;
  }

  protected abstract void copyData(T existing, T incoming);

  public static boolean eq(Object existing, Object incoming, boolean required) {
    return required ? incoming != null && incoming.equals(existing) : (incoming == null || incoming.equals(existing));
  }
}
