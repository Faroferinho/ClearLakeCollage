package org.example.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter @Setter
public class Biblioteca {
    @Id
    private String id;
    private Livro livro;
    private String dataCadastro;
}
