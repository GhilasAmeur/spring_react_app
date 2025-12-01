package com.react_spring.controller;

import com.react_spring.model.Student;
import com.react_spring.service.StudentServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/student")

public class StudentController {

    private final StudentServiceImpl studentServiceImpl;

    public StudentController(StudentServiceImpl studentServiceImpl){
        this.studentServiceImpl = studentServiceImpl;
    }

    @PostMapping("/add")
    public ResponseEntity<Student> saveStudent(@RequestBody Student student){
        return  new ResponseEntity<>(this.studentServiceImpl.saveStudent(student), HttpStatus.CREATED);
    }

    @GetMapping("/getStudents")
    public ResponseEntity<List<Student>> getAllStudent(){
        return new ResponseEntity<>(this.studentServiceImpl.getAllStudent(), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student,@PathVariable Long id){
       return  new ResponseEntity<>(this.studentServiceImpl.updateStudent(student, id), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id){
        this.studentServiceImpl.deleteById(id);
        return  ResponseEntity.ok().build();

    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id){
        return new ResponseEntity<>(this.studentServiceImpl.getStudentById(id), HttpStatus.OK);
    }

}
