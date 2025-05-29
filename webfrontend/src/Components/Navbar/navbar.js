import React from "react";
import './navbar.css';
import DefaultProfile from '../../assets/profile.png';


function Navbar() {

    const userId = localStorage.getItem("userId");
    // Eğer userId yoksa login sayfasına yönlendir
    React.useEffect(() => {
        if (!userId) {
            window.location.href = "/login";
        }
    }, [userId]);

    const [userData, setUserData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    // Menü ve modal state'leri
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [showEmailModal, setShowEmailModal] = React.useState(false);
    const [showPasswordModal, setShowPasswordModal] = React.useState(false);

    // Modal input state'leri
    const [newEmail, setNewEmail] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");


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

    // Menü dışına tıklanınca menüyü kapat
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar-profile-container')) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    if (isLoading) {
        return <div></div>;
    }

    // Çıkış yap fonksiyonu (login ekranına yönlendirir)
    const handleLogout = () => {
        localStorage.removeItem("userId");
        window.location.href = "/login";
    };

    return (
        <header className="navbar-header">
            <p className="navbar-header-title">Tasted</p>
            <div className="navbar-profile-container" style={{ position: "relative" }}>
                <img
                    src={
                        userData.profilePhoto
                            ? userData.profilePhoto.startsWith("http")
                                ? userData.profilePhoto
                                : `data:image/jpeg;base64,${userData.profilePhoto}`
                            : DefaultProfile
                    }
                    alt="Profil Resmi"
                    style={{ width: "50px", height: "50px", borderRadius: "50%", marginTop: "5px", cursor: "pointer" }}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
                {menuOpen && (
                    <div className="navbar-profile-menu">
                        <button onClick={() => { setShowEmailModal(true); setMenuOpen(false); }}>E-posta Değiştir</button>
                        <button onClick={() => { setShowPasswordModal(true); setMenuOpen(false); }}>Şifre Değiştir</button>
                        <button onClick={handleLogout}>Çıkış Yap</button>
                    </div>
                )}
                {/* E-posta değiştir modal */}
                {showEmailModal && (
                    <div className="navbar-modal-overlay">
                        <div className="navbar-modal">
                            <h3>E-posta Değiştir</h3>
                            <input
                                type="email"
                                placeholder="Yeni e-posta"
                                value={newEmail}
                                onChange={e => setNewEmail(e.target.value)}
                            />
                            <div className="navbar-modal-actions">
                                <button onClick={() => setShowEmailModal(false)}>İptal</button>
                                <button
                                    onClick={async () => {
                                        // E-posta doğrulama regex
                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        if (!emailRegex.test(newEmail)) {
                                            alert("Lütfen geçerli bir e-posta adresi giriniz.");
                                            return;
                                        }
                                        try {
                                            const formData = new FormData();
                                            formData.append("userId", userId);
                                            formData.append("newEmail", newEmail);
                                            const response = await fetch("/user/update/email", {
                                                method: "PUT",
                                                body: formData
                                            });
                                            if (response.ok) {
                                                alert("E-posta başarıyla güncellendi.");
                                            } else {
                                                alert("E-posta güncellenemedi.");
                                            }
                                        } catch (err) {
                                            alert("E-posta güncellenirken bir hata oluştu.");
                                        }
                                        setShowEmailModal(false);
                                        setNewEmail("");
                                    }}
                                >
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Şifre değiştir modal */}
                {showPasswordModal && (
                    <div className="navbar-modal-overlay">
                        <div className="navbar-modal">
                            <h3>Şifre Değiştir</h3>
                            <input
                                type="password"
                                placeholder="Yeni şifre"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Yeni şifre (tekrar)"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <div className="navbar-modal-actions">
                                <button onClick={() => setShowPasswordModal(false)}>İptal</button>
                                <button
                                    onClick={async () => {
                                        if (newPassword !== confirmPassword) {
                                            alert("Şifreler aynı olmalı.");
                                            return;
                                        }
                                        try {
                                            const formData = new FormData();
                                            formData.append("userId", userId);
                                            formData.append("newPassword", newPassword);
                                            const response = await fetch("/user/update/password", {
                                                method: "PUT",
                                                body: formData
                                            });
                                            if (response.ok) {
                                                alert("Şifre başarıyla güncellendi.");
                                            } else {
                                                alert("Şifre güncellenemedi.");
                                            }
                                        } catch (err) {
                                            alert("Şifre güncellenirken bir hata oluştu.");
                                        }
                                        setShowPasswordModal(false);
                                        setNewPassword("");
                                        setConfirmPassword("");
                                    }}
                                >
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar;