import React from "react";
import './home.css';
import Navbar from "../Navbar/navbar";
//import CreatePost from "../Share/createpost";
import Profile from "../Profile/profile";

function Home() {

    const [activeTab, setActiveTab] = React.useState('anasayfa');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <Navbar />
            <div className='space'></div>
            <div className='home-tablist'>
                <div className='home-tablist-item'>
                    <div 
                        className={`home-inquiry-tab ${activeTab === 'anasayfa' ? 'active' : ''}`}
                        onClick={() => handleTabChange('anasayfa')}
                    >
                        Ana Sayfa
                    </div>
                    <div 
                        className={`home-inquiry-tab ${activeTab === 'paylas' ? 'active' : ''}`}
                        onClick={() => handleTabChange('paylas')}
                    >
                        Paylaş
                    </div>
                    <div 
                        className={`home-inquiry-tab ${activeTab === 'ara' ? 'active' : ''}`}
                        onClick={() => handleTabChange('ara')}
                    >
                        Ara
                    </div>
                    <div 
                        className={`home-inquiry-tab ${activeTab === 'profilim' ? 'active' : ''}`}
                        onClick={() => handleTabChange('profilim')}
                    >
                        Profilim
                    </div>
                </div>
            </div>

            <Profile />
        </div>
    );
}
export default Home;