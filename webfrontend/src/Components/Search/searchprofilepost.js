import React, { useState , useEffect} from "react";
import '../Profile/post.css';
import '../Explore/explore.css';
import { StarRating } from "../Share/starrating.tsx";


function SearchProfilePost({user}) {
    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedPost, setSelectedPost] = React.useState(null);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const userId = user.userId;


    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/post/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    // Tarihe göre azalan sırala (en güncel en başta)
                    const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setPosts(sorted);
                } else {
                    console.error("Postlar alınamadı.");
                }
            } catch (error) {
                console.error("Fetch hatası:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [userId]);

     // Modal açıldığında yorumları getir ve beğeni durumunu kontrol et
    useEffect(() => {
        if (selectedPost) {
            setCommentsLoading(true);
            fetch(`/comment/${selectedPost.postId}`)
                .then(res => res.ok ? res.json() : [])
                .then(data => setComments(data))
                .catch(() => setComments([]))
                .finally(() => setCommentsLoading(false));

            // Beğeni durumu kontrolü
            fetch(`/like/isliked?userId=${userId}&postId=${selectedPost.postId}`, {
                method: 'GET'
            })
                .then(res => res.ok ? res.json() : { liked: false })
                .then(data => setIsLiked(data.liked))
                .catch(() => setIsLiked(false));
        } else {
            setComments([]);
            setIsLiked(false);
        }
    }, [selectedPost, userId]);

    const handleAddComment = async () => {
        if (!commentInput.trim() || !selectedPost) return;
        try {
            const response = await fetch('/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: selectedPost.postId,
                    content: commentInput
                }),
            });
            if (response.ok) {
                setCommentInput("");
                // Yorum eklendikten sonra tekrar fetch et
                const updatedComments = await fetch(`/comment/${selectedPost.postId}`);
                if (updatedComments.ok) {
                    setComments(await updatedComments.json());
                }
            } else {
                alert("Yorum eklenemedi.");
            }
        } catch (error) {
            console.error("Yorum ekleme hatası:", error);
        }
    };

    // Beğeni butonuna tıklama
    const handleLike = async () => {
        if (!selectedPost || likeLoading) return;
        setLikeLoading(true);
        try {
            if (!isLiked) {
                // Beğen
                const response = await fetch('/like', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        postId: selectedPost.postId
                    }),
                });
                if (response.ok) {
                    setIsLiked(true);
                    setSelectedPost(prev => ({
                        ...prev,
                        likes: prev.likes ? [...prev.likes, userId] : [userId]
                    }));
                } else {
                    const err = await response.text();
                    alert("Beğeni eklenemedi: " + err);
                }
            } else {
                // Beğeniyi geri çek
                const response = await fetch('/like/unlike', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        postId: selectedPost.postId
                    }),
                });
                if (response.ok) {
                    setIsLiked(false);
                    setSelectedPost(prev => ({
                        ...prev,
                        likes: prev.likes ? prev.likes.filter(id => id !== userId && id !== Number(userId)) : []
                    }));
                } else {
                    const err = await response.text();
                    alert("Beğeni geri çekilemedi: " + err);
                }
            }
        } catch (error) {
            console.error("Beğeni hatası:", error);
        } finally {
            setLikeLoading(false);
        }
    };

    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div>
            <div className="post-container">
                {posts.map((post) => (
                    <div
                        key={post.postId}
                        className="post-card"
                        onClick={() => setSelectedPost(post)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="post-image-wrapper">
                            <img
                                src={
                                    post.image
                                        ? post.image.startsWith("http")
                                            ? post.image
                                            : `data:image/jpeg;base64,${post.image}`
                                        : "/default.png"
                                }
                                alt="Post Resmi"
                                className="post-image"
                            />
                        </div>
                        <div className="post-content">
                            <div className="post-rating">
                                <StarRating rating={post.rating} max={5} />
                            </div>
                            <p className="post-review">{post.review}</p>
                            <div className="post-meta">
                                <span className="explore-meta-item">❤️ {post.likes ? post.likes.length : 0} Beğeni</span>
                                <span className="explore-meta-item">💬 {post.comments ? post.comments.length : 0} Yorum</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPost && (
                <div className="explore-modal-overlay" onClick={() => setSelectedPost(null)}>
                    <div className="explore-modal-card" onClick={e => e.stopPropagation()}>
                        <button className="explore-modal-close" onClick={() => setSelectedPost(null)}>×</button>
                        <div className="explore-image-wrapper">
                            <img
                                src={
                                    selectedPost.image
                                        ? selectedPost.image.startsWith("http")
                                            ? selectedPost.image
                                            : `data:image/jpeg;base64,${selectedPost.image}`
                                        : "/default.png"
                                }
                                alt="Post Resmi"
                                className="explore-image"
                            />
                        </div>
                        <div className="explore-content">
                            <div className="explore-rating">
                                <StarRating rating={selectedPost.rating} max={5} />
                            </div>
                            <p className="explore-review">{selectedPost.review}</p>
                            <div className="explore-meta">
                                <span className="explore-meta-item">
                                    {/* Beğeni butonu */}
                                    <button
                                        className={`explore-like-btn${isLiked ? " liked" : ""}`}
                                        onClick={handleLike}
                                        disabled={likeLoading}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: isLiked ? "red" : "black",
                                            cursor: likeLoading ? "wait" : "pointer",
                                            fontSize: "1.2em",
                                            marginRight: "8px"
                                        }}
                                        title={isLiked ? "Beğenmekten vazgeç" : "Beğen"}
                                    >
                                        {isLiked ? "❤️" : "🤍"}
                                    </button>
                                    {selectedPost.likes ? selectedPost.likes.length : 0} Beğeni
                                </span>
                                <span className="explore-meta-item">💬 {comments.length} Yorum</span>
                            </div>
                            <div className="explore-comments-section">
                                <div className="explore-comments-list">
                                    {commentsLoading ? (
                                        <div className="explore-comment-empty">Yorumlar yükleniyor...</div>
                                    ) : comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <div key={comment.commentId} className="explore-comment-item">
                                                <span className="explore-comment-user">{comment.username}:</span>
                                                <span className="explore-comment-content">{comment.comment}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="explore-comment-empty">Henüz yorum yok.</div>
                                    )}
                                </div>
                                <div className="explore-comment-input-row">
                                    <input
                                        type="text"
                                        className="explore-comment-input"
                                        placeholder="Yorum ekle..."
                                        value={commentInput}
                                        onChange={e => setCommentInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === "Enter") handleAddComment(); }}
                                    />
                                    <button className="explore-comment-add-btn" onClick={handleAddComment}>Gönder</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default SearchProfilePost;