package com.example.webbackend.service;

import com.example.webbackend.entity.User;
import com.example.webbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public List<User> searchUsers(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }
        return userRepository.findByUsernameContainingIgnoreCase(query);
    }

    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null || !user.getPasswordHash().equals(password)) {
            return null;
        }

        return user;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
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

    public User updateInfo(Integer userId, MultipartFile image, String username, String bio) {
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

    public User updateEmail(Integer userId, String newEmail) {
        if (userId == null || newEmail == null || newEmail.trim().isEmpty()) {
            throw new IllegalArgumentException("Kullanıcı ID veya yeni e-posta eksik.");
        }
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Kullanıcı bulunamadı.");
        }
        User user = userOpt.get();
        user.setEmail(newEmail);
        return userRepository.save(user);
    }

    public User updatePassword(Integer userId, String newPassword) {
        if (userId == null || newPassword == null || newPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Kullanıcı ID veya yeni şifre eksik.");
        }
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Kullanıcı bulunamadı.");
        }
        User user = userOpt.get();
        user.setPasswordHash(newPassword);
        return userRepository.save(user);
    }
}
