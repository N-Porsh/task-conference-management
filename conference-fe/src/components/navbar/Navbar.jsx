import React from "react";
import {Link} from 'react-router-dom'
import Logo from "./tallink_logo.svg.png";
import './Navbar.css';

const Navbar = () => (
    <>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://www.tallink.ee/">
                    <img src={Logo} width="112" height="28" alt="logo"/>
                </a>
                <label className="navbar-burger burgernav-toggle" htmlFor="nav-toggle-state" aria-label="menu"
                       aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </label>
            </div>

            <input type="checkbox" id="nav-toggle-state"/>
            <div id="navbarBasicExample" className="navbar-menu nav-menu">
                <div className="navbar-start">
                    <Link to={"/"} className="navbar-item">Rooms</Link>
                    <Link to={"/conferences"} className="navbar-item">Conference</Link>
                    <Link to={"/participants"} className="navbar-item">Participants</Link>
                </div>
            </div>
        </nav>
    </>
);

export default Navbar;