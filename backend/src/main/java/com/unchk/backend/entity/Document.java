package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Titre document
    private String titre;

    // Type document
    private String type;

    // Description
    @Column(length = 3000)
    private String description;

    // Rôle concerné
    private String roleCible;

    // Date création
    private String dateCreation;
}