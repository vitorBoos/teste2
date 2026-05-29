package com.petshop.dto;

import lombok.Data;

@Data
public class ClienteDTO {
    private Long id;
    private String nome;
    private String email;
    private String telefone;
}
