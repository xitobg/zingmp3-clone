import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ title = "", to, icon }) => {
  return (
    <NavLink
      className="menu-item"
      style={(nav) => ({ active: nav.isActive })}
      to={to}
    >
      {icon}
      <span className="menu-item__title">{title}</span>
    </NavLink>
  );
};

export default MenuItem;
