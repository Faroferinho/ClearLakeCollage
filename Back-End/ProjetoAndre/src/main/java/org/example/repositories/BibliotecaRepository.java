package org.example.repositories;

import org.example.models.Biblioteca;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BibliotecaRepository extends MongoRepository<Biblioteca, String> {
}
