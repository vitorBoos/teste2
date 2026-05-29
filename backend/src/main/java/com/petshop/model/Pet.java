package com.petshop.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private String especie;
    
    @Column(nullable = false)
    private String raca;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
}
