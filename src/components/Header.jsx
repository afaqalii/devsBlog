import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navItems = [
    { path: "/blogs", name: "blogs" },
    { path: "/create", name: "create" },
    { path: "/about", name: "about" },
  ];
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light h-[80px]">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button className=" block lg:hidden">
              <span className="fa fa-bars"></span>
            </button>
            <div className="hidden lg:block">
              <ul className="flex gap-10 navbar-nav me-auto md-2 md-lg-0">
                {navItems.map((item) => (
                  <NavLink to={item.path}>
                    <li className="capitalize">{item.name}</li>
                  </NavLink>
                ))}
              </ul>
            </div>
            <div>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/signup"}>Signup</NavLink>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
