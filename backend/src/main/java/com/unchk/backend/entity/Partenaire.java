package com.unchk.backend.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "partenaires")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Partenaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nom entreprise
    private String organisme;

    // Responsable
    private String contact;

    // Téléphone
    private String telephone;

    // Email
    private String email;

    // Convention de stage
    // Recrutement
    // Financement
    private String typePartenariat;
}