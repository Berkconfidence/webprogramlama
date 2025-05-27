package com.example.webbackend.repository;

import com.example.webbackend.entity.Post;
import com.example.webbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findAllByUser(User user);
}
