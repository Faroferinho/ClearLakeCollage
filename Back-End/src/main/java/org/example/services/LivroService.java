package org.example.services;

import org.example.models.Livro;
import org.example.repositories.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;
    public Livro save(Livro livro){
        livroRepository.save(livro);
        return livro;
    }
    public List<Livro> findAll(){
        return livroRepository.findAll();
    }
    public Optional<Livro> findById(String id){
        return livroRepository.findById(id);
    }
    public void deleteById(String id){
        livroRepository.deleteById(id);
    }
}
