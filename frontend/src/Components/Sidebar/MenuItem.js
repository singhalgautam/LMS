import React from "react";
import {Link } from "react-router-dom";

const MenuItem = (props) => {
  const { name, exact, iconClassName, to } = props;

  return (
    <li onClick={props.onClick}>
      <Link
        exact={exact}
        to={to}
        // onClick={() => {
        //   setExpand((e) => !e);
        // }}
        className={`menu-item`}
      >
        <div className="menu-icon">
          <i className={iconClassName}></i>
        </div>
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
