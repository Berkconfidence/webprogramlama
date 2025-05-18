import React from "react";
import './signup.css';

function SignUp() {

    const handleUser = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch('/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                })
            });
            
            if (response.ok) {
                window.location.href = "/login";
            } else {
                alert("Bilgiler Hatalı. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            alert("Bağlantı hatası: " + error.message);
        }
    }


    return (
        <div>
            <div className="signup-card">
                <h1>Hoşgeldiniz</h1>
                <p className="signup-card-subtitle">Yeni bir hesap oluşturun</p>

                <form onSubmit={handleUser}>
                    <label for="email">E-posta</label>
                    <br />
                    <input
                        type="email" 
                        id="email" 
                        name="email"
                        className="signup-input"
                        placeholder="E-posta" 
                        required
                    />
                    <br />
                    <label for="username">Kullanıcı Adı</label>
                    <br />
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        className="signup-input"
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
                        className="signup-input"
                        placeholder="•••••••••" 
                        required
                    />
                    <br />
                    <label for="password">Şifre Tekrar</label>
                    <br />
                    <input 
                        type="password" 
                        id="confirmpassword" 
                        name="confirmpassword"
                        className="signup-input"
                        placeholder="•••••••••" 
                        required
                    />
                    <br />
                    <button type="submit" className="signup-button">
                        <span className="signup-buttontext">Kayıt Ol</span>
                    </button>
                    <p className="signup-lastsubtitle">Hesabınız var mı? <a href="/login" className="signup-registerlink">Giriş Yapın</a></p>
                </form>
            </div>
        </div>
    );
}
export default SignUp;