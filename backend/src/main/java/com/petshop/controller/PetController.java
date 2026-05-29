package com.petshop.controller;

import com.petshop.dto.PetDTO;
import com.petshop.model.Pet;
import com.petshop.model.Cliente;
import com.petshop.service.PetService;
import com.petshop.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {
    @Autowired
    private PetService petService;
    
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<PetDTO> findAll() {
        return petService.findAll().stream().map(p -> {
            PetDTO dto = new PetDTO();
            dto.setId(p.getId());
            dto.setNome(p.getNome());
            dto.setEspecie(p.getEspecie());
            dto.setRaca(p.getRaca());
            dto.setClienteId(p.getCliente().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @PostMapping
    public PetDTO save(@RequestBody PetDTO petDto) {
        Pet pet = new Pet();
        pet.setNome(petDto.getNome());
        pet.setEspecie(petDto.getEspecie());
        pet.setRaca(petDto.getRaca());
        
        Cliente cliente = clienteService.findById(petDto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente not found"));
        pet.setCliente(cliente);
        
        Pet savedPet = petService.save(pet);
        
        PetDTO dto = new PetDTO();
        dto.setId(savedPet.getId());
        dto.setNome(savedPet.getNome());
        dto.setEspecie(savedPet.getEspecie());
        dto.setRaca(savedPet.getRaca());
        dto.setClienteId(savedPet.getCliente().getId());
        return dto;
    }

    @PutMapping("/{id}")
    public PetDTO update(@PathVariable Long id, @RequestBody PetDTO petDto) {
        Pet pet = petService.findById(id).orElseThrow(() -> new RuntimeException("Pet not found"));
        pet.setNome(petDto.getNome());
        pet.setEspecie(petDto.getEspecie());
        pet.setRaca(petDto.getRaca());
        
        Cliente cliente = clienteService.findById(petDto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente not found"));
        pet.setCliente(cliente);
        
        Pet updatedPet = petService.save(pet);
        
        PetDTO dto = new PetDTO();
        dto.setId(updatedPet.getId());
        dto.setNome(updatedPet.getNome());
        dto.setEspecie(updatedPet.getEspecie());
        dto.setRaca(updatedPet.getRaca());
        dto.setClienteId(updatedPet.getCliente().getId());
        return dto;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        petService.deleteById(id);
    }
}
