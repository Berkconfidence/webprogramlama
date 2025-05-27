package com.example.webbackend.service;

import com.example.webbackend.dto.CommentDto;
import com.example.webbackend.dto.CreateCommentRequest;
import com.example.webbackend.entity.Comment;
import com.example.webbackend.entity.Post;
import com.example.webbackend.entity.User;
import com.example.webbackend.repository.CommentRepository;
import com.example.webbackend.repository.PostRepository;
import com.example.webbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;


    public List<CommentDto> getCommentDtosByPostId(Integer postId) {
        List<Comment> comments = commentRepository.findAllByPost_PostId(postId);
        return comments.stream().map(comment -> {
            CommentDto dto = new CommentDto();
            dto.setCommentId(comment.getCommentId());
            dto.setPost(comment.getPost());
            dto.setUsername(comment.getUser().getUsername());
            dto.setComment(comment.getComment());
            dto.setCreatedAt(comment.getCreatedAt());
            return dto;
        }).toList();
    }

    public Comment createComment(CreateCommentRequest request) {
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post bulunamadı"));
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(user);
        comment.setComment(request.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }


}
