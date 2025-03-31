package org.example.controllers;

import org.example.constant.Constant;
import org.example.models.Biblioteca;
import org.example.models.Livro;
import org.example.services.BibliotecaService;
import org.example.services.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BibliotecaController {
    @Autowired
    private BibliotecaService bibliotecaService;

    @Autowired
    private LivroService livroService;

    @PostMapping(Constant.API_BIBLIOTECA)
    public ResponseEntity<Biblioteca> createCustomer(@RequestBody Biblioteca biblioteca) {
        Livro livro = livroService.save(biblioteca.getLivro());
        biblioteca.setLivro(livro);
        Biblioteca savedCustomer = bibliotecaService.save(biblioteca);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
    }

    @PutMapping(Constant.API_BIBLIOTECA)
    public ResponseEntity<Biblioteca>  update(@RequestBody Biblioteca biblioteca){
        Biblioteca savedCustomer = bibliotecaService.save(biblioteca);
        return ResponseEntity.ok(savedCustomer);

    }
    @DeleteMapping(Constant.API_BIBLIOTECA + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") String id){
        bibliotecaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping(Constant.API_BIBLIOTECA)
    public ResponseEntity<List<Biblioteca>> findAll(){
        return ResponseEntity.ok(bibliotecaService.findAll());
    }
    @GetMapping(Constant.API_BIBLIOTECA + "/{id}")
    public ResponseEntity<Optional<Biblioteca>> findById(@PathVariable("id") String id){
        return ResponseEntity.ok(bibliotecaService.findById(id));
    }
}
