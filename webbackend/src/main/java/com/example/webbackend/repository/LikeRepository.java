package com.example.webbackend.repository;

import com.example.webbackend.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {
    boolean existsByUser_UserIdAndPost_PostId(Integer userId, Integer postId);

    Optional<Like> findByUser_UserIdAndPost_PostId(Integer userId, Integer postId);
}
