package com.unchk.backend.controller;

import com.unchk.backend.entity.Student;

import com.unchk.backend.service.StudentService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // API REST
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudentController {

    // Injection service
    private final StudentService studentService;

    // Ajouter étudiant
    @PostMapping
    public Student createStudent(@RequestBody Student student) {

        return studentService.saveStudent(student);
    }

    // Afficher tous les étudiants
    @GetMapping
    public List<Student> getAllStudents() {

        return studentService.getAllStudents();
    }

    // Afficher étudiant par ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {

        return studentService.getStudentById(id);
    }

    // Modifier étudiant
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student
    ) {

        return studentService.updateStudent(id, student);
    }

    // Supprimer étudiant
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Etudiant supprimé avec succès";
    }
}