import React from "react";
import '../Profile/profile.css';
import SearchProfilePost from "./searchprofilepost";
import DefaultProfile from '../../assets/profile.png';

function SearchProfile({ user, onBack }) {
    if (!user) return null;
    return (
        <div>
            <div className="profile-card">
                <div className="profile-header">
                    <img
                        src={
                            user.profilePhoto
                                ? user.profilePhoto.startsWith("http")
                                    ? user.profilePhoto
                                    : `data:image/jpeg;base64,${user.profilePhoto}`
                                : DefaultProfile
                        }
                        alt="Profil Resmi" style={{ width: "110px", height: "110px", borderRadius: "50%", marginTop: "18px" }}
                    />
                    <div className="profile-header-info">
                        <h1 className="profile-username">{user.username}</h1>
                        <p className="profile-bio">{user.bio}</p>
                        <div className="profile-posts">
                            <div className="profile-info-count">
                                <strong>{user.posts.length}</strong> Gönderi
                            </div>
                            <div className="profile-info-count">
                                <strong>{user.comments.length}</strong> Yorum
                            </div>
                            <div className="profile-info-count">
                                <strong>{user.likes.length}</strong> Beğeni
                            </div>
                        </div>
                    </div>
                    <button className="profile-edit-button" onClick={onBack}>← Geri</button>
                </div>
             </div>
             <SearchProfilePost user={user} />
        </div>

    );
}
export default SearchProfile;