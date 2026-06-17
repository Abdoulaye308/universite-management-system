package com.unchk.backend.controller;

import com.unchk.backend.entity.Notification;
import com.unchk.backend.service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService service;

    // Ajouter
    @PostMapping
    public Notification save(
            @RequestBody Notification notification
    ) {

        return service.save(notification);
    }

    // Liste
    @GetMapping
    public List<Notification> getAll() {

        return service.getAll();
    }

    // Par rôle
    @GetMapping("/role/{role}")
    public List<Notification> getByRole(
            @PathVariable String role
    ) {

        return service.getByRole(role);
    }

// UPDATE
    @PutMapping("/{id}")
    public Notification update(
            @PathVariable Long id,
            @RequestBody Notification notification
    ) {

        return service.update(
                id,
                notification
        );
    }

    // Supprimer
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {

        service.delete(id);
    }
}