import React from "react";
import './login.css';

function Login() {


    const handleUser = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            console.log("Login isteği gönderiliyor:", username); // log eklendi
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            console.log("Backend'den cevap geldi:", response); // log eklendi
            
            if (response.ok) {
                window.location.href = "/home";
            } else {
                alert("Bilgiler Hatalı. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            alert("Bağlantı hatası: " + error.message);
            console.error("Fetch hatası:", error); // log eklendi
        }
    }

    return (
        <div>
            <div className="login-card">
                <h1>Hoşgeldiniz</h1>
                <p className="login-card-subtitle">Hesabınıza giriş yapın</p>

                <form onSubmit={handleUser}>
                    <label for="username">Kullanıcı Adı</label>
                    <br />
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        className="login-username"
                        placeholder="Kullanıcı Adı" 
                        required 
                    />
                    <br />
                    <label for="password">Şifre</label>
                    <br />
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        className="login-password"
                        placeholder="•••••••••" 
                        required
                    />
                    <br />
                    <button type="submit" className="login-button">
                        <span className="login-buttontext">Giriş Yap</span>
                    </button>
                    <p className="login-lastsubtitle">Hesabınız yok mu? <a href="/signup" className="login-registerlink">Kayıt Olun</a></p>
                </form>
            </div>
        </div>
    );
}
export default Login;