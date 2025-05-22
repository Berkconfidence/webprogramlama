package com.example.webbackend.service;

import com.example.webbackend.entity.Post;
import com.example.webbackend.entity.User;
import com.example.webbackend.repository.PostRepository;
import com.example.webbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@AllArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post createPost(Long userId, MultipartFile image, Double rating, String review) {

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Kullanıcı bulunamadı");
        }
        User user = userOpt.get();

        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Fotoğraf yüklenmedi");
        }
        if (rating == null || rating <= 0) {
            throw new IllegalArgumentException("Geçersiz puan");
        }
        if (review == null || review.trim().isEmpty()) {
            throw new IllegalArgumentException("Değerlendirme boş olamaz");
        }

        Post post = new Post();
        post.setUser(user);
        post.setRating(rating);
        post.setReview(review);

        try {
            post.setImage(image.getBytes());
        } catch (Exception e) {
            throw new RuntimeException("Fotoğraf kaydedilemedi", e);
        }

        return postRepository.save(post);
    }
}
