import React from "react";
import './login.css';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleUser = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
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
            
            if (response.ok) {
                const user = await response.json();
                localStorage.setItem("userId", user.userId);
                navigate("/home");
            } else {
                alert("Bilgiler Hatalı. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            alert("Bağlantı hatası: " + error.message);
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