package com.unchk.backend.controller;

import com.unchk.backend.entity.Stage;
import com.unchk.backend.service.StageService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stages")
@RequiredArgsConstructor

@CrossOrigin(origins = "*")
public class StageController {

    private final StageService service;

    // =========================
    // AJOUT
    // =========================

    @PostMapping
    public Stage save(
            @RequestBody Stage stage
    ) {

        return service.save(stage);
    }

    // =========================
    // LISTE
    // =========================

    @GetMapping
    public List<Stage> getAll() {

        return service.getAll();
    }

    // =========================
    // PAR ID
    // =========================

    @GetMapping("/{id}")
    public Stage getById(
            @PathVariable Long id
    ) {

        return service.getById(id);
    }

    // =========================
    // UPDATE
    // =========================

    @PutMapping("/{id}")
    public Stage update(
            @PathVariable Long id,
            @RequestBody Stage stage
    ) {

        return service.update(
                id,
                stage
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