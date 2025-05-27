package com.example.webbackend.dto;

import com.example.webbackend.entity.Comment;
import com.example.webbackend.entity.Like;
import com.example.webbackend.entity.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDto {

    private Integer postId;
    private User user;
    private byte[] image;
    private Double rating;
    private String caption;
    private LocalDateTime createdAt = LocalDateTime.now();
    private List<Comment> comments;
    private List<Like> likes;
}
