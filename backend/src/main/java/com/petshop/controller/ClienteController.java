package com.petshop.controller;

import com.petshop.dto.ClienteDTO;
import com.petshop.model.Cliente;
import com.petshop.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<ClienteDTO> findAll() {
        return clienteService.findAll().stream().map(c -> {
            ClienteDTO dto = new ClienteDTO();
            dto.setId(c.getId());
            dto.setNome(c.getNome());
            dto.setEmail(c.getEmail());
            dto.setTelefone(c.getTelefone());
            return dto;
        }).collect(Collectors.toList());
    }

    @PostMapping
    public ClienteDTO save(@RequestBody ClienteDTO clienteDto) {
        Cliente cliente = new Cliente();
        cliente.setNome(clienteDto.getNome());
        cliente.setEmail(clienteDto.getEmail());
        cliente.setTelefone(clienteDto.getTelefone());
        Cliente savedCliente = clienteService.save(cliente);
        
        ClienteDTO dto = new ClienteDTO();
        dto.setId(savedCliente.getId());
        dto.setNome(savedCliente.getNome());
        dto.setEmail(savedCliente.getEmail());
        dto.setTelefone(savedCliente.getTelefone());
        return dto;
    }

    @PutMapping("/{id}")
    public ClienteDTO update(@PathVariable Long id, @RequestBody ClienteDTO clienteDto) {
        Cliente cliente = clienteService.findById(id).orElseThrow(() -> new RuntimeException("Cliente not found"));
        cliente.setNome(clienteDto.getNome());
        cliente.setEmail(clienteDto.getEmail());
        cliente.setTelefone(clienteDto.getTelefone());
        Cliente updatedCliente = clienteService.save(cliente);
        
        ClienteDTO dto = new ClienteDTO();
        dto.setId(updatedCliente.getId());
        dto.setNome(updatedCliente.getNome());
        dto.setEmail(updatedCliente.getEmail());
        dto.setTelefone(updatedCliente.getTelefone());
        return dto;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        clienteService.deleteById(id);
    }
}
