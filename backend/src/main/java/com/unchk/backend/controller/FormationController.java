package com.unchk.backend.controller;

import com.unchk.backend.entity.Formation;

import com.unchk.backend.service.FormationService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // API REST
@RequestMapping("/api/formations")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FormationController {

    // Injection service
    private final FormationService formationService;

    // Ajouter formation
    @PostMapping
    public Formation createFormation(
            @RequestBody Formation formation
    ) {

        return formationService.saveFormation(formation);
    }

    // Liste formations
    @GetMapping
    public List<Formation> getAllFormations() {

        return formationService.getAllFormations();
    }

    // Formation par ID
    @GetMapping("/{id}")
    public Formation getFormationById(
            @PathVariable Long id
    ) {

        return formationService.getFormationById(id);
    }

    // Modifier formation
    @PutMapping("/{id}")
    public Formation updateFormation(
            @PathVariable Long id,
            @RequestBody Formation formation
    ) {

        return formationService.updateFormation(id, formation);
    }

    // Supprimer formation
    @DeleteMapping("/{id}")
    public String deleteFormation(
            @PathVariable Long id
    ) {

        formationService.deleteFormation(id);

        return "Formation supprimée avec succès";
    }
}