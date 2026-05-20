package com.unchk.backend.controller;

import com.unchk.backend.entity.EmploiDuTemps;

import com.unchk.backend.service.EmploiDuTempsService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emplois")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmploiDuTempsController {

    // Injection service
    private final EmploiDuTempsService service;

    // Ajouter séance
    @PostMapping
    public EmploiDuTemps create(
            @RequestBody EmploiDuTemps emploi
    ) {

        return service.save(emploi);
    }

    // Liste emplois
    @GetMapping
    public List<EmploiDuTemps> getAll() {

        return service.getAll();
    }

    // Détails emploi
    @GetMapping("/{id}")
    public EmploiDuTemps getById(
            @PathVariable Long id
    ) {

        return service.getById(id);
    }

    // Modifier emploi
    @PutMapping("/{id}")
    public EmploiDuTemps update(
            @PathVariable Long id,
            @RequestBody EmploiDuTemps emploi
    ) {

        return service.update(id, emploi);
    }

    // Supprimer emploi
    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return "Séance supprimée avec succès";
    }
}