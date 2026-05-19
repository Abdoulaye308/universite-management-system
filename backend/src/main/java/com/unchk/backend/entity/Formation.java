package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // Cette classe devient une table SQL
@Table(name = "formations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Formation {

    // Clé primaire
    @Id

    // ID auto-incrémenté
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nom de la formation
    private String nom;

    // Type de formation
    private String typeFormation;

    // Niveau
    private String niveau;

    // Date début
    private String dateDebut;

    // Date fin
    private String dateFin;

    // Financement
    private String financement;

    // Nombre étudiants hommes
    private Integer nombreHommes;

    // Nombre étudiants femmes
    private Integer nombreFemmes;
}