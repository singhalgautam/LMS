import React, { useEffect, useState } from "react";
import logo from "../../assets/web-logo-light.jpg";
import user from "../../assets/user.png";
import MenuItem from "./MenuItem";
import { MenuData } from "./MenuData";
import "./sidebar.css";
import { GoogleLogout } from "react-google-login";
import { FaWindows } from "react-icons/fa";
import Axios from "axios";


const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);
  const [image,setImage]=useState(null);

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

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
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
  
  const info = JSON.parse(localStorage.getItem("info"));
  useEffect(() => {
    Axios.post("http://localhost:3002/getProfile", { id: info.id }).then(
      (res) => {
        if (res.data[0].photo) setImage(res.data[0].photo);
        else setImage(user);
      }
    );
  }, [info.id]);

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
        <div className="avatar">
          {image && <img src={image} alt="user" />}
        </div>
        <div className="user-info">
          <div className="profile-info-wrapper">
            <h5>{info.name}</h5>
            <p>{info.email}</p>
          </div>
          <i
            className="bi bi-box-arrow-right"
            onClick={() => {
              // window.sessionStorage.clear();
              // window.localStorage.clear();
              props.setLoginStatus(false);
              Axios.get("http://localhost:3002/logout");
            }}
          ></i>
          {/* <GoogleLogout
            clientId="552682266934-gqdhnqb14ksoib7tdl4c1716rs2ija5s.apps.googleusercontent.com"
            onLogoutSuccess={() => {
              // window.sessionStorage.removeItem(
              //   "oauth2_cs::http://localhost:3000::552682266934-gqdhnqb14ksoib7tdl4c1716rs2ija5s.apps.googleusercontent.com"
              // );
              // window.sessionStorage.clear();
              // window.localStorage.clear();
              props.setLoginStatus(false);
              Axios.get("http://localhost:3002/logout");
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
