package com.unchk.backend.service;

import com.unchk.backend.entity.Partenaire;
import com.unchk.backend.repository.PartenaireRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartenaireService {

    private final PartenaireRepository repository;

    public Partenaire save(
            Partenaire partenaire
    ) {
        return repository.save(partenaire);
    }

    public List<Partenaire> getAll() {
        return repository.findAll();
    }

    public Partenaire getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Partenaire introuvable"
                        ));
    }

    public Partenaire update(
            Long id,
            Partenaire details
    ) {

        Partenaire partenaire =
                getById(id);

        partenaire.setOrganisme(
                details.getOrganisme()
        );

        partenaire.setContact(
                details.getContact()
        );

        partenaire.setTelephone(
                details.getTelephone()
        );

        partenaire.setEmail(
                details.getEmail()
        );

        partenaire.setTypePartenariat(
                details.getTypePartenariat()
        );

        return repository.save(
                partenaire
        );
    }

    public void delete(Long id) {

        repository.deleteById(id);
    }
}