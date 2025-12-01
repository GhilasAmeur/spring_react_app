package com.react_spring.service;

import com.react_spring.model.Student;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudent();
    public Student updateStudent(Student student, Long id);
    public Student getStudentById(Long id);

}

