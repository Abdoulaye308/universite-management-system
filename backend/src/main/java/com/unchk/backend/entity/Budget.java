package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "budgets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // PROJET_BUDGET
    // NOTE_ORIENTATION
    // BUDGET_REALISE
    private String type;

    private String titre;

    @Column(length = 5000)
    private String description;

    private Double montant;

    private String dateCreation;
}