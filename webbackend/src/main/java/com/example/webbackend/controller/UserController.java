package com.example.webbackend.controller;

import com.example.webbackend.dto.UserDto;
import com.example.webbackend.entity.User;
import com.example.webbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userDto) {
        try {
            User user = userService.loginUser(userDto.getUsername(), userDto.getPassword());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı adı veya şifre hatalı");
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Sunucu hatası: " + e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        try{
            User newUser = userService.createUser(userDto.getUsername(),userDto.getEmail(), userDto.getPassword());
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }

    }
}
