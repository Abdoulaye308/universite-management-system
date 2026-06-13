package com.unchk.backend.controller;

import com.unchk.backend.entity.Insertion;
import com.unchk.backend.service.InsertionService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insertions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InsertionController {

    private final InsertionService service;

    // =========================
    // AJOUT
    // =========================

    @PostMapping
    public Insertion save(
            @RequestBody Insertion insertion
    ) {

        return service.save(
                insertion
        );
    }

    // =========================
    // LISTE
    // =========================

    @GetMapping
    public List<Insertion> getAll() {

        return service.getAll();
    }

    // =========================
    // PAR ID
    // =========================

    @GetMapping("/{id}")
    public Insertion getById(
            @PathVariable Long id
    ) {

        return service.getById(id);
    }

    // =========================
    // UPDATE
    // =========================

    @PutMapping("/{id}")
    public Insertion update(
            @PathVariable Long id,
            @RequestBody Insertion insertion
    ) {

        return service.update(
                id,
                insertion
        );
    }

    // =========================
    // DELETE
    // =========================

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {

        service.delete(id);
    }
}