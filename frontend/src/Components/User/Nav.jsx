
import { faBell, faUser} from '@fortawesome/free-regular-svg-icons';
import { faAngleDown,faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect, useRef} from 'react';
import logoBK from '../../assets/logo_BK2-removebg.png';
import './Nav.css';
let user = "NguyenKhang";
function Header() 
{
    const [notificationCount, setNotificationCount] = useState(3);
    return(
    <div className='tt-navbar'>
        <div className="tt-logo-SPSS">
            <span>
                <img src={logoBK} alt='Logo đh BK'></img>
            </span>
            <span className='tt-SPSS'>
                SPSS
            </span>
        </div>
        <ul className="tt-nav-links">
                <li>
                    
                        Trang chủ
              
                </li>
                <li>
                 
                        Thông tin
         
                </li>
                <li>
                   
                        In tài liệu
                 
                </li>
                <li>
                        Lịch sử in
             
                </li>
        </ul>
        <div className="tt-notification">
        <FontAwesomeIcon icon={faBell} className="tt-iconbell"/>
        {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
            )}
        </div>
        <div className="tt-user">
            <FontAwesomeIcon icon={faUser} className="tt-iconuser"/>
            <span>{user}</span>
            <FontAwesomeIcon icon={faAngleDown} className="tt-angledown"/>
        </div>
    </div>
    );
}
export default Header;