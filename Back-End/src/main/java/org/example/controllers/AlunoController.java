package org.example.controllers;

import org.example.constant.Constant;
import org.example.models.Aluno;
import org.example.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.POST})
public class AlunoController {
    @Autowired
    private AlunoService alunoService;

    @PostMapping(Constant.API_ALUNO + '${id}')
    public ResponseEntity<Aluno> createCustomer(@RequestBody Aluno aluno){
        Aluno savedAluno = alunoService.save(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAluno);
    }

    @PostMapping(Constant.API_ALUNO)
    public ResponseEntity<Aluno> update(@RequestBody Aluno aluno){
        Aluno savedAluno = alunoService.save(aluno);
        return ResponseEntity.ok(savedAluno);
    }

    @DeleteMapping(Constant.API_ALUNO + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") String id){
        alunoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(Constant.API_ALUNO)
    public ResponseEntity<List<Aluno>> findall(){
        return ResponseEntity.ok(alunoService.findall());
    }

    @GetMapping(Constant.API_ALUNO + "/{id}")
    public ResponseEntity<Optional<Aluno>> findById(@PathVariable String id){
        return ResponseEntity.ok(alunoService.findById(id));
    }
}
