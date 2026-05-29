package com.petshop.controller;

import com.petshop.dto.UserDTO;
import com.petshop.model.User;
import com.petshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<UserDTO> findAll() {
        return userService.findAll().stream().map(u -> {
            UserDTO dto = new UserDTO();
            dto.setId(u.getId());
            dto.setEmail(u.getEmail());
            return dto;
        }).collect(Collectors.toList());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO loginDto) {
        return userService.findByEmail(loginDto.getEmail())
                .filter(u -> passwordEncoder.matches(loginDto.getPassword(), u.getPassword()))
                .map(u -> ResponseEntity.ok("Login successful"))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password"));
    }

    @PostMapping
    public UserDTO save(@RequestBody UserDTO userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        User savedUser = userService.save(user);
        
        UserDTO dto = new UserDTO();
        dto.setId(savedUser.getId());
        dto.setEmail(savedUser.getEmail());
        return dto;
    }
}
