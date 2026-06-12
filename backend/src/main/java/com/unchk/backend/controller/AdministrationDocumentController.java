package com.unchk.backend.controller;

import com.unchk.backend.entity.AdministrationDocument;
import com.unchk.backend.service.AdministrationDocumentService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin-documents")

@RequiredArgsConstructor
@CrossOrigin("*")
public class AdministrationDocumentController {

    private final AdministrationDocumentService service;

    @PostMapping
    public AdministrationDocument add(
            @RequestBody
            AdministrationDocument document
    ) {
        return service.save(document);
    }

    @GetMapping
    public List<AdministrationDocument> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public AdministrationDocument getById(
            @PathVariable Long id
    ) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public AdministrationDocument update(
            @PathVariable Long id,
            @RequestBody
            AdministrationDocument document
    ) {
        return service.update(id, document);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        service.delete(id);
    }
}