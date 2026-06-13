package com.unchk.backend.controller;

import com.unchk.backend.entity.Budget;
import com.unchk.backend.service.BudgetService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BudgetController {

    private final BudgetService service;
    //ajout
    @PostMapping
    public Budget add(
            @RequestBody Budget budget
    ) {

        return service.save(budget);
    }
    //récupérer la liste des budgets
    @GetMapping
    public List<Budget> getAll() {

        return service.getAll();
    }
//modifier
    @PutMapping("/{id}")
    public Budget update(
            @PathVariable Long id,
            @RequestBody Budget budget
    ) {

        return service.update(
                id,
                budget
        );
    }
    //supprimer
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {

        service.delete(id);
    }
}