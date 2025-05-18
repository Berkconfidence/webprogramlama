import React from "react";
import './navbar.css';


function Navbar() {
    return (
        
        <header className="navbar-header">
            <div>
                <a href="/admin" className="navbar-admin">Admin</a>
                <a href="/reviewer" className="navbar-reviewer">Hakem</a>
            </div>
            <nav className="navbar">
                <button className="navbar-button" onClick={() => window.location.href = '/home'}>
                    Makale Yükle
                </button>
                <button className="navbar-button" onClick={() => window.location.href = '/makalesorgula'}>
                    Makale Sorgula
                </button>
            </nav>
        </header>
    )
}

export default Navbar;