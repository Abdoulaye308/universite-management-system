package com.unchk.backend.controller;

import com.unchk.backend.entity.Formateur;

import com.unchk.backend.service.FormateurService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formateurs")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FormateurController {

    private final FormateurService service;

    // Ajouter formateur
    @PostMapping
    public Formateur create(
            @RequestBody Formateur formateur
    ) {

        return service.save(formateur);
    }

    // Liste formateurs
    @GetMapping
    public List<Formateur> getAll() {

        return service.getAll();
    }

    // Formateur par ID
    @GetMapping("/{id}")
    public Formateur getById(
            @PathVariable Long id
    ) {

        return service.getById(id);
    }

    // Modifier formateur
    @PutMapping("/{id}")
    public Formateur update(
            @PathVariable Long id,
            @RequestBody Formateur formateur
    ) {

        return service.update(id, formateur);
    }

    // Supprimer formateur
    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return "Formateur supprimé avec succès";
    }

    @GetMapping("/email/{email}")
    public Formateur getByEmail(
            @PathVariable String email
    ) {

        return service.getByEmail(email);
    }
}