package org.example.repositories;

import org.example.models.Aluno;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlunoRepository extends MongoRepository<Aluno, String> {
}
