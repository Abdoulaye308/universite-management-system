package com.unchk.backend.service;

import com.unchk.backend.entity.Student;

import com.unchk.backend.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service // Service métier
@RequiredArgsConstructor
public class StudentService {

    // Injection repository
    private final StudentRepository studentRepository;

    // Ajouter étudiant
    public Student saveStudent(Student student) {

        return studentRepository.save(student);
    }

    // Liste étudiants
    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }

    // Rechercher étudiant par ID
    public Student getStudentById(Long id) {

        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Etudiant introuvable"));
    }

    // Modifier étudiant
    public Student updateStudent(Long id, Student studentDetails) {

        Student student = getStudentById(id);

        student.setIne(studentDetails.getIne());
        student.setNom(studentDetails.getNom());
        student.setPrenom(studentDetails.getPrenom());
        student.setDateNaissance(studentDetails.getDateNaissance());
        student.setFormation(studentDetails.getFormation());
        student.setPromo(studentDetails.getPromo());
        student.setAnneeDebut(studentDetails.getAnneeDebut());
        student.setAnneeSortie(studentDetails.getAnneeSortie());
        student.setDiplome(studentDetails.getDiplome());
        student.setAutresFormations(studentDetails.getAutresFormations());

        return studentRepository.save(student);
    }

    // Supprimer étudiant
    public void deleteStudent(Long id) {

        studentRepository.deleteById(id);
    }
}