package com.example.webbackend.dto;

import lombok.Data;

@Data
public class CreateCommentRequest {
    private Integer userId;
    private Integer postId;
    private String content;
}