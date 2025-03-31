package org.example.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter @Setter
public class Livro {
    @Id
    private String id;
    private String nome;
    private String autor;
    private int qtdPaginas;
    private String tipo;
}
