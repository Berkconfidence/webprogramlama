package com.example.webbackend.controller;


import com.example.webbackend.dto.PostDto;
import com.example.webbackend.entity.Post;
import com.example.webbackend.entity.User;
import com.example.webbackend.service.PostService;
import com.example.webbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllUserPosts(@PathVariable Long userId) {
        List<Post> posts = postService.getAllUserPosts(userId);
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(
            @RequestParam("userId") Long userId,
            @RequestParam("photo") MultipartFile image,
            @RequestParam("rating") Double rating,
            @RequestParam("review") String review
    ) {
        try {
            Post post = postService.createPost(userId, image, rating, review);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
