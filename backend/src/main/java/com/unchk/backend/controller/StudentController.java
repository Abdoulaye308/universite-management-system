package com.unchk.backend.controller;

import com.unchk.backend.entity.Student;

import com.unchk.backend.service.StudentService;
import com.unchk.backend.service.StudentPdfService;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudentController {

    // Injection service
    private final StudentService studentService;
    //pdf
    private final StudentPdfService pdfService;
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

    // Rechercher étudiant par email
    @GetMapping("/email/{email}")
    public Student getStudentByEmail(
            @PathVariable String email
    ) {

        return studentService
                .getStudentByEmail(email);
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
                "attachment; filename=etudiants.pdf"
        );

        pdfService.export(
                studentService.getAllStudents(),
                response
        );
    }
}