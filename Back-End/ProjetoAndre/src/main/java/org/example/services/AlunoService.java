package org.example.services;

import org.example.models.Aluno;
import org.example.repositories.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {
    @Autowired
    private AlunoRepository alunoRepository;
    public Aluno save(Aluno aluno){
        alunoRepository.save(aluno);
        return aluno;
    }
    public void deleteById(String id){
        alunoRepository.deleteById(id);
    }
    public List<Aluno> findall(){
        return alunoRepository.findAll();
    }
    public Optional<Aluno> findById(String id){
        return alunoRepository.findById(id);
    }
}
