import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "../Home/Nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown, faHouse } from '@fortawesome/free-solid-svg-icons';
import logoBK from '../../assets/logo_BK2.jpg';
let user = 'Nguyễn Minh Khang';
function Header()
{
    return(
    <header className='header-login'>
        <span className="container-logo-university">
            <span><img src={logoBK} alt='Logo Trường đại học BK'></img></span>
            <div className="university">
                <p>ĐẠI HỌC QUỐC GIA TP.HCM</p>
                <p>TRƯỜNG ĐẠI HỌC BÁCH KHOA</p>
            </div>
            
        </span>
        <div className="icon-user">
        <FontAwesomeIcon icon={faUser} />
        <span>{user}</span>
        </div>
    </header>
    );
}

const Functionality = () =>
  {
      const [activeTab, setActiveTab] = useState('home');
      const navigate = useNavigate();
      const handleStartPrinting = () => {
          navigate('/login'); // Chuyển hướng đến trang đăng nhập
      };
      const handleTabClick = (tabName) =>
      {
          setActiveTab(tabName);
      };
      return (
          <nav className="navbar">
              <ul className="nav-items">
                  <li className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => handleTabClick('home')}>
                      <span className='faHouse'><FontAwesomeIcon icon={faHouse} /></span>
                  </li>

                  <li className={`nav-item ${activeTab === 'introduce' ? 'active' : ''}`}
                  onClick={() => handleTabClick('introduce')}>
                      <div>
                      <span>Giới thiệu</span>
                      <span><FontAwesomeIcon icon={faChevronDown} /></span>
                      </div>
                  </li>

                  <li className={`nav-item ${activeTab === 'regulation' ? 'active' : ''}`}
                  onClick={() => handleTabClick('regulation')}>
                      <div>
                      <span>Quy định</span>
                      <span><FontAwesomeIcon icon={faChevronDown} /></span>
                      </div>
                  </li>

                  <li className={`nav-item ${activeTab === 'notification' ? 'active' : ''}`}
                  onClick={() => handleTabClick('notification')}>
                      <div>
                      <span>Thông báo</span>
                      <span><FontAwesomeIcon icon={faChevronDown} /></span>
                      </div>
                  </li>

                  <li className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => handleTabClick('contact')}>
                      
                      <span>Liên hệ</span>
                  
                  </li>
              </ul>
              <button className="login-button" onClick={handleStartPrinting}>Đăng nhập</button>
          </nav>
      );
  };
function Navbar_Homepage()
{
  return (
    <div>
      <Header/>
      <Functionality/>
    </div>
  )
}
export default Navbar_Homepage;
