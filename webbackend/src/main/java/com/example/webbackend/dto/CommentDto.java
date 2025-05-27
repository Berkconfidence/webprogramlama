package com.example.webbackend.dto;

import com.example.webbackend.entity.Post;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {

    private Integer commentId;
    private Post post;
    private String username;
    private String comment;
    private LocalDateTime createdAt;
}
