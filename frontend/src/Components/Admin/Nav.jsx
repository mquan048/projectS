import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faBell,
  faUser,
  faComment,
  faChartBar,
  faCogs,
  faPrint,
  faHistory,
  faInfoCircle,
  faAngleDown,
  faSignOutAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";
import { Outlet } from "react-router-dom";

function NavbarRow({ user }) {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="navbar-row-modern">
      <div className="logo-modern">SPSO</div>
      <nav className="navbar-right-modern">
        <button className="icon-button">
          <FontAwesomeIcon icon={faComment} />
        </button>
        <button className="icon-button">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <div className="user-section-modern" onClick={toggleUserMenu}>
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <p>{user || "Loading..."}</p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </nav>
      {showUserMenu && (
        <div className="user-menu-modern">
          <button className="user-menu-item">
            <FontAwesomeIcon icon={faExclamationCircle} className="menu-icon" />
            Báo cáo
          </button>
          <button className="user-menu-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
            Đăng xuất
          </button>
        </div>
      )}
    </header>
  );
}

function NavbarCol() {
  const menuItems = [
    { icon: faChartBar, label: "Thống kê", path: "statistic" },
    { icon: faInfoCircle, label: "Thông tin", path: "info" },
    { icon: faPrint, label: "Máy in", path: "printer" },
    { icon: faCogs, label: "Cấu hình", path: "config" },
    { icon: faHistory, label: "Lịch sử in", path: "history" },
  ];

  return (
    <aside className="navbar-col-modern">
      {menuItems.map((item, index) => (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive ? "nav-item-modern active" : "nav-item-modern"
          }
          key={index}
        >
          <FontAwesomeIcon icon={item.icon} className="nav-icon-modern" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}

function Nav_SPSO() {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5000/api/spso", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { full_name } = response.data;
        setFullName(full_name);
      } catch (error) {
        console.error("Error fetching full name:", error.response?.data || error.message);
      }
    };

    fetchFullName();
  }, []);

  return (
    <div className="layout-modern">
      <NavbarRow user={fullName} />
      <div className="main-container">
        <NavbarCol />
        <div className="content-modern">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Nav_SPSO;
