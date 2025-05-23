import React from "react";
import './post.css';
import { StarRating } from "../Share/starrating.tsx";

function Post() {
    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const userId = localStorage.getItem("userId");

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/post/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
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

    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className="post-container">
            {posts.map((post) => (
                <div key={post.postId} className="post-card">
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
                            <span className="post-meta-item">❤️ 34 Beğeni</span>
                            <span className="post-meta-item">💬 12 Yorum</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Post;