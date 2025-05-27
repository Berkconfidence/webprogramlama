package com.example.webbackend.service;

import com.example.webbackend.entity.Like;
import com.example.webbackend.entity.Post;
import com.example.webbackend.entity.User;
import com.example.webbackend.repository.LikeRepository;
import com.example.webbackend.repository.PostRepository;
import com.example.webbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public boolean isPostLikedByUser(Integer userId, Integer postId) {
        return likeRepository.existsByUser_UserIdAndPost_PostId(userId, postId);
    }

    @Transactional
    public void likePost(Integer userId, Integer postId) {
        if (likeRepository.existsByUser_UserIdAndPost_PostId(userId, postId)) {
            throw new RuntimeException("Kullanıcı bu gönderiyi zaten beğenmiş.");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post bulunamadı."));
        Like like = new Like();
        like.setUser(user);
        like.setPost(post);
        likeRepository.save(like);
    }

    @Transactional
    public void unlikePost(Integer userId, Integer postId) {
        Like like = likeRepository
                .findByUser_UserIdAndPost_PostId(userId, postId)
                .orElseThrow(() -> new RuntimeException("Beğeni bulunamadı."));
        likeRepository.delete(like);
    }
}
