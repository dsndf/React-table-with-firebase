import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import toast from "react-hot-toast";
const Header = ({ userAuth }) => {
  return (
    <div className="navbar">
      <NavLink to={"/users"}>Users</NavLink>
      {userAuth ? (
        <NavLink
          onClick={() => {
            signOut(auth);
            toast.success("logged out.");
          }}
        >
          Logout
        </NavLink>
      ) : (
        <NavLink to={"/login"}>Login</NavLink>
      )}
    </div>
  );
};

export default Header;
