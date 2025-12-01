package com.react_spring.service;

import com.react_spring.model.Student;
import com.react_spring.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService{

private final StudentRepository studentRepository;

public StudentServiceImpl(StudentRepository studentRepository){
    this.studentRepository = studentRepository;
}

    @Override
    public Student saveStudent(Student student) {
        return this.studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudent() {
        return this.studentRepository.findAll();
    }


    @Override
    public Student updateStudent(Student student, Long id) {

   Optional<Student> st = this.studentRepository.findById(id);

   if(st.isPresent()){
       Student studentToUpdate = st.get();
       if(student.getNom() != null && !student.getNom().isEmpty()){
           studentToUpdate.setNom(student.getNom());
       }
       if(student.getPrenom() != null && !student.getPrenom().isEmpty()){
           studentToUpdate.setPrenom(student.getPrenom());
       }
       if(student.getEmail() != null && !student.getEmail().isEmpty()){
           studentToUpdate.setEmail(student.getEmail());
       }
       this.studentRepository.save(studentToUpdate);

        return  studentToUpdate;
   }
        return  null;

    }

    @Override
    public Student getStudentById(Long id) {
        return this.studentRepository.findById(id).get();
    }

    public void deleteById(Long id){
        this.studentRepository.deleteById(id);
    }


}
