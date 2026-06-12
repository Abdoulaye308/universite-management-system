package com.unchk.backend.service;

import com.unchk.backend.entity.Budget;
import com.unchk.backend.repository.BudgetRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository repository;

    // Ajouter
    public Budget save(Budget budget) {

        return repository.save(budget);
    }

    // Liste
    public List<Budget> getAll() {

        return repository.findAll();
    }

    // Par ID
    public Budget getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Budget introuvable"
                        ));
    }

    // Modifier
    public Budget update(
            Long id,
            Budget details
    ) {

        Budget budget =
                getById(id);

        budget.setType(
                details.getType()
        );

        budget.setTitre(
                details.getTitre()
        );

        budget.setDescription(
                details.getDescription()
        );

        budget.setMontant(
                details.getMontant()
        );

        budget.setDateCreation(
                details.getDateCreation()
        );

        return repository.save(
                budget
        );
    }

    // Supprimer
    public void delete(Long id) {

        repository.deleteById(id);
    }
}