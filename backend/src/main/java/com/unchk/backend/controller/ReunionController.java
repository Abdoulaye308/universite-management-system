package com.unchk.backend.controller;

import com.unchk.backend.entity.Reunion;

import com.unchk.backend.service.ReunionService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reunions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReunionController {

    // Injection service
    private final ReunionService service;

    // Ajouter réunion
    @PostMapping
    public Reunion create(
            @RequestBody Reunion reunion
    ) {

        return service.save(reunion);
    }

    // Liste réunions
    @GetMapping
    public List<Reunion> getAll() {

        return service.getAll();
    }

    // Réunion par ID
    @GetMapping("/{id}")
    public Reunion getById(
            @PathVariable Long id
    ) {

        return service.getById(id);
    }

    // Modifier réunion
    @PutMapping("/{id}")
    public Reunion update(
            @PathVariable Long id,
            @RequestBody Reunion reunion
    ) {

        return service.update(id, reunion);
    }

    // Supprimer réunion
    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return "Réunion supprimée avec succès";
    }
}