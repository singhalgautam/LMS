import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/web-logo-light.jpg";
import MenuItem from "./MenuItem";
import { MenuData } from "./MenuData";
import "./sidebar.css";
import Axios from "axios";
import { useGlobalContext } from "../../context";

const SideMenu = (props) => {
  const history=useHistory();
  const {image,name,info}=useGlobalContext();
  const [inactive, setInactive] = useState(false);
 
  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive, props]);

  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  useEffect(() => {
    let MenuData = document.querySelectorAll(".menu-item");
    MenuData.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        MenuData.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        // console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  const handleLogout = async () => {
    // window.sessionStorage.clear();
    // window.localStorage.clear();
    await Axios.get("http://localhost:3002/logout");
    history.replace(`/`);
    props.setLoginStatus(false);
    localStorage.clear();
  };

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="web-logo" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i className="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i className="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn">
          <i className="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {MenuData.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              to={menuItem.to}
              iconClassName={menuItem.iconClassName}
              exact={`${menuItem.exact}`}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="profPic">
          {image && <img src={image} alt="user" />}
        </div>
        <div className="user-info">
          <div className="profile-info-wrapper">
            <h5>{name}</h5>
            <p>{info.email}</p>
          </div>
          <i
            className="bi bi-box-arrow-right"
            onClick={handleLogout}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
