package com.example.webbackend.controller;

import com.example.webbackend.service.LikeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/like")
public class LikeController {

    private final LikeService likeService;

    @GetMapping("/isliked")
    public ResponseEntity<?> isPostLikedByUser(@RequestParam Integer userId, @RequestParam Integer postId) {
        boolean liked = likeService.isPostLikedByUser(userId, postId);
        return ResponseEntity.ok().body(java.util.Collections.singletonMap("liked", liked));
    }

    @PostMapping
    public ResponseEntity<?> likePost(@RequestBody Map<String, Integer> request) {
        Integer userId = request.get("userId");
        Integer postId = request.get("postId");
        try {
            likeService.likePost(userId, postId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/unlike")
    public ResponseEntity<?> unlikePost(@RequestBody Map<String, Integer> request) {
        Integer userId = request.get("userId");
        Integer postId = request.get("postId");
        try {
            likeService.unlikePost(userId, postId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
