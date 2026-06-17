package com.unchk.backend.controller;

import com.unchk.backend.entity.AdministrationDocument;
import com.unchk.backend.service.AdministrationDocumentService;
import com.unchk.backend.service.AdministrationDocumentPdfService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin-documents")

@RequiredArgsConstructor
@CrossOrigin("*")
public class AdministrationDocumentController {
    //service pdf
    private final AdministrationDocumentPdfService pdfService;

    private final AdministrationDocumentService service;
     // ajout
    @PostMapping
    public AdministrationDocument add(
            @RequestBody
            AdministrationDocument document
    ) {
        return service.save(document);
    }
//récupérer tous les docs
    @GetMapping
    public List<AdministrationDocument> getAll() {
        return service.getAll();
    }

    //récupérer un document par son ID
    @GetMapping("/{id}")
    public AdministrationDocument getById(
            @PathVariable Long id
    ) {
        return service.getById(id);
    }
    // modifier un document en passant par son Id
    @PutMapping("/{id}")
    public AdministrationDocument update(
            @PathVariable Long id,
            @RequestBody
            AdministrationDocument document
    ) {
        return service.update(id, document);
    }
    //supprimer
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        service.delete(id);
    }
    //pdf
    @GetMapping("/export/pdf")
    public void exportPdf(
            HttpServletResponse response
    ) throws Exception {

        response.setContentType(
                "application/pdf"
        );

        response.setHeader(
                "Content-Disposition",
                "attachment; filename=documents-administratifs.pdf"
        );

        pdfService.export(
                service.getAll(),
                response
        );
    }
}