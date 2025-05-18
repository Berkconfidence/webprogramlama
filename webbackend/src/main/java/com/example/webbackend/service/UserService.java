package com.example.webbackend.service;

import com.example.webbackend.entity.User;
import com.example.webbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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
}
