package com.unchk.backend.controller;

import com.unchk.backend.entity.Partenaire;
import com.unchk.backend.service.PartenaireService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partenaires")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PartenaireController {

    private final PartenaireService service;
    //ajout
    @PostMapping
    public Partenaire save(
            @RequestBody Partenaire partenaire
    ) {
        return service.save(partenaire);
    }
    //récupérer la liste complet
    @GetMapping
    public List<Partenaire> getAll() {
        return service.getAll();
    }
    //modifier
    @PutMapping("/{id}")
    public Partenaire update(
            @PathVariable Long id,
            @RequestBody Partenaire partenaire
    ) {
        return service.update(id, partenaire);
    }
    //supprimer
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        service.delete(id);
    }
}