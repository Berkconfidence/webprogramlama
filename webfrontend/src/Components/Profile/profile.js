import React from "react";
import './profile.css';
import Post from "./post";

function Profile() {
    const userId = localStorage.getItem("userId");
    const [userData, setUserData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isEditing, setIsEditing] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [inputKey, setInputKey] = React.useState(Date.now());
    const inputRef = React.useRef();

    const [activeTab, setActiveTab] = React.useState('anasayfa');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const editProfile = () => {
        setIsEditing(isEditing => !isEditing);
    };

    const handleFileChange = (event) => {
        if(event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("username", event.target.username.value);
        formData.append("bio", event.target.bio.value);
        if (selectedFile) {
            formData.append("profilePicture", selectedFile);
        }
        try {
            const response = await fetch(`/user/update`, {
                method: "PUT",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setSelectedFile(null);
                setInputKey(Date.now());
                setIsEditing(false);
            } else {
                console.error("Profil güncellenemedi.");
            }
        } catch (error) {
            console.error("Fetch hatası:", error);
        }
    };

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error("Kullanıcı verileri alınamadı.");
                }
            } catch (error) {
                console.error("Fetch hatası:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    if (!userData) {
        return <div>Kullanıcı bulunamadı.</div>;
    }
    return (
        <div>
            <div className="profile-card">
                <div className="profile-header">
                    <img
                        src={
                            userData.profilePhoto
                                ? userData.profilePhoto.startsWith("http")
                                    ? userData.profilePhoto
                                    : `data:image/jpeg;base64,${userData.profilePhoto}`
                                : "/default-profile.png"
                        }
                        alt="Profil Resmi" style={{ width: "110px", height: "110px", borderRadius: "50%", marginTop: "18px" }}
                    />
                    <div className="profile-header-info">
                        <h1 className="profile-username">{userData.username}</h1>
                        <p className="profile-bio">{userData.bio}</p>
                        <div className="profile-posts">
                            <div className="profile-info-count">
                                <strong>15</strong> Gönderi
                            </div>
                            <div className="profile-info-count">
                                <strong>76</strong> Yorum
                            </div>
                            <div className="profile-info-count">
                                <strong>185</strong> Beğeni
                            </div>
                        </div>
                    </div>
                    <button className="profile-edit-button" onClick={editProfile}>Profili Düzenle</button>
                </div>
             </div>
            {isEditing && (
                <div className="profile-edit-form">
                    <form onSubmit={handleFormSubmit}>
                        <div className="profile-edit-header">
                            <h2>Profili Düzenle</h2>
                            <button type="button" onClick={editProfile}>X</button>
                        </div>
                        <label htmlFor="username">Kullanıcı Adı:</label>
                        <input type="text" id="username" defaultValue={userData.username} />
                        <label htmlFor="bio">Biyografi:</label>
                        <textarea id="bio" name="bio" defaultValue={userData.bio} rows={4}></textarea>
                        <label htmlFor="profilePicture">Profil Resmi</label>
                        <input 
                            ref={inputRef}
                            type="file" 
                            id="profilePicture"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{display: 'none'}}
                            key={inputKey}
                        />
                        <br></br>
                        {/* Profil fotoğrafı seçim alanı: */}
                        {!selectedFile && (
                            <button type="button" className="profile-edit-form-picturebutton" onClick={onChooseFile}>
                                {userData.profilePhoto && (
                                    <img
                                        src={
                                            userData.profilePhoto.startsWith("http")
                                                ? userData.profilePhoto
                                                : `data:image/jpeg;base64,${userData.profilePhoto}`
                                        }
                                        alt="Mevcut"
                                    />
                                )}
                                <span>Fotoğraf yükleyin</span>
                            </button>
                        )}

                        {selectedFile && (
                            <div className="profile-edit-form-picturebutton" onClick={onChooseFile}>
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Seçilen"
                                />
                                <span>Başka bir fotoğraf seçmek için tıklayın</span>
                            </div>
                        )}
                        <button type="submit">Kaydet</button>
                    </form>
                </div>
            )}
            <div className='profile-tablist'>
                <div className='profile-tablist-item'>
                    <div 
                        className={`profile-inquiry-tab ${activeTab === 'gonderiler' ? 'active' : ''}`}
                        onClick={() => handleTabChange('gonderiler')}
                    >
                        Gönderiler
                    </div>
                    <div 
                        className={`profile-inquiry-tab ${activeTab === 'begenilenler' ? 'active' : ''}`}
                        onClick={() => handleTabChange('begenilenler')}
                    >
                        Beğenilenler
                    </div>
                </div>
            </div>
            <Post />
        </div>
        
        
    );
}
export default Profile;