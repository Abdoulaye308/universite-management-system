package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "formateurs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Formateur {

    // Clé primaire
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nom
    private String nom;

    // Prénom
    private String prenom;

    // Email
    private String email;

    // Grade
    private String grade;

    // Type
    // Enseignant, Associé, Tuteur
    private String type;
    @Column(name = "formation_id")
    private Long formationId;
    // Spécialité
    private String specialite;
}