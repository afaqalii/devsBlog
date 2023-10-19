import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { logout } from "../Features/UserAuth/AuthSlice";

const Header = () => {
  // state from redux
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    { path: "/blogs", name: "blogs" },
    { path: "/create", name: "create" },
    { path: "/about", name: "about" },
  ];

  // handle logout
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
        navigate("/login")
        console.log("Logout succesful");
      })
      .catch((error) => {
        console.log("An error happened.");
      });
  };
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
                  <NavLink key={item.path} to={item.path}>
                    <li className="capitalize">{item.name}</li>
                  </NavLink>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-10">
              {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <NavLink to={"/login"}>Login</NavLink>
              )}

              <NavLink to={"/signup"}>Sign up</NavLink>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
