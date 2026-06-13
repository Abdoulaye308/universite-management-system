package com.unchk.backend.controller;

import com.unchk.backend.entity.Document;
import com.unchk.backend.service.DocumentService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DocumentController {

    private final DocumentService service;
//creation
    @PostMapping
    public Document save(
            @RequestBody Document document
    ) {

        return service.save(document);
    }
//récupérer la liste
    @GetMapping
    public List<Document> getAll() {

        return service.getAll();
    }
// récupérer un role
    @GetMapping("/role/{role}")
    public List<Document> getByRole(
            @PathVariable String role
    ) {

        return service.getByRole(role);
    }

// UPDATE
    @PutMapping("/{id}")
    public Document update(
            @PathVariable Long id,
            @RequestBody Document document
    ) {

        return service.update(
                id,
                document
        );
    }
//supprimer
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {

        service.delete(id);
    }
}