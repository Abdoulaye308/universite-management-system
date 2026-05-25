package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // Transforme cette classe en table SQL
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    // Clé primaire
    @Id

    // ID auto-incrémenté
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // INE ou identifiant étudiant
    @Column(unique = true)
    private String ine;

    // Nom étudiant
    private String nom;

    // Prénom étudiant
    private String prenom;

    @Column(unique = true)
    private String email;

    // Date naissance
    private String dateNaissance;

    // Formation
    private String formation;

    // Promotion
    private String promo;

    // Année début
    private Integer anneeDebut;

    // Année sortie
    private Integer anneeSortie;

    // Diplômes
    private String diplome;

    // Autres formations
    private String autresFormations;
}