package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "administration_documents")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdministrationDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // COURRIER_ARRIVEE
    // COURRIER_DEPART
    // NOTE_SERVICE
    // NOTE_ADMINISTRATIVE
    // CIRCULAIRE
    private String type;

    private String titre;

    @Column(length = 5000)
    private String contenu;

    private String dateCreation;
}