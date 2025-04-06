package org.example.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter @Setter
public class Aluno {
    @Id
    String id;
    String nome;
    String telefone;
    String email;
    String endereco;
}
