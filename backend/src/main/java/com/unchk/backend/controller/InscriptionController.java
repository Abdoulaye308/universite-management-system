package com.unchk.backend.controller;

import com.unchk.backend.entity.Inscription;

import com.unchk.backend.service.InscriptionService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InscriptionController {

    private final InscriptionService service;

    // Ajouter
    @PostMapping
    public Inscription create(
            @RequestBody Inscription inscription
    ) {

        return service.save(inscription);
    }

    // Liste
    @GetMapping
    public List<Inscription> getAll() {

        return service.getAll();
    }

    // Étudiant
    @GetMapping("/student/{studentId}")
    public List<Inscription> getByStudent(
            @PathVariable Long studentId
    ) {

        return service.getByStudent(studentId);
    }

    @GetMapping("/{id}")
    public Inscription getById(
            @PathVariable Long id
    ) {

        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Inscription update(
            @PathVariable Long id,
            @RequestBody Inscription inscription
    ) {

        return service.update(
                id,
                inscription
        );
    }

    // Formation
    @GetMapping("/formation/{formationId}")
    public List<Inscription> getByFormation(
            @PathVariable Long formationId
    ) {

        return service.getByFormation(
                formationId
        );
    }

    // Supprimer
    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return "Inscription supprimée";
    }
}