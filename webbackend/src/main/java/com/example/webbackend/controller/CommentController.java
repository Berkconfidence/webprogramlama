package com.example.webbackend.controller;

import com.example.webbackend.dto.CommentDto;
import com.example.webbackend.dto.CreateCommentRequest;
import com.example.webbackend.entity.Comment;
import com.example.webbackend.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{postId}")
    public ResponseEntity<?> getCommentsByPost(@PathVariable Integer postId) {
        try {
            List<CommentDto> commentDtos = commentService.getCommentDtosByPostId(postId);
            return ResponseEntity.ok(commentDtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody CreateCommentRequest request) {
        try {
            Comment comment = commentService.createComment(request);
            return ResponseEntity.ok(comment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
