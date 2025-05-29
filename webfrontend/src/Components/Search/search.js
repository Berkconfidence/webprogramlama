import React from "react";
import './search.css';
import SearchProfile from "./searchprofile";
import DefaultProfile from '../../assets/profile.png';

function Search() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setSelectedUser(null); // Yeni aramada profil kapansın
        try {
            const response = await fetch(`/user/search?query=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error("Arama başarısız oldu.");
            }
        } catch (error) {
            console.error("Arama sırasında bir hata oluştu:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {!selectedUser && (
                <>
                    <h1 className="search-title">Kullanıcı Ara</h1>
                    <div className="search-container">
                        <form onSubmit={handleSearchSubmit} className="search-form">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Kullanıcı ara..."
                                className="search-input"
                            />
                            <button type="submit" className="search-button">Ara</button>
                        </form>
                        {isLoading && <p>Yükleniyor...</p>}
                        <div className="search-results-list">
                            {searchResults.map(user => (
                                <div
                                    key={user.id}
                                    className="search-user-card"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <img
                                        src={
                                            user.profilePhoto
                                                ? user.profilePhoto.startsWith("http")
                                                    ? user.profilePhoto
                                                    : `data:image/jpeg;base64,${user.profilePhoto}`
                                                : DefaultProfile
                                        }
                                        alt="Profil"
                                        className="search-user-avatar"
                                    />
                                    <div className="search-user-info">
                                        <div className="search-user-username">{user.username}</div>
                                        <div className="search-user-bio">{user.bio}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {selectedUser && (
                <SearchProfile user={selectedUser} onBack={() => setSelectedUser(null)} />
            )}
        </div>
    );
}
export default Search;