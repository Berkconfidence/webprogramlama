package com.example.webbackend.service;

import com.example.webbackend.entity.User;
import com.example.webbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null || !user.getPasswordHash().equals(password)) {
            return null;
        }

        return user;
    }

    public User createUser(String username, String email, String password) {

        if(username == null || email == null || password == null)
            throw new IllegalArgumentException("Bilgiler eksik");

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPasswordHash(password);

        return userRepository.save(newUser);
    }

    public User updateInfo(Long userId, MultipartFile image, String username, String bio) {
        if(username == null || userId == null)
            throw new IllegalArgumentException("Bilgiler eksik");

        Optional<User> userOpt = userRepository.findById(userId);

        if(userOpt.isEmpty())
            throw new IllegalArgumentException("Kullanıcı bulunamadı");

        User user = userOpt.get();
        user.setUsername(username);
        user.setBio(bio);
        try {
            if(image != null && !image.isEmpty())
                user.setProfilePhoto(image.getBytes());
        } catch (Exception e) {
            throw new RuntimeException("Fotoğraf kaydedilemedi", e);
        }

        return userRepository.save(user);
    }
}
