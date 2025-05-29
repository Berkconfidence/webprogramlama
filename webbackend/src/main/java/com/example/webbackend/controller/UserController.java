package com.example.webbackend.controller;

import com.example.webbackend.dto.UserDto;
import com.example.webbackend.entity.User;
import com.example.webbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam("query") String query) {
        try {
            return ResponseEntity.ok(userService.searchUsers(query));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Arama sırasında hata oluştu: " + e.getMessage());
        }
    }

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

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(
            @RequestParam("userId") Integer userId,
            @RequestParam(value = "profilePicture", required = false) MultipartFile image,
            @RequestParam("username") String username,
            @RequestParam("bio") String bio
    ) {
        try {
            User user = userService.updateInfo(userId, image, username, bio);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PutMapping("/update/email")
    public ResponseEntity<?> updateEmail(@RequestParam("userId") Integer userId,
                                         @RequestParam("newEmail") String newEmail) {
        System.out.println("metot deneme");
        try {
            User updatedUser = userService.updateEmail(userId, newEmail);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("E-posta güncellenirken hata oluştu.");
        }
    }

    @PutMapping("/update/password")
    public ResponseEntity<?> updatePassword(@RequestParam("userId") Integer userId,
                                            @RequestParam("newPassword") String newPassword) {
        try {
            User updatedUser = userService.updatePassword(userId, newPassword);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("E-posta güncellenirken hata oluştu.");
        }
    }
}
