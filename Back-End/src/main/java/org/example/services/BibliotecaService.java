package org.example.services;

import org.example.models.Biblioteca;
import org.example.repositories.BibliotecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BibliotecaService {
    @Autowired
    private BibliotecaRepository bibliotecaRepository;
    public Biblioteca save(Biblioteca biblioteca){
        bibliotecaRepository.save(biblioteca);
        return biblioteca;
    }
    public List<Biblioteca> findAll(){
        return bibliotecaRepository.findAll();
    }
    public Optional<Biblioteca> findById(String id){
        return bibliotecaRepository.findById(id);
    }
    public void deleteById(String id){
        bibliotecaRepository.deleteById(id);
    }
}
