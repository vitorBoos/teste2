package com.petshop.dto;

import lombok.Data;

@Data
public class PetDTO {
    private Long id;
    private String nome;
    private String especie;
    private String raca;
    private Long clienteId;
}
