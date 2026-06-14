package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "reunions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reunion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private String sujet;

    private String date;

    private String heure;

    private String salle;

    // FORMATION (optionnel)
    private Long formationId;

    private String formationNom;

    // CIBLE
    private String cible;

    // Service
    private String serviceConcerne;

    private String participants;

    @Column(length = 5000)
    private String compteRendu;
}