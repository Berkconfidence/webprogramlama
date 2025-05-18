package com.example.webbackend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDto {

    private String username;
    private String email;
    private String password;
    private Date created;

}

